import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CategoryDetailClient from './CategoryDetailClient';
import PerformanceOptimizations from './PerformanceOptimizations';

// Valid category names for validation
const VALID_CATEGORIES = [
  'APPLICATION', 'ANDROID_WEAR', 'ART_AND_DESIGN', 'AUTO_AND_VEHICLES', 'BEAUTY',
  'BOOKS_AND_REFERENCE', 'BUSINESS', 'COMICS', 'COMMUNICATION', 'DATING',
  'EDUCATION', 'ENTERTAINMENT', 'EVENTS', 'FINANCE', 'FOOD_AND_DRINK',
  'HEALTH_AND_FITNESS', 'HOUSE_AND_HOME', 'LIBRARIES_AND_DEMO', 'LIFESTYLE',
  'MAPS_AND_NAVIGATION', 'MEDICAL', 'MUSIC_AND_AUDIO', 'NEWS_AND_MAGAZINES',
  'PARENTING', 'PERSONALIZATION', 'PHOTOGRAPHY', 'PRODUCTIVITY', 'SHOPPING',
  'SOCIAL', 'SPORTS', 'TOOLS', 'TRAVEL_AND_LOCAL', 'VIDEO_PLAYERS',
  'WATCH_FACE', 'WEATHER', 'GAME', 'FAMILY'
];

// Category display names mapping
const CATEGORY_DISPLAY_NAMES: { [key: string]: string } = {
  'APPLICATION': 'Applications',
  'ANDROID_WEAR': 'Android Wear',
  'ART_AND_DESIGN': 'Art & Design',
  'AUTO_AND_VEHICLES': 'Auto & Vehicles',
  'BEAUTY': 'Beauty',
  'BOOKS_AND_REFERENCE': 'Books & Reference',
  'BUSINESS': 'Business',
  'COMICS': 'Comics',
  'COMMUNICATION': 'Communication',
  'DATING': 'Dating',
  'EDUCATION': 'Education',
  'ENTERTAINMENT': 'Entertainment',
  'EVENTS': 'Events',
  'FINANCE': 'Finance',
  'FOOD_AND_DRINK': 'Food & Drink',
  'HEALTH_AND_FITNESS': 'Health & Fitness',
  'HOUSE_AND_HOME': 'House & Home',
  'LIBRARIES_AND_DEMO': 'Libraries & Demo',
  'LIFESTYLE': 'Lifestyle',
  'MAPS_AND_NAVIGATION': 'Maps & Navigation',
  'MEDICAL': 'Medical',
  'MUSIC_AND_AUDIO': 'Music & Audio',
  'NEWS_AND_MAGAZINES': 'News & Magazines',
  'PARENTING': 'Parenting',
  'PERSONALIZATION': 'Personalization',
  'PHOTOGRAPHY': 'Photography',
  'PRODUCTIVITY': 'Productivity',
  'SHOPPING': 'Shopping',
  'SOCIAL': 'Social',
  'SPORTS': 'Sports',
  'TOOLS': 'Tools',
  'TRAVEL_AND_LOCAL': 'Travel & Local',
  'VIDEO_PLAYERS': 'Video Players',
  'WATCH_FACE': 'Watch Face',
  'WEATHER': 'Weather',
  'GAME': 'Games',
  'FAMILY': 'Family'
};

