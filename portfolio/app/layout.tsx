import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [
    'Christopher Bratkovics', 'AI Engineer', 'ML Engineer', 'MLOps',
    'FastAPI', 'Production ML', 'RAG Systems', 'LLM Orchestration',
    'XGBoost', 'LightGBM', 'Semantic Caching', 'WebSockets'
  ],
  authors: [{ name: SITE.author.name }],
  creator: SITE.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: `${SITE.name} - AI/ML Engineer`,
    title: SITE.title,
    description: SITE.description,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: `${SITE.name} - AI/ML Engineer Portfolio`
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: 'Building Production ML Systems with Verified Performance Metrics',
    images: ['/og-image.png']
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  // Add structured data for SEO
  other: {
    'sameAs': SITE.sameAs.join(',')
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#0a0a0f] text-white`}>
        {children}
      </body>
    </html>
  );
}