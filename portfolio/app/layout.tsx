import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://cbratkovics.dev'),
  title: 'Christopher Bratkovics | AI/ML Engineer | Production ML Systems',
  description: 'Data Scientist transitioning to AI Engineering. Building production ML systems with 93% accuracy. Specializing in FastAPI, XGBoost, and RAG systems.',
  keywords: [
    'Christopher Bratkovics', 'AI Engineer', 'ML Engineer', 'MLOps',
    'FastAPI', 'Production ML', 'Data Scientist',
    'RAG Systems', 'XGBoost', 'LightGBM'
  ],
  authors: [{ name: 'Christopher Bratkovics' }],
  creator: 'Christopher Bratkovics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cbratkovics.dev',
    siteName: 'Christopher Bratkovics - AI/ML Engineer',
    title: 'Christopher Bratkovics | Building Production ML Systems',
    description: 'Data Scientist. 93% model accuracy, <150ms API latency, 20+ hours saved weekly.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Christopher Bratkovics - AI/ML Engineer Portfolio'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christopher Bratkovics | AI/ML Engineer',
    description: 'Building Production ML Systems That Ship',
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