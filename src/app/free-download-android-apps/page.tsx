import { Metadata } from "next";
import Header from "../components/Header";
import FreeAndroidAppsClient from "./FreeAndroidAppsClient";
import Breadcrumb from "../components/Breadcrumb";
import PerformanceOptimizations from "./PerformanceOptimizations";

// Enhanced SEO-optimized metadata for free download android apps page
export const metadata: Metadata = {
  title: "Free Download Android Apps - 100+ APK Downloads | Modern App Store",
  description: "Download 100+ free Android apps APKs safely and securely. Browse productivity tools, communication apps, utilities, and more. Verified APK downloads with regular updates. No registration required.",
  keywords: [
    "free download android apps",
    "APK download android apps", 
    "android apps free",
    "free APK files apps",
    "productivity apps android",
    "communication apps android",
    "utility apps android",
    "lifestyle apps android",
    "mobile apps free download",
    "android app store",
    "free mobile apps",
    "android applications",
    "app APK files",
    "safe APK download",
    "verified android apps"
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
    title: "Free Download Android Apps - 100+ APK Downloads",
    description: "Download 100+ free Android apps APKs safely and securely. Browse productivity tools, communication apps, utilities, and more. Verified APK downloads with regular updates.",
    url: "https://modernappstore.com/free-download-android-apps",
    siteName: "Modern App Store",
    images: [
      {
        url: "/og-free-android-apps.jpg",
        width: 1200,
        height: 630,
        alt: "Free Download Android Apps - 100+ APK Downloads - Modern App Store",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Download Android Apps - 100+ APK Downloads",
    description: "Download 100+ free Android apps APKs safely and securely. Browse productivity tools, communication apps, utilities, and more.",
    images: ["/og-free-android-apps.jpg"],
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
    canonical: "https://modernappstore.com/free-download-android-apps",
    languages: {
      'en-US': 'https://modernappstore.com/free-download-android-apps',
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Applications",
  classification: "Android Apps, Mobile Applications, Free Downloads",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function FreeDownloadAndroidAppsPage() {
  // Structured Data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Download Android Apps - 100+ APK Downloads",
    "description": "Download 100+ free Android apps APKs safely and securely. Browse productivity tools, communication apps, utilities, and more.",
    "url": "https://modernappstore.com/free-download-android-apps",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Free Android Apps Collection",
      "description": "Collection of 100+ free Android apps available for download",
      "numberOfItems": 100,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Free Android Apps",
          "applicationCategory": "Application",
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
          "name": "Free Android Apps",
          "item": "https://modernappstore.com/free-download-android-apps"
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
              { label: "Free Android Apps", current: true }
            ]}
          />
          
          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Download Android Apps
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Download 100+ free Android apps APKs safely and securely. Browse our collection of productivity tools, 
              communication apps, utilities, and more. All apps are verified and safe to download.
            </p>
          </header>

          {/* Apps Content */}
          <section aria-label="Free Android Apps Collection">
            <FreeAndroidAppsClient />
          </section>

          {/* SEO Content Section */}
          <section className="mt-16" aria-label="About Our Free Android Apps Collection">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Free Android Apps Collection?</h2>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our free Android apps collection features carefully curated applications across various categories 
                  including productivity tools, communication apps, utilities, and lifestyle applications. 
                  Each app in our collection is thoroughly tested and verified to ensure safety and functionality. 
                  All downloads are completely free with no hidden costs or subscriptions.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">App Categories Available</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li><a href="/categories?filter=productivity" className="text-green-600 hover:text-green-700 font-medium">Free Productivity Apps</a> - Boost your efficiency and workflow</li>
                  <li><a href="/categories?filter=communication" className="text-green-600 hover:text-green-700 font-medium">Free Communication Apps</a> - Stay connected with messaging and video calls</li>
                  <li><a href="/categories?filter=utilities" className="text-green-600 hover:text-green-700 font-medium">Free Utility Apps</a> - Essential tools for your daily needs</li>
                  <li><a href="/categories?filter=lifestyle" className="text-green-600 hover:text-green-700 font-medium">Free Lifestyle Apps</a> - Health, fitness, and personal organization</li>
                  <li><a href="/categories?filter=entertainment" className="text-green-600 hover:text-green-700 font-medium">Free Entertainment Apps</a> - Music, video, and media consumption</li>
                  <li><a href="/categories?filter=education" className="text-green-600 hover:text-green-700 font-medium">Free Education Apps</a> - Learning and skill development</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Safety and Security</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All our Android apps are available as free APK downloads with regular updates to ensure 
                  you always have the latest features and content. Each app is scanned for malware and 
                  verified for safety before being added to our collection. We prioritize user security 
                  and provide only trusted, legitimate app downloads.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Easy Download Process</h3>
                <p className="text-gray-700 leading-relaxed">
                  Downloading apps from our collection is simple and straightforward. No registration 
                  required - just browse, select, and download. All apps are optimized for Android devices 
                  and come with detailed installation instructions. Start exploring our collection 
                  today and enhance your Android experience with the best free apps available.
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are these Android apps really free?</h3>
                  <p className="text-gray-700">Yes, all apps in our collection are completely free to download and use. No hidden costs, subscriptions, or in-app purchases required.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are the APK files safe to download?</h3>
                  <p className="text-gray-700">Absolutely. All APK files are thoroughly scanned for malware and verified for safety before being added to our collection.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to register to download apps?</h3>
                  <p className="text-gray-700">No registration is required. You can browse and download apps immediately without creating an account.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How often are new apps added?</h3>
                  <p className="text-gray-700">We regularly update our collection with new free Android apps. Check back frequently for the latest additions.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
