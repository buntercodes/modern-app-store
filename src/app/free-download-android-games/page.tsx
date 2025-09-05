import { Metadata } from "next";
import Header from "../components/Header";
import FreeAndroidGamesClient from "./FreeAndroidGamesClient";
import Breadcrumb from "../components/Breadcrumb";
import PerformanceOptimizations from "./PerformanceOptimizations";

// Enhanced SEO-optimized metadata for free download android games page
export const metadata: Metadata = {
  title: "Free Download Android Games - 100+ APK Downloads | Modern App Store",
  description: "Download 100+ free Android games APKs safely and securely. Browse action games, puzzle games, racing games, adventure games, and more. Verified APK downloads with regular updates. No registration required.",
  keywords: [
    "free download android games",
    "APK download android games", 
    "android games free",
    "free APK files games",
    "action games android",
    "puzzle games android",
    "racing games android",
    "adventure games android",
    "mobile games free download",
    "android game store",
    "free mobile games",
    "android gaming",
    "game APK files",
    "safe APK download",
    "verified android games"
  ].join(", "),
  authors: [{ name: "Modern App Store Team" }],
  creator: "Modern App Store",
  publisher: "Modern App Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://modernappstore.com'),
  openGraph: {
    title: "Free Download Android Games - 100+ APK Downloads",
    description: "Download 100+ free Android games APKs safely and securely. Browse action games, puzzle games, racing games, adventure games, and more. Verified APK downloads with regular updates.",
    url: "https://modernappstore.com/free-download-android-games",
    siteName: "Modern App Store",
    images: [
      {
        url: "/og-free-android-games.jpg",
        width: 1200,
        height: 630,
        alt: "Free Download Android Games - 100+ APK Downloads - Modern App Store",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Download Android Games - 100+ APK Downloads",
    description: "Download 100+ free Android games APKs safely and securely. Browse action games, puzzle games, racing games, adventure games, and more.",
    images: ["/og-free-android-games.jpg"],
    creator: "@modernappstore",
    site: "@modernappstore",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://modernappstore.com/free-download-android-games",
    languages: {
      'en-US': 'https://modernappstore.com/free-download-android-games',
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Games",
  classification: "Android Games, Mobile Games, Free Downloads",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function FreeDownloadAndroidGamesPage() {
  // Structured Data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Download Android Games - 100+ APK Downloads",
    "description": "Download 100+ free Android games APKs safely and securely. Browse action games, puzzle games, racing games, adventure games, and more.",
    "url": "https://modernappstore.com/free-download-android-games",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Free Android Games Collection",
      "description": "Collection of 100+ free Android games available for download",
      "numberOfItems": 100,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Free Android Games",
          "applicationCategory": "GameApplication",
          "operatingSystem": "Android",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://modernappstore.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Free Android Games",
          "item": "https://modernappstore.com/free-download-android-games"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Modern App Store",
      "url": "https://modernappstore.com"
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Performance Optimizations */}
      <PerformanceOptimizations />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Free Android Games", current: true }
            ]}
          />
          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Download Android Games
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Download 100+ free Android games APKs safely and securely. Browse our collection of action games, 
              puzzle games, racing games, adventure games, and more. All games are verified and safe to download.
            </p>
          </header>

          {/* Games Content */}
          <section aria-label="Free Android Games Collection">
            <FreeAndroidGamesClient />
          </section>

          {/* SEO Content Section */}
          <section className="mt-16" aria-label="About Our Free Android Games Collection">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Free Android Games Collection?</h2>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our free Android games collection features carefully curated games across various genres 
                  including action games, puzzle games, racing games, adventure games, and strategy games. 
                  Each game in our collection is thoroughly tested and verified to ensure safety and functionality. 
                  All downloads are completely free with no hidden costs or subscriptions.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Game Categories Available</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li><a href="/categories?filter=action-games" className="text-blue-600 hover:text-blue-700 font-medium">Free Action Games</a> - Thrilling gameplay and fast-paced adventures</li>
                  <li><a href="/categories?filter=puzzle-games" className="text-blue-600 hover:text-blue-700 font-medium">Free Puzzle Games</a> - Challenge your mind with brain-teasing puzzles</li>
                  <li><a href="/categories?filter=racing-games" className="text-blue-600 hover:text-blue-700 font-medium">Free Racing Games</a> - High-speed excitement and competitive racing</li>
                  <li><a href="/categories?filter=adventure-games" className="text-blue-600 hover:text-blue-700 font-medium">Free Adventure Games</a> - Immersive experiences and epic quests</li>
                  <li><a href="/categories?filter=strategy-games" className="text-blue-600 hover:text-blue-700 font-medium">Free Strategy Games</a> - Tactical gameplay and strategic thinking</li>
                  <li><a href="/categories?filter=arcade-games" className="text-blue-600 hover:text-blue-700 font-medium">Free Arcade Games</a> - Classic arcade-style entertainment</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Safety and Security</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All our Android games are available as free APK downloads with regular updates to ensure 
                  you always have the latest features and content. Each game is scanned for malware and 
                  verified for safety before being added to our collection. We prioritize user security 
                  and provide only trusted, legitimate game downloads.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Easy Download Process</h3>
                <p className="text-gray-700 leading-relaxed">
                  Downloading games from our collection is simple and straightforward. No registration 
                  required - just browse, select, and download. All games are optimized for Android devices 
                  and come with detailed installation instructions. Start exploring our collection 
                  today and enhance your Android gaming experience with the best free games available.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section for SEO */}
          <section className="mt-16" aria-label="Frequently Asked Questions">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are these Android games really free?</h3>
                  <p className="text-gray-700">Yes, all games in our collection are completely free to download and play. No hidden costs, subscriptions, or in-app purchases required.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are the APK files safe to download?</h3>
                  <p className="text-gray-700">Absolutely. All APK files are thoroughly scanned for malware and verified for safety before being added to our collection.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to register to download games?</h3>
                  <p className="text-gray-700">No registration is required. You can browse and download games immediately without creating an account.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How often are new games added?</h3>
                  <p className="text-gray-700">We regularly update our collection with new free Android games. Check back frequently for the latest additions.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
