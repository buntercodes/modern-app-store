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
    // Use the current domain for API calls in production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://modern-app-store.vercel.app'
      : process.env.NEXT_PUBLIC_GOOGLE_PLAY_API_URL || 'http://localhost:3000';
    
    console.log('🔍 Fetching apps data from:', baseUrl);
    
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

    // Check if responses are ok
    if (!recommendedRes.ok || !toolsRes.ok || !trendingRes.ok) {
      throw new Error(`API responses not ok: ${recommendedRes.status}, ${toolsRes.status}, ${trendingRes.status}`);
    }

    const [recommendedData, toolsData, trendingData] = await Promise.all([
      recommendedRes.json(),
      toolsRes.json(),
      trendingRes.json()
    ]);

    console.log('✅ Apps data fetched successfully:', {
      recommended: recommendedData?.results?.length || 0,
      tools: toolsData?.results?.length || 0,
      trending: trendingData?.results?.length || 0
    });

    return {
      recommendedApps: recommendedData?.results?.slice(0, 16) || [],
      toolsApps: toolsData?.results?.slice(0, 16) || [],
      trendingApps: trendingData?.results?.slice(0, 6) || [],
    };
  } catch (error) {
    console.error('❌ Error fetching apps data:', error);
    
    // Return fallback data to prevent empty states
    return {
      recommendedApps: getFallbackApps('recommended'),
      toolsApps: getFallbackApps('tools'),
      trendingApps: getFallbackApps('trending'),
    };
  }
}

// Fallback data when API fails
function getFallbackApps(type: 'recommended' | 'tools' | 'trending') {
  const fallbackApps = [
    {
      appId: 'com.whatsapp',
      title: 'WhatsApp',
      summary: 'Simple, reliable messaging and calling for free.',
      developer: { devId: 'whatsapp-inc', url: 'https://play.google.com/store/apps/developer?id=WhatsApp+Inc.' },
      icon: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptPuwXCKWXlO0xV5Om96d0hZg9Rsfb9f3FTX5byr_VXu',
      score: 4.1,
      scoreText: '4.1',
      price: 0,
      free: true,
      url: 'https://play.google.com/store/apps/details?id=com.whatsapp',
      playstoreUrl: 'https://play.google.com/store/apps/details?id=com.whatsapp',
      currency: 'USD',
      categories: 'COMMUNICATION',
      installs: '5,000,000,000+',
      version: '2.24.1.78',
      androidVersion: '5.0',
      contentRating: 'Everyone',
      genre: 'Communication'
    },
    {
      appId: 'com.instagram.android',
      title: 'Instagram',
      summary: 'Connect with friends, share your life and discover amazing content.',
      developer: { devId: 'instagram', url: 'https://play.google.com/store/apps/developer?id=Instagram' },
      icon: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLas1RRWCZ5VUUrLL-m49BcB85GACEWX0Ofp6ZE64qX5w',
      score: 4.3,
      scoreText: '4.3',
      price: 0,
      free: true,
      url: 'https://play.google.com/store/apps/details?id=com.instagram.android',
      playstoreUrl: 'https://play.google.com/store/apps/details?id=com.instagram.android',
      currency: 'USD',
      categories: 'SOCIAL',
      installs: '1,000,000,000+',
      version: '312.0.0.45.120',
      androidVersion: '7.0',
      contentRating: 'Teen',
      genre: 'Social'
    },
    {
      appId: 'com.spotify.music',
      title: 'Spotify',
      summary: 'Music and podcasts for everyone.',
      developer: { devId: 'spotify-ab', url: 'https://play.google.com/store/apps/developer?id=Spotify+AB' },
      icon: 'https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM',
      score: 4.5,
      scoreText: '4.5',
      price: 0,
      free: true,
      url: 'https://play.google.com/store/apps/details?id=com.spotify.music',
      playstoreUrl: 'https://play.google.com/store/apps/details?id=com.spotify.music',
      currency: 'USD',
      categories: 'MUSIC_AND_AUDIO',
      installs: '1,000,000,000+',
      version: '8.8.96.510',
      androidVersion: '5.0',
      contentRating: 'Everyone',
      genre: 'Music & Audio'
    }
  ];

  return type === 'trending' ? fallbackApps.slice(0, 3) : fallbackApps;
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