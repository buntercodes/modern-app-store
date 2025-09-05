"use client";

import { useState, useEffect } from 'react';
import AppCard from '../../components/AppCard';
import AppCardSkeleton from '../../components/AppCardSkeleton';

interface App {
  appId: string;
  title: string;
  summary: string;
  developer: string;
  developerId: string;
  icon: string;
  score: number;
  scoreText: string;
  priceText: string;
  free: boolean;
  url: string;
}

interface CategoryDetailClientProps {
  category: string;
}

export default function CategoryDetailClient({ category }: CategoryDetailClientProps) {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchApps = async (limit: number = 20, offset: number = 0) => {
    try {
      // Use games API for GAME category, apps API for others
      const apiEndpoint = category === 'GAME' ? '/api/games/free' : '/api/apps/free';
      const response = await fetch(`${apiEndpoint}?category=${category}&limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching apps:', err);
      throw err;
    }
  };

  const loadApps = async (isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const limit = 20;
      const offset = isLoadMore ? apps.length : 0;
      
      const data = await fetchApps(limit, offset);
      
      if (isLoadMore) {
        setApps(prev => [...prev, ...data.apps]);
      } else {
        setApps(data.apps);
      }
      
      setHasMore(data.apps.length === limit);
    } catch (err) {
      setError('Failed to load apps. Please try again.');
      console.error('Error loading apps:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadApps(true);
    }
  };

  useEffect(() => {
    loadApps();
  }, [category]);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <AppCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-600 text-lg font-medium mb-2">
            Error Loading Apps
          </div>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => loadApps()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-gray-600 text-lg font-medium mb-2">
            No Apps Found
          </div>
          <p className="text-gray-500">
            We couldn't find any apps in this category. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Apps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps.map((app) => (
          <AppCard key={app.appId} app={app} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loadingMore ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'Load More Apps'
            )}
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-gray-600">
        Showing {apps.length} apps
        {hasMore && ' (more available)'}
      </div>
    </div>
  );
}
