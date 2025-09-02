import { Metadata } from "next";
import Header from "../components/Header";

// SEO-optimized metadata for free download android apps page
export const metadata: Metadata = {
  title: "Free Download Android Apps - APK Downloads | Modern App Store",
  description: "Download free Android apps APKs safely. Browse productivity tools, communication apps, utilities, and more. Verified APK downloads with fast updates.",
  keywords: "free download android apps, APK download, android applications, free APK files, productivity apps, communication apps, utility apps, android app store",
  authors: [{ name: "Modern App Store Team" }],
  openGraph: {
    title: "Free Download Android Apps - APK Downloads",
    description: "Download free Android apps APKs safely. Browse productivity tools, communication apps, utilities, and more. Verified APK downloads.",
    url: "https://modernappstore.com/free-download-android-apps",
    siteName: "Modern App Store",
    images: [
      {
        url: "/og-free-android-apps.jpg",
        width: 1200,
        height: 630,
        alt: "Free Download Android Apps - APK Downloads",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Download Android Apps - APK Downloads",
    description: "Download free Android apps APKs safely. Browse productivity tools, communication apps, utilities, and more. Verified APK downloads.",
    images: ["/og-free-android-apps.jpg"],
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
  alternates: {
    canonical: "https://modernappstore.com/free-download-android-apps",
  },
};

export default function FreeDownloadAndroidAppsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Download Android Apps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download free Android apps APKs safely and securely. Browse our collection of productivity tools, 
            communication apps, utilities, and more. All apps are verified and safe to download.
          </p>
        </div>

        {/* Apps Content Placeholder */}
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Android Apps Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're working on bringing you the best collection of free Android apps for download. 
              Check back soon for our curated selection of productivity, communication, 
              and utility applications available as free APK downloads.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/android-app-categories"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
              >
                Browse Categories
              </a>
              <a 
                href="/search"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Search Apps
              </a>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="mt-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Free Android Apps Collection?</h2>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our free Android apps collection features carefully curated applications across various categories 
                including productivity tools, communication apps, utilities, and lifestyle applications. 
                Each app in our collection is thoroughly tested and verified to ensure safety and functionality. 
                All downloads are completely free with no hidden costs or subscriptions.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Whether you're looking for <a href="/categories?filter=productivity" className="text-green-600 hover:text-green-700 font-medium">free productivity apps</a> to boost your efficiency, 
                <a href="/categories?filter=communication" className="text-green-600 hover:text-green-700 font-medium"> free communication tools</a> to stay connected, 
                or <a href="/categories?filter=utilities" className="text-green-600 hover:text-green-700 font-medium">free utility applications</a> for your daily needs, 
                you'll find high-quality options in our collection.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                All our Android apps are available as free APK downloads with regular updates to ensure 
                you always have the latest features and security patches. Start exploring our collection 
                today and enhance your Android experience with the best free apps available.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