// Category descriptions mapping
const CATEGORY_DESCRIPTIONS: { [key: string]: string } = {
  'APPLICATION': 'Free download general applications - Download Android APK files for productivity, utility, and essential apps',
  'ANDROID_WEAR': 'Free download Android Wear apps - Download Android APK files for smartwatch and wearable applications',
  'ART_AND_DESIGN': 'Free download creative design tools - Download Android APK files for graphic design, drawing, and creative apps',
  'AUTO_AND_VEHICLES': 'Free download car and vehicle apps - Download Android APK files for automotive, navigation, and vehicle management',
  'BEAUTY': 'Free download beauty and cosmetics - Download Android APK files for beauty, fashion, and lifestyle applications',
  'BOOKS_AND_REFERENCE': 'Free download books and reference materials - Download Android APK files for ebooks, dictionaries, and educational content',
  'BUSINESS': 'Free download business applications - Download Android APK files for office, finance, and professional tools',
  'COMICS': 'Free download comic books and graphic novels - Download Android APK files for digital comics and manga readers',
  'COMMUNICATION': 'Free download communication tools - Download Android APK files for messaging, calling, and social apps',
  'DATING': 'Free download dating and relationships - Download Android APK files for dating, social, and relationship apps',
  'EDUCATION': 'Free download educational content - Download Android APK files for learning, courses, and educational tools',
  'ENTERTAINMENT': 'Free download entertainment content - Download Android APK files for movies, music, and entertainment apps',
  'EVENTS': 'Free download event management - Download Android APK files for event planning, tickets, and organization',
  'FINANCE': 'Free download financial tools - Download Android APK files for banking, investment, and money management',
  'FOOD_AND_DRINK': 'Free download food and beverage apps - Download Android APK files for recipes, delivery, and dining',
  'HEALTH_AND_FITNESS': 'Free download health and fitness - Download Android APK files for workout, diet, and wellness apps',
  'HOUSE_AND_HOME': 'Free download home improvement - Download Android APK files for interior design, gardening, and home management',
  'LIBRARIES_AND_DEMO': 'Free download libraries and demos - Download Android APK files for development tools and software demos',
  'LIFESTYLE': 'Free download lifestyle applications - Download Android APK files for personal organization and lifestyle tools',
  'MAPS_AND_NAVIGATION': 'Free download maps and navigation - Download Android APK files for GPS, maps, and travel assistance',
  'MEDICAL': 'Free download medical applications - Download Android APK files for health monitoring and medical tools',
  'MUSIC_AND_AUDIO': 'Free download music and audio - Download Android APK files for music players, streaming, and audio tools',
  'NEWS_AND_MAGAZINES': 'Free download news and magazines - Download Android APK files for news, articles, and media content',
  'PARENTING': 'Free download parenting tools - Download Android APK files for child care, education, and family management',
  'PERSONALIZATION': 'Free download personalization tools - Download Android APK files for themes, wallpapers, and customization',
  'PHOTOGRAPHY': 'Free download photography apps - Download Android APK files for camera, editing, and photo management',
  'PRODUCTIVITY': 'Free download productivity tools - Download Android APK files for work, organization, and efficiency apps',
  'SHOPPING': 'Free download shopping applications - Download Android APK files for e-commerce, deals, and retail apps',
  'SOCIAL': 'Free download social networking - Download Android APK files for social media, chat, and community apps',
  'SPORTS': 'Free download sports applications - Download Android APK files for fitness, sports news, and athletic tracking',
  'TOOLS': 'Free download system tools - Download Android APK files for utilities, file managers, and device optimization',
  'TRAVEL_AND_LOCAL': 'Free download travel and local - Download Android APK files for tourism, local services, and travel planning',
  'VIDEO_PLAYERS': 'Free download video players - Download Android APK files for media players, streaming, and video tools',
  'WATCH_FACE': 'Free download watch faces - Download Android APK files for smartwatch customization and watch faces',
  'WEATHER': 'Free download weather applications - Download Android APK files for weather forecasts and climate monitoring',
  'GAME': 'Free download all games - Download Android APK files for Action, Adventure, Arcade, Puzzle, Racing, RPG, Strategy and more',
  'FAMILY': 'Free download family-friendly apps - Download Android APK files for kids, education, and family entertainment'
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  
  // Validate category
  if (!VALID_CATEGORIES.includes(category.toUpperCase())) {
    return {
      title: 'Category Not Found',
      description: 'The requested category was not found.'
    };
  }

  const displayName = CATEGORY_DISPLAY_NAMES[category.toUpperCase()];
  const description = CATEGORY_DESCRIPTIONS[category.toUpperCase()];

  return {
    title: `${displayName} Apps - Free Download Android APK | Modern App Store`,
    description: `Discover the best ${displayName.toLowerCase()} apps for Android. ${description}. Browse our curated collection of top-rated applications and download Android APK files.`,
    keywords: [
      `${displayName.toLowerCase()} apps`,
      'android apps',
      'free download',
      'download android apk',
      'android apk files',
      'mobile applications',
      'app store',
      'google play',
      'android software',
      'mobile apps',
      'free apps',
      'download apps',
      'apk download',
      'android app store'
    ],
    authors: [{ name: 'Modern App Store' }],
    creator: 'Modern App Store',
    publisher: 'Modern App Store',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://modernappstore.com'),
    openGraph: {
      title: `${displayName} Apps - Free Download Android APK`,
      description: `Discover the best ${displayName.toLowerCase()} apps for Android. ${description}. Download Android APK files.`,
      url: `https://modernappstore.com/android-app-categories/${category}`,
      siteName: 'Modern App Store',
      images: [
        {
          url: 'https://modernappstore.com/logo_test.png',
          width: 1200,
          height: 630,
          alt: 'Modern App Store Logo',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} Apps - Free Download Android APK`,
      description: `Discover the best ${displayName.toLowerCase()} apps for Android. ${description}. Download Android APK files.`,
      images: ['https://modernappstore.com/logo_test.png'],
      creator: '@modernappstore',
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
    alternates: {
      canonical: `https://modernappstore.com/android-app-categories/${category}`,
    },
    verification: {
      google: 'your-google-verification-code',
    },
    category: 'Technology',
    classification: 'App Store',
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Modern App Store',
      'application-name': 'Modern App Store',
      'msapplication-TileColor': '#2563eb',
      'theme-color': '#2563eb',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  // Validate category
  if (!VALID_CATEGORIES.includes(category.toUpperCase())) {
    notFound();
  }

  const displayName = CATEGORY_DISPLAY_NAMES[category.toUpperCase()];
  const description = CATEGORY_DESCRIPTIONS[category.toUpperCase()];

  // Structured Data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${displayName} Apps - Free Download Android APK`,
    "description": `Discover the best ${displayName.toLowerCase()} apps for Android. ${description}. Download Android APK files.`,
    "url": `https://modernappstore.com/android-app-categories/${category}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": `${displayName} Apps`,
      "description": `Complete collection of ${displayName.toLowerCase()} apps for free download - Download Android APK files`,
      "numberOfItems": 100,
      "itemListElement": Array.from({ length: 100 }, (_, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `${displayName} App ${i + 1}`,
        "description": `Free download ${displayName.toLowerCase()} application`
      }))
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
          "name": "Categories",
          "item": "https://modernappstore.com/android-app-categories"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": displayName,
          "item": `https://modernappstore.com/android-app-categories/${category}`
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Modern App Store",
      "url": "https://modernappstore.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://modernappstore.com/logo_test.png"
      }
    }
  };

  return (
    <>
      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/android-app-categories" },
              { label: displayName, current: true }
            ]} 
          />

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {displayName} Apps
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          {/* Apps Grid */}
          <CategoryDetailClient category={category} />
        </div>
      </main>

      <PerformanceOptimizations />
    </>
  );
}
