import { Metadata } from "next";
import Header from "../components/Header";

// SEO-optimized metadata for free download android games page
export const metadata: Metadata = {
  title: "Free Download Android Games - APK Downloads | Modern App Store",
  description: "Download free Android games APKs safely. Browse action games, puzzle games, racing games, and more. Verified APK downloads with fast updates.",
  keywords: "free download android games, APK download, android games, free APK files, action games, puzzle games, racing games, mobile games, android game store",
  authors: [{ name: "Modern App Store Team" }],
  openGraph: {
    title: "Free Download Android Games - APK Downloads",
    description: "Download free Android games APKs safely. Browse action games, puzzle games, racing games, and more. Verified APK downloads.",
    url: "https://modernappstore.com/free-download-android-games",
    siteName: "Modern App Store",
    images: [
      {
        url: "/og-free-android-games.jpg",
        width: 1200,
        height: 630,
        alt: "Free Download Android Games - APK Downloads",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Download Android Games - APK Downloads",
    description: "Download free Android games APKs safely. Browse action games, puzzle games, racing games, and more. Verified APK downloads.",
    images: ["/og-free-android-games.jpg"],
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
    canonical: "https://modernappstore.com/free-download-android-games",
  },
};

export default function FreeDownloadAndroidGamesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Download Android Games
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download free Android games APKs safely and securely. Browse our collection of action games, 
            puzzle games, racing games, and more. All games are verified and safe to download.
          </p>
        </div>

        {/* Games Content Placeholder */}
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Android Games Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We&apos;re working on bringing you the best collection of free Android games for download. 
              Check back soon for our curated selection of action, puzzle, racing, 
              and adventure games available as free APK downloads.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/android-app-categories"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
              >
                Browse Categories
              </a>
              <a 
                href="/search"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Search Games
              </a>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="mt-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Free Android Games Collection?</h2>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our free Android games collection features carefully curated games across various genres 
                including action games, puzzle games, racing games, adventure games, and strategy games. 
                Each game in our collection is thoroughly tested and verified to ensure safety and functionality. 
                All downloads are completely free with no hidden costs or subscriptions.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Whether you&apos;re looking for <a href="/categories?filter=action-games" className="text-blue-600 hover:text-blue-700 font-medium">free action games</a> for thrilling gameplay, 
                <a href="/categories?filter=puzzle-games" className="text-blue-600 hover:text-blue-700 font-medium"> free puzzle games</a> to challenge your mind, 
                <a href="/categories?filter=racing-games" className="text-blue-600 hover:text-blue-700 font-medium"> free racing games</a> for high-speed excitement, 
                or <a href="/categories?filter=adventure-games" className="text-blue-600 hover:text-blue-700 font-medium">free adventure games</a> for immersive experiences, 
                you&apos;ll find high-quality options in our collection.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                All our Android games are available as free APK downloads with regular updates to ensure 
                you always have the latest features and content. Start exploring our collection 
                today and enhance your Android gaming experience with the best free games available.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
