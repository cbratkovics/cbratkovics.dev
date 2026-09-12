import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [
    'Christopher Bratkovics', 'Data Scientist', 'Analytics Engineer', 'Applied AI',
    'Python', 'SQL', 'Snowflake', 'dbt', 'AWS', 'Sigma',
    'Predictive Modeling', 'Customer Segmentation', 'dimensional modeling'
  ],
  authors: [{ name: SITE.author.name }],
  creator: SITE.author.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.shortTitle,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.author.name} — ${SITE.author.jobTitle}` }]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.shortTitle,
    description: SITE.description,
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.ico'
  },
  other: {
    'sameAs': SITE.sameAs.join(',')
  }
};

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Christopher J. Bratkovics',
  jobTitle: SITE.author.jobTitle,
  description: SITE.description,
  url: SITE.url,
  sameAs: SITE.sameAs,
  worksFor: {
    '@type': 'Organization',
    name: 'OUTFRONT Media'
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Bay Path University' },
    { '@type': 'CollegeOrUniversity', name: 'University of Vermont' },
    { '@type': 'EducationalOrganization', name: 'General Assembly' }
  ],
  knowsAbout: [
    'Data Science',
    'Analytics Engineering',
    'Python',
    'SQL',
    'Snowflake',
    'dbt',
    'AWS',
    'Sigma',
    'Predictive Modeling',
    'Dimensional Modeling'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0f] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
