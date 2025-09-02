import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppDataProvider } from "./context/AppDataContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Modern App Store - Download Free Android APKs",
    template: "%s | Modern App Store"
  },
  description: "Download free Android APKs safely from Modern App Store. Discover latest apps, trending games, and essential tools. Verified APK files with fast updates.",
  keywords: "Android APK download, free apps, mobile games, APK files, Android apps, app store, APK downloader, mobile applications, free Android apps",
  authors: [{ name: "Modern App Store Team" }],
  creator: "Modern App Store",
  publisher: "Modern App Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://modernappstore.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://modernappstore.com',
    siteName: 'Modern App Store',
    title: 'Modern App Store - Download Free Android APKs',
    description: 'Download free Android APKs safely from Modern App Store. Discover latest apps, trending games, and essential tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern App Store - Download Free Android APKs',
    description: 'Download free Android APKs safely from Modern App Store. Discover latest apps, trending games, and essential tools.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ErrorBoundary>
          <AppDataProvider>
            <AuthProvider>
              <SearchProvider>
                <div className="min-h-screen flex flex-col">
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
              </SearchProvider>
            </AuthProvider>
          </AppDataProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
