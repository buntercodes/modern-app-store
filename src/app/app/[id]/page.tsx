"use client";

import { Star, Download, Share2, Check, Users, Smartphone, Shield, Zap, MoreVertical, Bookmark, Eye, Info, ExternalLink } from "lucide-react";
import Header from "../../components/Header";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { GooglePlayApp } from "../../services/googlePlayApi";

export default function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [app, setApp] = useState<GooglePlayApp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        setLoading(true);
        console.log('🚀 Fetching app details for:', id);
        
        const response = await fetch(`/api/apps/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const appData = await response.json();
        
        if (appData) {
          setApp(appData);
          console.log('✅ App details fetched for:', id);
        } else {
          setError('App not found');
        }
      } catch (err) {
        setError('Failed to load app details');
        console.error('Error fetching app details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="w-32 h-32 bg-gray-200 rounded-2xl mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                  <div className="h-12 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">App Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The requested app could not be loaded.'}</p>
            <Link href="/" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium">
              Return to Store
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const getRandomColor = (appId: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-orange-500', 'bg-red-500', 'bg-teal-500'
    ];
    const index = appId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Categories', href: '/android-app-categories' },
            { label: app?.title || 'App Details', current: true }
          ]} 
        />

        {/* App Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* App Icon and Basic Info */}
            <div className="lg:col-span-1">
              {app.icon ? (
                <Image 
                  src={app.icon} 
                  alt={app.title}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-2xl object-cover mb-6"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`${getRandomColor(app.appId)} w-32 h-32 rounded-2xl flex items-center justify-center mb-6 ${app.icon ? 'hidden' : ''}`}>
                <Smartphone className="w-16 h-16 text-white" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(app.score || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">{app.score || 'N/A'}</span>
                  <span className="text-gray-400 text-sm">({app.scoreText || '0'} reviews)</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span>Category: {app.categories || 'General'}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span>Developer: {app.developer?.devId || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* App Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.title}</h1>
                <p className="text-lg text-gray-600 mb-4">by {app.developer?.devId || 'Unknown'}</p>
                <p className="text-base text-gray-700 leading-relaxed">{app.summary}</p>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {app.free ? 'Free' : `$${app.price}`}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Install</span>
                  </button>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Available for download</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About This App</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {app.summary || 'No description available.'}
            </p>
          </div>
        </div>

        {/* App Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Basic App Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              App Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Category</span>
                <span className="text-gray-900 text-sm">{app.categories || 'General'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Developer</span>
                <span className="text-gray-900 text-sm">{app.developer?.devId || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Price</span>
                <span className="text-gray-900 text-sm">{app.free ? 'Free' : `$${app.price}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Rating</span>
                <span className="text-gray-900 text-sm">{app.score || 'N/A'}/5.0</span>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Technical Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">App ID</span>
                <span className="text-gray-900 text-sm">{app.appId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Currency</span>
                <span className="text-gray-900 text-sm">{app.currency || 'USD'}</span>
              </div>
            </div>
          </div>

          {/* Developer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-500" />
              Developer
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Name</span>
                <span className="text-gray-900 text-sm">{app.developer?.devId || 'Unknown'}</span>
              </div>
              {app.developer?.url && (
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Website</span>
                  <a 
                    href={app.developer.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Visit
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-purple-500" />
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {app.permissions && (
              <a 
                href={app.permissions} 
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 text-sm">View Permissions</span>
              </a>
            )}
            {app.similar && (
              <a 
                href={app.similar} 
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <Eye className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 text-sm">Similar Apps</span>
              </a>
            )}
            {app.reviews && (
              <a 
                href={app.reviews} 
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <Star className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700 text-sm">View Reviews</span>
              </a>
            )}
            {app.playstoreUrl && (
              <a 
                href={app.playstoreUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 text-sm">View on Play Store</span>
              </a>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">&copy; 2024 App Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

