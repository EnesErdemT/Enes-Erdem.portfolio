'use client';

import dynamic from 'next/dynamic';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/shared/scroll-to-top';
import { Hero } from '@/components/sections/Hero';
import { personalInfoData } from '@/lib/data/personal-info';
import { experiences } from '@/lib/data/experiences';
import { projects } from '@/lib/data/projects';
import { skillCategories } from '@/lib/data/skills';
import { SectionLoadingSkeleton } from '@/lib/dynamic-imports';

// Dynamic imports for below-the-fold sections
// This reduces initial bundle size and improves Time to Interactive
// Hero is loaded immediately as it's above the fold
const About = dynamic(
  () => import('@/components/sections/About').then((mod) => ({ default: mod.About })),
  {
    loading: () => <SectionLoadingSkeleton />,
    ssr: true,
  }
);

const Experience = dynamic(
  () => import('@/components/sections/Experience').then((mod) => ({ default: mod.Experience })),
  {
    loading: () => <SectionLoadingSkeleton />,
    ssr: true,
  }
);

const Projects = dynamic(
  () => import('@/components/sections/Projects').then((mod) => ({ default: mod.Projects })),
  {
    loading: () => <SectionLoadingSkeleton />,
    ssr: true,
  }
);

const Skills = dynamic(
  () => import('@/components/sections/Skills').then((mod) => ({ default: mod.Skills })),
  {
    loading: () => <SectionLoadingSkeleton />,
    ssr: true,
  }
);

const Contact = dynamic(
  () => import('@/components/sections/Contact').then((mod) => ({ default: mod.Contact })),
  {
    loading: () => <SectionLoadingSkeleton />,
    ssr: true,
  }
);

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About
          bio={personalInfoData.bio}
          education={personalInfoData.education}
          goals={personalInfoData.goals}
          contact={{
            email: personalInfoData.email,
            phone: personalInfoData.phone,
            location: personalInfoData.location,
          }}
        />

        {/* Experience Section */}
        <Experience experiences={experiences} />

        {/* Projects Section */}
        <Projects projects={projects} />

        {/* Skills Section */}
        <Skills categories={skillCategories} />

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
