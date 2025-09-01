import { Laptop, Gamepad2, Palette, Code, Database, Shield, Camera, Music, Heart, BookOpen, Globe, Zap, Users, ShoppingCart, Car, Home, Plane, GraduationCap, Briefcase, Leaf, Palette as ArtIcon, Play } from "lucide-react";
import Header from "../components/Header";

export default function CategoriesPage() {
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
            Browse App Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover apps organized by category. Find exactly what you need from our comprehensive collection.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group transform hover:-translate-y-1"
            >
              <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {category.icon}
                </div>
              </div>
              <h3 className="font-medium text-gray-900 text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{category.count.toLocaleString()} apps</span>
                <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our categories cover a wide range of applications, but if you need something specific, 
              try our advanced search or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm">
                Advanced Search
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 App Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
