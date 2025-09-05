import { Metadata } from "next";
import { Gamepad2, Palette, Music, Heart, BookOpen, Zap, GraduationCap, Leaf, Play, Smartphone, Watch, Scissors, Book, Building, MessageSquare, Calendar, DollarSign, Utensils, Dumbbell, House, Library, MapPin, Stethoscope, Newspaper, Baby, ShoppingBag, Trophy, Navigation, Video, Clock, Cloud, Dice1, Circle, Coffee, Sword, Crown, HelpCircle, Type, Car, Settings, Camera, Briefcase, Users } from "lucide-react";
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
      "numberOfItems": 37,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Application", "description": "Free download general applications" },
        { "@type": "ListItem", "position": 2, "name": "Android Wear", "description": "Free download Android Wear apps" },
        { "@type": "ListItem", "position": 3, "name": "Art and Design", "description": "Free download creative design tools" },
        { "@type": "ListItem", "position": 4, "name": "Auto and Vehicles", "description": "Free download car and vehicle apps" },
        { "@type": "ListItem", "position": 5, "name": "Beauty", "description": "Free download beauty and cosmetics" },
        { "@type": "ListItem", "position": 6, "name": "Books and Reference", "description": "Free download books and reference materials" },
        { "@type": "ListItem", "position": 7, "name": "Business", "description": "Free download business applications" },
        { "@type": "ListItem", "position": 8, "name": "Comics", "description": "Free download comic books and graphic novels" },
        { "@type": "ListItem", "position": 9, "name": "Communication", "description": "Free download communication tools" },
        { "@type": "ListItem", "position": 10, "name": "Dating", "description": "Free download dating and relationships" },
        { "@type": "ListItem", "position": 11, "name": "Education", "description": "Free download educational content" },
        { "@type": "ListItem", "position": 12, "name": "Entertainment", "description": "Free download entertainment content" },
        { "@type": "ListItem", "position": 13, "name": "Events", "description": "Free download event management" },
        { "@type": "ListItem", "position": 14, "name": "Finance", "description": "Free download financial tools" },
        { "@type": "ListItem", "position": 15, "name": "Food and Drink", "description": "Free download food and beverage apps" },
        { "@type": "ListItem", "position": 16, "name": "Health and Fitness", "description": "Free download health and fitness" },
        { "@type": "ListItem", "position": 17, "name": "House and Home", "description": "Free download home improvement" },
        { "@type": "ListItem", "position": 18, "name": "Libraries and Demo", "description": "Free download libraries and demos" },
        { "@type": "ListItem", "position": 19, "name": "Lifestyle", "description": "Free download lifestyle applications" },
        { "@type": "ListItem", "position": 20, "name": "Maps and Navigation", "description": "Free download maps and navigation" },
        { "@type": "ListItem", "position": 21, "name": "Medical", "description": "Free download medical applications" },
        { "@type": "ListItem", "position": 22, "name": "Music and Audio", "description": "Free download music and audio" },
        { "@type": "ListItem", "position": 23, "name": "News and Magazines", "description": "Free download news and magazines" },
        { "@type": "ListItem", "position": 24, "name": "Parenting", "description": "Free download parenting tools" },
        { "@type": "ListItem", "position": 25, "name": "Personalization", "description": "Free download personalization tools" },
        { "@type": "ListItem", "position": 26, "name": "Photography", "description": "Free download photography apps" },
        { "@type": "ListItem", "position": 27, "name": "Productivity", "description": "Free download productivity tools" },
        { "@type": "ListItem", "position": 28, "name": "Shopping", "description": "Free download shopping applications" },
        { "@type": "ListItem", "position": 29, "name": "Social", "description": "Free download social networking" },
        { "@type": "ListItem", "position": 30, "name": "Sports", "description": "Free download sports applications" },
        { "@type": "ListItem", "position": 31, "name": "Tools", "description": "Free download system tools" },
        { "@type": "ListItem", "position": 32, "name": "Travel and Local", "description": "Free download travel and local" },
        { "@type": "ListItem", "position": 33, "name": "Video Players", "description": "Free download video players" },
        { "@type": "ListItem", "position": 34, "name": "Watch Face", "description": "Free download watch faces" },
        { "@type": "ListItem", "position": 35, "name": "Weather", "description": "Free download weather applications" },
        { "@type": "ListItem", "position": 36, "name": "Games", "description": "Free download all games - Action, Adventure, Arcade, Puzzle, Racing, RPG, Strategy and more" },
        { "@type": "ListItem", "position": 37, "name": "Family", "description": "Free download family-friendly apps" }
      ]
    }
  };

  // Real Google Play Store categories from API
  const categories = [
    { name: "APPLICATION", icon: <Smartphone className="w-8 h-8" />, color: "bg-blue-500", description: "Free download general applications" },
    { name: "ANDROID_WEAR", icon: <Watch className="w-8 h-8" />, color: "bg-purple-500", description: "Free download Android Wear apps" },
    { name: "ART_AND_DESIGN", icon: <Palette className="w-8 h-8" />, color: "bg-pink-500", description: "Free download creative design tools" },
    { name: "AUTO_AND_VEHICLES", icon: <Car className="w-8 h-8" />, color: "bg-orange-500", description: "Free download car and vehicle apps" },
    { name: "BEAUTY", icon: <Scissors className="w-8 h-8" />, color: "bg-rose-500", description: "Free download beauty and cosmetics apps" },
    { name: "BOOKS_AND_REFERENCE", icon: <Book className="w-8 h-8" />, color: "bg-amber-500", description: "Free download books and reference materials" },
    { name: "BUSINESS", icon: <Building className="w-8 h-8" />, color: "bg-green-500", description: "Free download business applications" },
    { name: "COMICS", icon: <BookOpen className="w-8 h-8" />, color: "bg-indigo-500", description: "Free download comic books and graphic novels" },
    { name: "COMMUNICATION", icon: <MessageSquare className="w-8 h-8" />, color: "bg-cyan-500", description: "Free download communication tools" },
    { name: "DATING", icon: <Heart className="w-8 h-8" />, color: "bg-red-500", description: "Free download dating and relationships apps" },
    { name: "EDUCATION", icon: <GraduationCap className="w-8 h-8" />, color: "bg-blue-600", description: "Free download educational content" },
    { name: "ENTERTAINMENT", icon: <Play className="w-8 h-8" />, color: "bg-purple-600", description: "Free download entertainment content" },
    { name: "EVENTS", icon: <Calendar className="w-8 h-8" />, color: "bg-green-600", description: "Free download event management apps" },
    { name: "FINANCE", icon: <DollarSign className="w-8 h-8" />, color: "bg-yellow-500", description: "Free download financial tools" },
    { name: "FOOD_AND_DRINK", icon: <Utensils className="w-8 h-8" />, color: "bg-orange-600", description: "Free download food and beverage apps" },
    { name: "HEALTH_AND_FITNESS", icon: <Dumbbell className="w-8 h-8" />, color: "bg-emerald-500", description: "Free download health and fitness apps" },
    { name: "HOUSE_AND_HOME", icon: <House className="w-8 h-8" />, color: "bg-teal-500", description: "Free download home improvement apps" },
    { name: "LIBRARIES_AND_DEMO", icon: <Library className="w-8 h-8" />, color: "bg-slate-500", description: "Free download libraries and demos" },
    { name: "LIFESTYLE", icon: <Leaf className="w-8 h-8" />, color: "bg-green-600", description: "Free download lifestyle applications" },
    { name: "MAPS_AND_NAVIGATION", icon: <MapPin className="w-8 h-8" />, color: "bg-blue-700", description: "Free download maps and navigation apps" },
    { name: "MEDICAL", icon: <Stethoscope className="w-8 h-8" />, color: "bg-red-600", description: "Free download medical applications" },
    { name: "MUSIC_AND_AUDIO", icon: <Music className="w-8 h-8" />, color: "bg-purple-700", description: "Free download music and audio apps" },
    { name: "NEWS_AND_MAGAZINES", icon: <Newspaper className="w-8 h-8" />, color: "bg-gray-600", description: "Free download news and magazines" },
    { name: "PARENTING", icon: <Baby className="w-8 h-8" />, color: "bg-pink-600", description: "Free download parenting tools" },
    { name: "PERSONALIZATION", icon: <Settings className="w-8 h-8" />, color: "bg-indigo-600", description: "Free download personalization tools" },
    { name: "PHOTOGRAPHY", icon: <Camera className="w-8 h-8" />, color: "bg-cyan-600", description: "Free download photography apps" },
    { name: "PRODUCTIVITY", icon: <Briefcase className="w-8 h-8" />, color: "bg-green-700", description: "Free download productivity tools" },
    { name: "SHOPPING", icon: <ShoppingBag className="w-8 h-8" />, color: "bg-lime-500", description: "Free download shopping applications" },
    { name: "SOCIAL", icon: <Users className="w-8 h-8" />, color: "bg-blue-800", description: "Free download social networking apps" },
    { name: "SPORTS", icon: <Trophy className="w-8 h-8" />, color: "bg-orange-700", description: "Free download sports applications" },
    { name: "TOOLS", icon: <Zap className="w-8 h-8" />, color: "bg-yellow-600", description: "Free download system tools" },
    { name: "TRAVEL_AND_LOCAL", icon: <Navigation className="w-8 h-8" />, color: "bg-sky-500", description: "Free download travel and local apps" },
    { name: "VIDEO_PLAYERS", icon: <Video className="w-8 h-8" />, color: "bg-red-700", description: "Free download video players" },
    { name: "WATCH_FACE", icon: <Clock className="w-8 h-8" />, color: "bg-purple-800", description: "Free download watch faces" },
    { name: "WEATHER", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-900", description: "Free download weather applications" },
    { name: "GAME", icon: <Gamepad2 className="w-8 h-8" />, color: "bg-green-800", description: "Free download all games - Action, Adventure, Arcade, Puzzle, Racing, RPG, Strategy and more" },
    { name: "FAMILY", icon: <Users className="w-8 h-8" />, color: "bg-pink-700", description: "Free download family-friendly apps" }
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
            { label: 'Home', href: '/' },
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
              <a
                key={category.name}
                href={`/android-app-categories/${category.name}`}
                className="block bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-6 group transform hover:-translate-y-1"
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
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </a>
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
