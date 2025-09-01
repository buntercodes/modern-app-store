import { Metadata } from "next";
import HybridHomePage from "./components/HybridHomePage";

// SEO-optimized metadata
export const metadata: Metadata = {
  title: "Download Free Android APKs – Latest Apps & Games | Modern App Store",
  description: "Download free Android APKs safely from Modern App Store. Discover latest apps, trending games, and essential tools. Verified APK files with fast updates.",
  keywords: "Android APK download, free apps, mobile games, APK files, Android apps, app store, APK downloader, mobile applications",
  authors: [{ name: "Modern App Store Team" }],
  openGraph: {
    title: "Download Free Android APKs – Latest Apps & Games",
    description: "Download free Android APKs safely from Modern App Store. Discover latest apps, trending games, and essential tools.",
    url: "https://modernappstore.com",
    siteName: "Modern App Store",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modern App Store - Download Free Android APKs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Free Android APKs – Latest Apps & Games",
    description: "Download free Android APKs safely from Modern App Store. Discover latest apps, trending games, and essential tools.",
    images: ["/og-image.jpg"],
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
    canonical: "https://modernappstore.com",
  },
};

// Server-side data fetching function
async function getAppsData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_API_URL || 'http://localhost:3000';
    
    // Fetch apps in parallel for better performance
    const [recommendedRes, toolsRes, trendingRes] = await Promise.all([
      fetch(`${baseUrl}/api/apps?category=APPLICATION&collection=TOP_FREE`, { 
        next: { revalidate: 43200 } // Cache for 12 hours
      }),
      fetch(`${baseUrl}/api/apps?category=APPLICATION&collection=TOP_FREE`, { 
        next: { revalidate: 43200 }
      }),
      fetch(`${baseUrl}/api/apps?category=APPLICATION&collection=TOP_FREE`, { 
        next: { revalidate: 43200 }
      })
    ]);

    const [recommendedData, toolsData, trendingData] = await Promise.all([
      recommendedRes.json(),
      toolsRes.json(),
      trendingRes.json()
    ]);

    return {
      recommendedApps: recommendedData?.results?.slice(0, 16) || [],
      toolsApps: toolsData?.results?.slice(0, 16) || [],
      trendingApps: trendingData?.results?.slice(0, 6) || [],
    };
  } catch (error) {
    console.error('Error fetching apps data:', error);
    return {
      recommendedApps: [],
      toolsApps: [],
      trendingApps: [],
    };
  }
}

export default async function Home() {
  // Fetch data server-side for SEO
  const { recommendedApps, toolsApps, trendingApps } = await getAppsData();

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Modern App Store",
    "description": "Download free Android APKs safely from Modern App Store. Discover latest apps, trending games, and essential tools.",
    "url": "https://modernappstore.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://modernappstore.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Modern App Store",
      "url": "https://modernappstore.com"
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hybrid Home Page with SSR + Client Updates */}
      <HybridHomePage 
        initialData={{
          recommendedApps,
          toolsApps,
          trendingApps
        }}
      />
    </>
  );
}