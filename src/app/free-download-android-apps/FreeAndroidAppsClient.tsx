"use client";

import { useState, useEffect } from 'react';
import AppCard from '../components/AppCard';
import AppCardSkeleton from '../components/AppCardSkeleton';
import { GooglePlayApp } from '../lib/googlePlayScraper';

interface ApiResponse {
  success: boolean;
  apps: GooglePlayApp[];
  count: number;
  category: string;
  collection: string;
  hasMore?: boolean;
  error?: string;
  message?: string;
}

export default function FreeAndroidAppsClient() {
  const [apps, setApps] = useState<GooglePlayApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('APPLICATION');

  const appCategories = [
    { value: 'APPLICATION', label: 'All Apps' },
    { value: 'TOOLS', label: 'Tools' },
    { value: 'COMMUNICATION', label: 'Communication' },
    { value: 'PRODUCTIVITY', label: 'Productivity' },
    { value: 'SOCIAL', label: 'Social' },
    { value: 'PHOTOGRAPHY', label: 'Photography' },
    { value: 'VIDEO_PLAYERS', label: 'Video Players' },
    { value: 'MUSIC_AND_AUDIO', label: 'Music & Audio' },
    { value: 'NEWS_AND_MAGAZINES', label: 'News & Magazines' },
    { value: 'MAPS_AND_NAVIGATION', label: 'Maps & Navigation' },
    { value: 'BOOKS_AND_REFERENCE', label: 'Books & Reference' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'MEDICAL', label: 'Medical' },
    { value: 'LIFESTYLE', label: 'Lifestyle' },
    { value: 'FINANCE', label: 'Finance' },
    { value: 'SHOPPING', label: 'Shopping' },
    { value: 'WEATHER', label: 'Weather' },
    { value: 'TRAVEL_AND_LOCAL', label: 'Travel & Local' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'ENTERTAINMENT', label: 'Entertainment' },
    { value: 'HEALTH_AND_FITNESS', label: 'Health & Fitness' },
    { value: 'ART_AND_DESIGN', label: 'Art & Design' }
  ];

  const fetchApps = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/apps/free?category=${category}&limit=100`);
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setApps(result.apps);
        console.log(`✅ Loaded ${result.apps.length} free Android apps in ${result.category} category`);
      } else {
        setError(result.message || 'Failed to fetch apps');
        console.error('❌ Error fetching apps:', result.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch apps';
      setError(errorMessage);
      console.error('❌ Error fetching apps:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-900 mb-2">Error Loading Apps</h2>
        <p className="text-red-700 mb-6">{error}</p>
        <button 
          onClick={() => fetchApps(selectedCategory)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Filter by App Category</h2>
        <div className="flex flex-wrap gap-2">
          {appCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Free Android Apps
            {!loading && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({apps.length} apps)
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <AppCardSkeleton key={index} />
            ))}
          </div>
        ) : apps.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {apps.map((app) => (
              <AppCard key={app.appId} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Apps Found</h3>
            <p className="text-gray-600 mb-6">
              No free apps found in the selected category. Try selecting a different category.
            </p>
            <button 
              onClick={() => fetchApps(selectedCategory)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
