import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Enes Talha Erdem - Data Science Specialist | Machine Learning Engineer",
    template: "%s | Enes Talha Erdem",
  },
  description:
    "Enes Talha Erdem - Data Science Specialist and Machine Learning Engineer. Computer Science student at Ovidius University of Constanța and Google AI Academy participant. Specializing in Python, SQL, Machine Learning, and Data Engineering.",
  keywords: [
    "Enes Talha Erdem",
    "Data Science",
    "Machine Learning",
    "Data Engineer",
    "Python",
    "SQL",
    "T-SQL",
    "Talend",
    "Qlik",
    "Data Analytics",
    "AI",
    "Google AI Academy",
    "Ovidius University",
    "Constanța",
    "İstanbul",
    "Data Scientist",
  ],
  authors: [{ name: "Enes Talha Erdem" }],
  creator: "Enes Talha Erdem",
  publisher: "Enes Talha Erdem",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "Enes Talha Erdem - Data Science Specialist | Machine Learning Engineer",
    description:
      "Data Science Specialist and Machine Learning Engineer. Specializing in Python, SQL, Machine Learning, and Data Engineering.",
    siteName: "Enes Talha Erdem Portfolio",
    images: [
      {
        url: "/images/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Enes Talha Erdem - Data Science Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enes Talha Erdem - Data Science Specialist | Machine Learning Engineer",
    description:
      "Data Science Specialist and Machine Learning Engineer. Specializing in Python, SQL, Machine Learning, and Data Engineering.",
    images: ["/images/profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // User should replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for Person schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Enes Talha Erdem",
    jobTitle: "Data Science Specialist",
    description:
      "Data Science Specialist and Machine Learning Engineer. Computer Science student at Ovidius University of Constanța and Google AI Academy participant.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/images/profile.jpeg`,
    email: "enesterdem@gmail.com",
    telephone: "+905345803440",
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Ovidius University of Constanța",
      department: "Computer Science",
    },
    education: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Computer Science",
        educationalLevel: "Bachelor's Degree",
        credentialCategory: "degree",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: "Ovidius University of Constanța",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Romanian Language Preparatory Year",
        educationalLevel: "Preparatory",
        credentialCategory: "certificate",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: "Ovidius University of Constanța",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "High School Diploma",
        educationalLevel: "High School",
        credentialCategory: "diploma",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: "Oguz Canpolat High School",
        },
      },
    ],
    sameAs: [
      "https://github.com/EnesErdemT",
      "https://www.linkedin.com/in/enesterdem/",
    ],
    knowsAbout: [
      "Python",
      "SQL",
      "T-SQL",
      "Machine Learning",
      "Data Science",
      "Data Engineering",
      "Talend Studio",
      "Qlik",
      "Tableau",
      "FastAPI",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${playfair.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
        <AnalyticsProvider />
      </body>
    </html>
  );
}
