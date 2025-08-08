import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christopher Bratkovics | Production ML Systems Engineer",
  description: "AI/ML Engineer specializing in production-ready machine learning systems. Expert in MLOps, FastAPI, Docker, and scaling ML models from notebook to production.",
  keywords: "ML Engineer, Machine Learning, MLOps, AI Engineer, Python, FastAPI, Docker, TensorFlow, PyTorch, Production ML",
  authors: [{ name: "Christopher Bratkovics" }],
  creator: "Christopher Bratkovics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cbratkovics.github.io",
    title: "Christopher Bratkovics | Production ML Systems Engineer",
    description: "Building AI That Ships: From Model to Production. Expert in MLOps, system design, and scaling ML solutions.",
    siteName: "Christopher Bratkovics Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Christopher Bratkovics - ML Engineer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Bratkovics | Production ML Systems Engineer",
    description: "Building AI That Ships: From Model to Production",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
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