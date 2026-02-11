#!/usr/bin/env node

/**
 * Script to update domain/site URL across the project
 * Usage: node scripts/update-domain.js <new-domain>
 * Example: node scripts/update-domain.js https://alpernerdm.com
 */

const fs = require('fs');
const path = require('path');

const newDomain = process.argv[2];

if (!newDomain) {
  console.error('❌ Error: Please provide a domain URL');
  console.log('Usage: node scripts/update-domain.js <new-domain>');
  console.log('Example: node scripts/update-domain.js https://alpernerdm.com');
  process.exit(1);
}

// Validate URL format
try {
  new URL(newDomain);
} catch (error) {
  console.error('❌ Error: Invalid URL format');
  console.log('Please provide a valid URL (e.g., https://alpernerdm.com)');
  process.exit(1);
}

console.log(`🔄 Updating site URL to: ${newDomain}\n`);

// Files to update
const filesToUpdate = [
  {
    path: '.env.local',
    pattern: /NEXT_PUBLIC_SITE_URL=.*/,
    replacement: `NEXT_PUBLIC_SITE_URL=${newDomain}`,
    create: true,
  },
  {
    path: '.env.example',
    pattern: /NEXT_PUBLIC_SITE_URL=.*/,
    replacement: `NEXT_PUBLIC_SITE_URL=${newDomain}`,
  },
  {
    path: 'vercel.json',
    pattern: /"NEXT_PUBLIC_SITE_URL":\s*"[^"]*"/,
    replacement: `"NEXT_PUBLIC_SITE_URL": "${newDomain}"`,
  },
];

let updatedCount = 0;
let createdCount = 0;

filesToUpdate.forEach(({ path: filePath, pattern, replacement, create }) => {
  const fullPath = path.join(process.cwd(), filePath);

  try {
    if (!fs.existsSync(fullPath)) {
      if (create) {
        // Create file from example
        const examplePath = path.join(process.cwd(), '.env.example');
        if (fs.existsSync(examplePath)) {
          let content = fs.readFileSync(examplePath, 'utf8');
          content = content.replace(pattern, replacement);
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`✅ Created: ${filePath}`);
          createdCount++;
        }
      } else {
        console.log(`⚠️  Skipped: ${filePath} (file not found)`);
      }
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;

    content = content.replace(pattern, replacement);

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      updatedCount++;
    } else {
      console.log(`ℹ️  No changes: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   - Files updated: ${updatedCount}`);
console.log(`   - Files created: ${createdCount}`);
console.log(`\n✨ Done! Don't forget to:`);
console.log(`   1. Update environment variables in Vercel Dashboard`);
console.log(`   2. Redeploy your application`);
console.log(`   3. Configure DNS records with your domain registrar`);
