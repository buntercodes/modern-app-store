"use client";

import { useState, useEffect } from 'react';
import { Star, Download, TrendingUp, Smartphone, Search, Filter, ArrowRight, ExternalLink, Gamepad2, MessageSquare, Music, Camera, Shield, Zap } from "lucide-react";
import Header from "./Header";
import AppCard from "./AppCard";
import Link from "next/link";
import BackgroundDataUpdater from "./BackgroundDataUpdater";

interface HybridHomePageProps {
  initialData: {
    recommendedApps: any[];
    toolsApps: any[];
    trendingApps: any[];
  };
}

export default function HybridHomePage({ initialData }: HybridHomePageProps) {
  const [appsData, setAppsData] = useState(initialData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataUpdate = (newData: typeof initialData) => {
    setAppsData(newData);
  };

  // SEO-optimized category data with internal links
  const featuredCategories = [
    { 
      name: "Action Games APKs", 
      icon: <Gamepad2 className="w-8 h-8" />, 
      color: "bg-red-500", 
      href: "/categories?filter=action-games",
      description: "Download latest action games"
    },
    { 
      name: "Tools & Utilities", 
      icon: <Zap className="w-8 h-8" />, 
      color: "bg-blue-500", 
      href: "/categories?filter=tools",
      description: "Essential productivity tools"
    },
    { 
      name: "Communication Apps", 
      icon: <MessageSquare className="w-8 h-8" />, 
      color: "bg-green-500", 
      href: "/categories?filter=communication",
      description: "Messaging and social apps"
    },
    { 
      name: "Music & Audio", 
      icon: <Music className="w-8 h-8" />, 
      color: "bg-purple-500", 
      href: "/categories?filter=music",
      description: "Music streaming and audio tools"
    },
    { 
      name: "Photography", 
      icon: <Camera className="w-8 h-8" />, 
      color: "bg-pink-500", 
      href: "/categories?filter=photography",
      description: "Photo editing and camera apps"
    },
    { 
      name: "Security & Privacy", 
      icon: <Shield className="w-8 h-8" />, 
      color: "bg-indigo-500", 
      href: "/categories?filter=security",
      description: "Privacy and security tools"
    }
  ];

  // Custom snippets for trending apps
  const getCustomSnippet = (app: any) => {
    const snippets = {
      'com.whatsapp': 'WhatsApp – free messaging app with latest update APK download',
      'com.spotify.music': 'Spotify Music – stream millions of songs with premium features APK',
      'com.instagram.android': 'Instagram – share photos and videos with friends APK download',
      'com.facebook.katana': 'Facebook – connect with friends and family worldwide APK',
      'com.google.android.youtube': 'YouTube – watch videos and create content APK download',
      'com.netflix.mediaclient': 'Netflix – stream movies and TV shows APK download'
    };
    
    return snippets[app.appId as keyof typeof snippets] || `${app.title} – ${app.summary.substring(0, 50)}... APK download`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* SEO Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 mb-16 border border-gray-100 shadow-sm">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Download Free Android APKs – Latest Apps & Games
            </h1>
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-xl text-gray-600 leading-relaxed">
                Welcome to Modern App Store, the trusted place to download free Android APKs safely. 
                Discover the latest apps, trending games, and essential tools. From messaging and social apps 
                to productivity, action, and adventure games, we provide direct APK downloads with fast updates. 
                All our APK files are verified, secure, and regularly updated to ensure you get the best experience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/categories"
                className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-medium text-lg flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse by Category
              </Link>
              <Link 
                href="/search"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <Filter className="w-5 h-5 mr-2" />
                Search Apps
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Popular Categories</h2>
          <p className="text-gray-600 text-center mb-8">Find the best apps organized by category</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-6 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Apps Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Android Apps Today</h2>
            <Link 
              href="/search?filter=trending"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All Trending
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appsData.trendingApps.length > 0 ? (
              appsData.trendingApps.slice(0, 6).map((app) => (
                <div key={app.appId} className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-6 group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {app.icon ? (
                        <img 
                          src={app.icon} 
                          alt={app.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="bg-gradient-to-br from-green-100 to-blue-100 w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                          {app.title.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <Link href={`/app/${app.appId}`}>
                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                          {app.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {getCustomSnippet(app)}
                      </p>
                      
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-gray-700">{app.score}</span>
                        </div>
                        <span>•</span>
                        <span>{app.free ? 'Free' : `$${app.price}`}</span>
                      </div>
                      
                      <Link 
                        href={`/app/${app.appId}`}
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Download APK
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No trending apps available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Latest Games Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Android Games APKs</h2>
            <Link 
              href="/categories?filter=games"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All Games
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {appsData.recommendedApps.length > 0 ? (
              appsData.recommendedApps.slice(0, 6).map((app) => (
                <AppCard key={app.appId} app={app} variant="compact" />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No games available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Tools & Utilities Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Smartphone className="w-8 h-8 mr-3 text-blue-500" />
              Essential Tools & Utilities
            </h2>
            <Link 
              href="/categories?filter=tools"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All Tools
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {appsData.toolsApps.length > 0 ? (
              appsData.toolsApps.slice(0, 6).map((app) => (
                <AppCard key={app.appId} app={app} variant="compact" />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No tools available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Block */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Download APKs from Modern App Store?</h2>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Modern App Store is your trusted destination for downloading free Android APK files safely and securely. 
                We provide direct access to the latest versions of popular apps and games, ensuring you always have 
                the most up-to-date software on your Android device. Our extensive collection includes everything from 
                <Link href="/categories?filter=communication" className="text-green-600 hover:text-green-700 font-medium"> messaging apps</Link> and 
                <Link href="/categories?filter=social" className="text-green-600 hover:text-green-700 font-medium"> social media platforms</Link> to 
                <Link href="/categories?filter=productivity" className="text-green-600 hover:text-green-700 font-medium"> productivity tools</Link> and 
                <Link href="/categories?filter=games" className="text-green-600 hover:text-green-700 font-medium"> action-packed games</Link>.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                All our APK files are thoroughly scanned for malware and viruses before being made available for download. 
                We maintain a comprehensive database of verified applications, regularly updating our collection with the 
                newest releases and most popular apps. Whether you're looking for 
                <Link href="/categories?filter=photography" className="text-green-600 hover:text-green-700 font-medium"> photography apps</Link>, 
                <Link href="/categories?filter=music" className="text-green-600 hover:text-green-700 font-medium"> music streaming services</Link>, or 
                <Link href="/categories?filter=security" className="text-green-600 hover:text-green-700 font-medium"> security tools</Link>, 
                you'll find them all here with fast download speeds and reliable installation.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Our user-friendly interface makes it easy to browse categories, search for specific apps, and discover 
                new favorites. Each app listing includes detailed information, user ratings, and direct download links. 
                Start exploring our collection today and enhance your Android experience with the best apps and games available.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-medium text-gray-900">Modern App Store</span>
              </div>
              <p className="text-gray-600 text-sm">
                Discover amazing apps and tools for every need. Your trusted source for quality applications and free Android APK downloads.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-sm">Discover</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/" className="hover:text-gray-900 transition-colors">Featured Apps</Link></li>
                <li><Link href="/search" className="hover:text-gray-900 transition-colors">New Releases</Link></li>
                <li><Link href="/search?filter=trending" className="hover:text-gray-900 transition-colors">Top Charts</Link></li>
                <li><Link href="/categories" className="hover:text-gray-900 transition-colors">Categories</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-sm">Support</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Developer Portal</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-sm">Connect</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Modern App Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Background Data Updater - Only show on client side */}
      {isClient && (
        <BackgroundDataUpdater onDataUpdate={handleDataUpdate} />
      )}
    </div>
  );
}
