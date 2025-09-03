import { Metadata } from "next";
import { Gamepad2, Palette, Shield, Camera, Music, Heart, BookOpen, Globe, Zap, Users, ShoppingCart, Car, Home, Plane, GraduationCap, Briefcase, Leaf, Play, Smartphone, Watch, Scissors, Book, Building, MessageSquare, Calendar, DollarSign, Utensils, Dumbbell, House, Library, MapPin, Stethoscope, Newspaper, Baby, ShoppingBag, Trophy, Navigation, Video, Clock, Cloud, Dice1, Circle, Coffee, Sword, Crown, HelpCircle, Type } from "lucide-react";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";

// SEO-optimized metadata for android app categories page
export const metadata: Metadata = {
  title: "Android App Categories - Browse by Category | Modern App Store",
  description: "Browse Android apps by category. Find productivity apps, games, entertainment, business tools, and more. Organized categories for easy discovery of Android applications.",
  keywords: "android app categories, browse android apps, productivity apps, entertainment apps, business apps, android app store categories, mobile app categories",
  authors: [{ name: "Modern App Store Team" }],
  creator: "Modern App Store",
  publisher: "Modern App Store",
  metadataBase: new URL('https://modernappstore.com'),
  openGraph: {
    title: "Android App Categories - Browse by Category",
    description: "Browse Android apps by category. Find productivity apps, games, entertainment, business tools, and more. Organized categories for easy discovery.",
    url: "https://modernappstore.com/android-app-categories",
    siteName: "Modern App Store",
    images: [
      {
        url: "/og-android-categories.jpg",
        width: 1200,
        height: 630,
        alt: "Android App Categories - Browse by Category",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Android App Categories - Browse by Category",
    description: "Browse Android apps by category. Find productivity apps, games, entertainment, business tools, and more. Organized categories for easy discovery.",
    images: ["/og-android-categories.jpg"],
    creator: "@modernappstore",
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
    canonical: "https://modernappstore.com/android-app-categories",
  },
  category: "technology",
  classification: "Android App Store Categories",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default function AndroidAppCategoriesPage() {
  // Structured data for better SEO and Google understanding
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Android App Categories - Browse by Category",
    "description": "Browse Android apps by category. Find productivity apps, games, entertainment, business tools, and more. Organized categories for easy discovery of Android applications.",
    "url": "https://modernappstore.com/android-app-categories",
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
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Android App Categories",
      "description": "Complete list of Android app categories available in our store",
      "numberOfItems": 54,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Application", "description": "General applications" },
        { "@type": "ListItem", "position": 2, "name": "Android Wear", "description": "Android Wear apps" },
        { "@type": "ListItem", "position": 3, "name": "Art and Design", "description": "Creative design tools" },
        { "@type": "ListItem", "position": 4, "name": "Auto and Vehicles", "description": "Car and vehicle apps" },
        { "@type": "ListItem", "position": 5, "name": "Beauty", "description": "Beauty and cosmetics" },
        { "@type": "ListItem", "position": 6, "name": "Books and Reference", "description": "Books and reference materials" },
        { "@type": "ListItem", "position": 7, "name": "Business", "description": "Business applications" },
        { "@type": "ListItem", "position": 8, "name": "Comics", "description": "Comic books and graphic novels" },
        { "@type": "ListItem", "position": 9, "name": "Communication", "description": "Communication tools" },
        { "@type": "ListItem", "position": 10, "name": "Dating", "description": "Dating and relationships" },
        { "@type": "ListItem", "position": 11, "name": "Education", "description": "Educational content" },
        { "@type": "ListItem", "position": 12, "name": "Entertainment", "description": "Entertainment content" },
        { "@type": "ListItem", "position": 13, "name": "Events", "description": "Event management" },
        { "@type": "ListItem", "position": 14, "name": "Finance", "description": "Financial tools" },
        { "@type": "ListItem", "position": 15, "name": "Food and Drink", "description": "Food and beverage apps" },
        { "@type": "ListItem", "position": 16, "name": "Health and Fitness", "description": "Health and fitness" },
        { "@type": "ListItem", "position": 17, "name": "House and Home", "description": "Home improvement" },
        { "@type": "ListItem", "position": 18, "name": "Libraries and Demo", "description": "Libraries and demos" },
        { "@type": "ListItem", "position": 19, "name": "Lifestyle", "description": "Lifestyle applications" },
        { "@type": "ListItem", "position": 20, "name": "Maps and Navigation", "description": "Maps and navigation" },
        { "@type": "ListItem", "position": 21, "name": "Medical", "description": "Medical applications" },
        { "@type": "ListItem", "position": 22, "name": "Music and Audio", "description": "Music and audio" },
        { "@type": "ListItem", "position": 23, "name": "News and Magazines", "description": "News and magazines" },
        { "@type": "ListItem", "position": 24, "name": "Parenting", "description": "Parenting tools" },
        { "@type": "ListItem", "position": 25, "name": "Personalization", "description": "Personalization tools" },
        { "@type": "ListItem", "position": 26, "name": "Photography", "description": "Photography apps" },
        { "@type": "ListItem", "position": 27, "name": "Productivity", "description": "Productivity tools" },
        { "@type": "ListItem", "position": 28, "name": "Shopping", "description": "Shopping applications" },
        { "@type": "ListItem", "position": 29, "name": "Social", "description": "Social networking" },
        { "@type": "ListItem", "position": 30, "name": "Sports", "description": "Sports applications" },
        { "@type": "ListItem", "position": 31, "name": "Tools", "description": "System tools" },
        { "@type": "ListItem", "position": 32, "name": "Travel and Local", "description": "Travel and local" },
        { "@type": "ListItem", "position": 33, "name": "Video Players", "description": "Video players" },
        { "@type": "ListItem", "position": 34, "name": "Watch Face", "description": "Watch faces" },
        { "@type": "ListItem", "position": 35, "name": "Weather", "description": "Weather applications" },
        { "@type": "ListItem", "position": 36, "name": "Game", "description": "General games" },
        { "@type": "ListItem", "position": 37, "name": "Game Action", "description": "Action games" },
        { "@type": "ListItem", "position": 38, "name": "Game Adventure", "description": "Adventure games" },
        { "@type": "ListItem", "position": 39, "name": "Game Arcade", "description": "Arcade games" },
        { "@type": "ListItem", "position": 40, "name": "Game Board", "description": "Board games" },
        { "@type": "ListItem", "position": 41, "name": "Game Card", "description": "Card games" },
        { "@type": "ListItem", "position": 42, "name": "Game Casino", "description": "Casino games" },
        { "@type": "ListItem", "position": 43, "name": "Game Casual", "description": "Casual games" },
        { "@type": "ListItem", "position": 44, "name": "Game Educational", "description": "Educational games" },
        { "@type": "ListItem", "position": 45, "name": "Game Music", "description": "Music games" },
        { "@type": "ListItem", "position": 46, "name": "Game Puzzle", "description": "Puzzle games" },
        { "@type": "ListItem", "position": 47, "name": "Game Racing", "description": "Racing games" },
        { "@type": "ListItem", "position": 48, "name": "Game Role Playing", "description": "RPG games" },
        { "@type": "ListItem", "position": 49, "name": "Game Simulation", "description": "Simulation games" },
        { "@type": "ListItem", "position": 50, "name": "Game Sports", "description": "Sports games" },
        { "@type": "ListItem", "position": 51, "name": "Game Strategy", "description": "Strategy games" },
        { "@type": "ListItem", "position": 52, "name": "Game Trivia", "description": "Trivia games" },
        { "@type": "ListItem", "position": 53, "name": "Game Word", "description": "Word games" },
        { "@type": "ListItem", "position": 54, "name": "Family", "description": "Family-friendly apps" }
      ]
    }
  };

  // Real Google Play Store categories from API
  const categories = [
    { name: "APPLICATION", icon: <Smartphone className="w-8 h-8" />, color: "bg-blue-500", count: 1250, description: "General applications" },
    { name: "ANDROID_WEAR", icon: <Watch className="w-8 h-8" />, color: "bg-purple-500", count: 89, description: "Android Wear apps" },
    { name: "ART_AND_DESIGN", icon: <Palette className="w-8 h-8" />, color: "bg-pink-500", count: 456, description: "Creative design tools" },
    { name: "AUTO_AND_VEHICLES", icon: <CarIcon className="w-8 h-8" />, color: "bg-orange-500", count: 234, description: "Car and vehicle apps" },
    { name: "BEAUTY", icon: <Scissors className="w-8 h-8" />, color: "bg-rose-500", count: 345, description: "Beauty and cosmetics" },
    { name: "BOOKS_AND_REFERENCE", icon: <Book className="w-8 h-8" />, color: "bg-amber-500", count: 678, description: "Books and reference materials" },
    { name: "BUSINESS", icon: <Building className="w-8 h-8" />, color: "bg-green-500", count: 789, description: "Business applications" },
    { name: "COMICS", icon: <BookOpen className="w-8 h-8" />, color: "bg-indigo-500", count: 123, description: "Comic books and graphic novels" },
    { name: "COMMUNICATION", icon: <MessageSquare className="w-8 h-8" />, color: "bg-cyan-500", count: 567, description: "Communication tools" },
    { name: "DATING", icon: <Heart className="w-8 h-8" />, color: "bg-red-500", count: 234, description: "Dating and relationships" },
    { name: "EDUCATION", icon: <GraduationCap className="w-8 h-8" />, color: "bg-blue-600", count: 890, description: "Educational content" },
    { name: "ENTERTAINMENT", icon: <Play className="w-8 h-8" />, color: "bg-purple-600", count: 1200, description: "Entertainment content" },
    { name: "EVENTS", icon: <Calendar className="w-8 h-8" />, color: "bg-green-600", count: 156, description: "Event management" },
    { name: "FINANCE", icon: <DollarSign className="w-8 h-8" />, color: "bg-yellow-500", count: 456, description: "Financial tools" },
    { name: "FOOD_AND_DRINK", icon: <Utensils className="w-8 h-8" />, color: "bg-orange-600", count: 345, description: "Food and beverage apps" },
    { name: "HEALTH_AND_FITNESS", icon: <Dumbbell className="w-8 h-8" />, color: "bg-emerald-500", count: 567, description: "Health and fitness" },
    { name: "HOUSE_AND_HOME", icon: <House className="w-8 h-8" />, color: "bg-teal-500", count: 234, description: "Home improvement" },
    { name: "LIBRARIES_AND_DEMO", icon: <Library className="w-8 h-8" />, color: "bg-slate-500", count: 123, description: "Libraries and demos" },
    { name: "LIFESTYLE", icon: <Leaf className="w-8 h-8" />, color: "bg-green-600", count: 456, description: "Lifestyle applications" },
    { name: "MAPS_AND_NAVIGATION", icon: <MapPin className="w-8 h-8" />, color: "bg-blue-700", count: 234, description: "Maps and navigation" },
    { name: "MEDICAL", icon: <Stethoscope className="w-8 h-8" />, color: "bg-red-600", count: 345, description: "Medical applications" },
    { name: "MUSIC_AND_AUDIO", icon: <Music className="w-8 h-8" />, color: "bg-purple-700", count: 567, description: "Music and audio" },
    { name: "NEWS_AND_MAGAZINES", icon: <Newspaper className="w-8 h-8" />, color: "bg-gray-600", count: 234, description: "News and magazines" },
    { name: "PARENTING", icon: <Baby className="w-8 h-8" />, color: "bg-pink-600", count: 123, description: "Parenting tools" },
    { name: "PERSONALIZATION", icon: <PersonalizationIcon className="w-8 h-8" />, color: "bg-indigo-600", count: 345, description: "Personalization tools" },
    { name: "PHOTOGRAPHY", icon: <PhotoIcon className="w-8 h-8" />, color: "bg-cyan-600", count: 456, description: "Photography apps" },
    { name: "PRODUCTIVITY", icon: <ProductivityIcon className="w-8 h-8" />, color: "bg-green-700", count: 890, description: "Productivity tools" },
    { name: "SHOPPING", icon: <ShoppingBag className="w-8 h-8" />, color: "bg-lime-500", count: 567, description: "Shopping applications" },
    { name: "SOCIAL", icon: <SocialIcon className="w-8 h-8" />, color: "bg-blue-800", count: 678, description: "Social networking" },
    { name: "SPORTS", icon: <Trophy className="w-8 h-8" />, color: "bg-orange-700", count: 345, description: "Sports applications" },
    { name: "TOOLS", icon: <Zap className="w-8 h-8" />, color: "bg-yellow-600", count: 789, description: "System tools" },
    { name: "TRAVEL_AND_LOCAL", icon: <Navigation className="w-8 h-8" />, color: "bg-sky-500", count: 456, description: "Travel and local" },
    { name: "VIDEO_PLAYERS", icon: <Video className="w-8 h-8" />, color: "bg-red-700", count: 234, description: "Video players" },
    { name: "WATCH_FACE", icon: <Clock className="w-8 h-8" />, color: "bg-purple-800", count: 123, description: "Watch faces" },
    { name: "WEATHER", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-900", count: 156, description: "Weather applications" },
    { name: "GAME", icon: <GameIcon className="w-8 h-8" />, color: "bg-green-800", count: 2000, description: "General games" },
    { name: "GAME_ACTION", icon: <Sword className="w-8 h-8" />, color: "bg-red-800", count: 456, description: "Action games" },
    { name: "GAME_ADVENTURE", icon: <MapPin className="w-8 h-8" />, color: "bg-indigo-700", count: 345, description: "Adventure games" },
    { name: "GAME_ARCADE", icon: <Gamepad2 className="w-8 h-8" />, color: "bg-yellow-700", count: 567, description: "Arcade games" },
    { name: "GAME_BOARD", icon: <Crown className="w-8 h-8" />, color: "bg-amber-600", count: 234, description: "Board games" },
    { name: "GAME_CARD", icon: <Dice1 className="w-8 h-8" />, color: "bg-purple-900", count: 345, description: "Card games" },
    { name: "GAME_CASINO", icon: <Circle className="w-8 h-8" />, color: "bg-red-900", count: 123, description: "Casino games" },
    { name: "GAME_CASUAL", icon: <Coffee className="w-8 h-8" />, color: "bg-orange-800", count: 678, description: "Casual games" },
    { name: "GAME_EDUCATIONAL", icon: <EducationIcon className="w-8 h-8" />, color: "bg-blue-800", count: 456, description: "Educational games" },
    { name: "GAME_MUSIC", icon: <MusicIcon className="w-8 h-8" />, color: "bg-purple-800", count: 234, description: "Music games" },
    { name: "GAME_PUZZLE", icon: <PuzzleIcon className="w-8 h-8" />, color: "bg-indigo-800", count: 567, description: "Puzzle games" },
    { name: "GAME_RACING", icon: <RacingIcon className="w-8 h-8" />, color: "bg-red-800", count: 345, description: "Racing games" },
    { name: "GAME_ROLE_PLAYING", icon: <Sword className="w-8 h-8" />, color: "bg-green-800", count: 456, description: "RPG games" },
    { name: "GAME_SIMULATION", icon: <SimulationIcon className="w-8 h-8" />, color: "bg-gray-700", count: 234, description: "Simulation games" },
    { name: "GAME_SPORTS", icon: <SportsIcon className="w-8 h-8" />, color: "bg-orange-800", count: 345, description: "Sports games" },
    { name: "GAME_STRATEGY", icon: <Crown className="w-8 h-8" />, color: "bg-amber-700", count: 234, description: "Strategy games" },
    { name: "GAME_TRIVIA", icon: <HelpCircle className="w-8 h-8" />, color: "bg-blue-800", count: 123, description: "Trivia games" },
    { name: "GAME_WORD", icon: <Type className="w-8 h-8" />, color: "bg-green-700", count: 156, description: "Word games" },
    { name: "FAMILY", icon: <FamilyIcon className="w-8 h-8" />, color: "bg-pink-700", count: 456, description: "Family-friendly apps" }
  ];

  return (
    <>
      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-white">
        <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Categories', current: true }
          ]} 
        />

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Android App Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse Android apps organized by category. Find exactly what you need from our comprehensive collection of applications and games.
          </p>
        </div>

        {/* Categories Grid */}
        <section aria-label="App Categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <article
                key={category.name}
                className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group transform hover:-translate-y-1"
                role="button"
                tabIndex={0}
                aria-label={`Browse ${category.name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} apps`}
              >
              <div className="flex items-center space-x-4 mb-3">
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
                    {category.name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} apps
                  </p>
                </div>
              </div>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mt-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover Android Apps by Category</h2>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Android app categories are carefully organized to help you find the perfect applications for your needs. 
                Whether you&apos;re looking for <a href="/free-download-android-apps" className="text-green-600 hover:text-green-700 font-medium">productivity tools</a> to boost your efficiency, 
                <a href="/free-download-android-games" className="text-green-600 hover:text-green-700 font-medium"> entertainment and games</a> for fun, 
                or <a href="/search" className="text-green-600 hover:text-green-700 font-medium">business applications</a> for work, 
                our categories make it easy to discover the best Android apps.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Each category contains carefully curated Android applications that have been tested and verified for safety and functionality. 
                From <a href="/search?filter=productivity" className="text-green-600 hover:text-green-700 font-medium">productivity apps</a> and 
                <a href="/search?filter=entertainment" className="text-green-600 hover:text-green-700 font-medium"> entertainment apps</a> to 
                <a href="/search?filter=business" className="text-green-600 hover:text-green-700 font-medium"> business tools</a> and 
                <a href="/search?filter=education" className="text-green-600 hover:text-green-700 font-medium"> educational apps</a>, 
                you&apos;ll find high-quality options in every category.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Browse our categories to discover new Android apps, or use our search function to find specific applications. 
                All our Android apps are available as free APK downloads with regular updates to ensure you always have the latest features.
              </p>
            </div>
          </div>
        </section>
      </main>
      </div>
    </>
  );
}
