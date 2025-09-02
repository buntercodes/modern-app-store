import { Metadata } from "next";
import { Laptop, Gamepad2, Palette, Code, Database, Shield, Camera, Music, Heart, BookOpen, Globe, Zap, Users, ShoppingCart, Car, Home, Plane, GraduationCap, Briefcase, Leaf, Palette as ArtIcon, Play } from "lucide-react";
import Header from "../components/Header";

// SEO-optimized metadata for android app categories page
export const metadata: Metadata = {
  title: "Android App Categories - Browse by Category | Modern App Store",
  description: "Browse Android apps by category. Find productivity apps, games, entertainment, business tools, and more. Organized categories for easy discovery of Android applications.",
  keywords: "android app categories, browse android apps, productivity apps, entertainment apps, business apps, android app store categories, mobile app categories",
  authors: [{ name: "Modern App Store Team" }],
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
    canonical: "https://modernappstore.com/android-app-categories",
  },
};

export default function AndroidAppCategoriesPage() {
  const categories = [
    { name: "Productivity", icon: <Laptop className="w-8 h-8" />, color: "bg-blue-500", count: 1250, description: "Tools to boost your efficiency" },
    { name: "Entertainment", icon: <Gamepad2 className="w-8 h-8" />, color: "bg-purple-500", count: 890, description: "Games and fun applications" },
    { name: "Design", icon: <Palette className="w-8 h-8" />, color: "bg-pink-500", count: 456, description: "Creative design tools" },
    { name: "Development", icon: <Code className="w-8 h-8" />, color: "bg-green-500", count: 678, description: "Programming and development tools" },
    { name: "Business", icon: <Database className="w-8 h-8" />, color: "bg-orange-500", count: 789, description: "Business and finance applications" },
    { name: "Security", icon: <Shield className="w-8 h-8" />, color: "bg-red-500", count: 234, description: "Privacy and security tools" },
    { name: "Photo & Video", icon: <Camera className="w-8 h-8" />, color: "bg-indigo-500", count: 567, description: "Photo and video editing apps" },
    { name: "Music & Audio", icon: <Music className="w-8 h-8" />, color: "bg-emerald-500", count: 345, description: "Music streaming and audio tools" },
    { name: "Health & Fitness", icon: <Heart className="w-8 h-8" />, color: "bg-rose-500", count: 456, description: "Health monitoring and fitness apps" },
    { name: "Education", icon: <BookOpen className="w-8 h-8" />, color: "bg-amber-500", count: 678, description: "Learning and educational tools" },
    { name: "Social", icon: <Users className="w-8 h-8" />, color: "bg-cyan-500", count: 890, description: "Social networking applications" },
    { name: "Shopping", icon: <ShoppingCart className="w-8 h-8" />, color: "bg-lime-500", count: 234, description: "E-commerce and shopping apps" },
    { name: "Travel", icon: <Plane className="w-8 h-8" />, color: "bg-sky-500", count: 345, description: "Travel planning and navigation" },
    { name: "Home & Garden", icon: <Home className="w-8 h-8" />, color: "bg-teal-500", count: 123, description: "Home improvement and gardening" },
    { name: "Automotive", icon: <Car className="w-8 h-8" />, color: "bg-slate-500", count: 234, description: "Car and vehicle related apps" },
    { name: "Finance", icon: <Briefcase className="w-8 h-8" />, color: "bg-yellow-500", count: 456, description: "Financial management tools" },
    { name: "Lifestyle", icon: <Leaf className="w-8 h-8" />, color: "bg-green-600", count: 567, description: "Personal lifestyle applications" },
    { name: "Art & Culture", icon: <ArtIcon className="w-8 h-8" />, color: "bg-purple-600", count: 234, description: "Art and cultural content" },
    { name: "News & Weather", icon: <Globe className="w-8 h-8" />, color: "bg-blue-600", count: 345, description: "News and weather information" },
    { name: "Utilities", icon: <Zap className="w-8 h-8" />, color: "bg-yellow-600", count: 678, description: "System utilities and tools" },
    { name: "Sports", icon: <Gamepad2 className="w-8 h-8" />, color: "bg-orange-600", count: 234, description: "Sports and athletics apps" },
    { name: "Food & Dining", icon: <ShoppingCart className="w-8 h-8" />, color: "bg-red-600", count: 345, description: "Food delivery and dining apps" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4 mb-3">
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} apps
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* SEO Content Section */}
        <section className="mt-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover Android Apps by Category</h2>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Android app categories are carefully organized to help you find the perfect applications for your needs. 
                Whether you're looking for <a href="/free-download-android-apps" className="text-green-600 hover:text-green-700 font-medium">productivity tools</a> to boost your efficiency, 
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
                you'll find high-quality options in every category.
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
  );
}
