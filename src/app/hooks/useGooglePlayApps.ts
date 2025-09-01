"use client";

import { useState, useEffect, useCallback } from 'react';

// Define the app interface locally since we're not using the service anymore
interface GooglePlayApp {
  appId: string;
  title: string;
  summary: string;
  developer: {
    devId: string;
    url: string;
  };
  icon: string;
  score: number;
  scoreText: string;
  price: number;
  free: boolean;
  url: string;
  playstoreUrl: string;
  currency: string;
  categories?: string;
  permissions?: string;
  similar?: string;
  reviews?: string;
  datasafety?: string;
}

interface UseGooglePlayAppsReturn {
  apps: GooglePlayApp[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Direct fetch function for the local API
async function fetchAppsFromAPI(category: string = 'APPLICATION', limit: number = 20): Promise<GooglePlayApp[]> {
  try {
    // Use the proxy to avoid CORS issues
    const url = `/api/apps?category=${category}&collection=TOP_FREE`;
    console.log('🌐 Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📡 API Response data:', data);
    
    // Check if data has the expected structure with 'results' property
    if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
      console.log('✅ Found results array with', data.results.length, 'items');
      // Take only the first N apps from the results
      const limitedApps = data.results.slice(0, limit);
      console.log('✅ Returning', limitedApps.length, 'apps');
      return limitedApps;
    } else if (Array.isArray(data) && data.length > 0) {
      console.log('✅ Data is directly an array with', data.length, 'items');
      // Fallback: if data is directly an array
      const limitedApps = data.slice(0, limit);
      console.log('✅ Returning', limitedApps.length, 'apps');
      return limitedApps;
    } else {
      // If data structure is unexpected, return empty array
      console.warn('⚠️ Unexpected data structure from API:', data);
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching apps from API:', error);
    
    // Return empty array instead of throwing to prevent app crash
    console.log('🔄 Returning empty array due to API error');
    return [];
  }
}

export function useGooglePlayApps(options: { category?: string; limit?: number } = {}): UseGooglePlayAppsReturn {
  const { category = 'APPLICATION', limit = 20 } = options;
  const [apps, setApps] = useState<GooglePlayApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🚀 Fetching ${limit} apps from API (category: ${category})`);
      const fetchedApps = await fetchAppsFromAPI(category, limit);
      
      console.log(`✅ Fetched ${fetchedApps.length} apps successfully`);
      if (fetchedApps.length === 0) {
        setError('No apps found from API');
      }
      setApps(fetchedApps);
    } catch (err) {
      console.error('❌ Failed to fetch apps:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch apps');
      setApps([]);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  const refetch = useCallback(async () => {
    await fetchApps();
  }, [fetchApps]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  return { apps, loading, error, refetch };
}

// Specialized hooks for different app sections
export function useRecommendedApps(limit: number = 8) {
  return useGooglePlayApps({ 
    category: 'APPLICATION', 
    limit
  });
}

export function useToolsApps(limit: number = 8) {
  return useGooglePlayApps({ 
    category: 'APPLICATION', 
    limit
  });
}

export function useTrendingApps(limit: number = 20) {
  return useGooglePlayApps({ 
    category: 'APPLICATION',
    limit
  });
}
