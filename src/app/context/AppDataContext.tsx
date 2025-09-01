"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Define the app interface
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

// Context interface
interface AppDataContextType {
  // Data
  recommendedApps: GooglePlayApp[];
  toolsApps: GooglePlayApp[];
  trendingApps: GooglePlayApp[];
  
  // Loading states
  loading: {
    recommended: boolean;
    tools: boolean;
    trending: boolean;
  };
  
  // Error states
  errors: {
    recommended: string | null;
    tools: string | null;
    trending: string | null;
  };
  
  // Actions
  refetchRecommended: () => Promise<void>;
  refetchTools: () => Promise<void>;
  refetchTrending: () => Promise<void>;
  getAppDetails: (appId: string) => Promise<GooglePlayApp | null>;
}

// Create context
const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// Direct fetch function for the local API
async function fetchAppsFromAPI(category: string = 'APPLICATION', limit: number = 20): Promise<GooglePlayApp[]> {
  try {
    const url = `/api/apps?category=${category}&collection=TOP_FREE`;
    console.log('🌐 Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📡 API Response data:', data);
    
    if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
      console.log('✅ Found results array with', data.results.length, 'items');
      const limitedApps = data.results.slice(0, limit);
      console.log('✅ Returning', limitedApps.length, 'apps');
      return limitedApps;
    } else if (Array.isArray(data) && data.length > 0) {
      console.log('✅ Data is directly an array with', data.length, 'items');
      const limitedApps = data.slice(0, limit);
      console.log('✅ Returning', limitedApps.length, 'apps');
      return limitedApps;
    } else {
      console.warn('⚠️ Unexpected data structure from API:', data);
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching apps from API:', error);
    return [];
  }
}

// Provider component
export function AppDataProvider({ children }: { children: ReactNode }) {
  const [recommendedApps, setRecommendedApps] = useState<GooglePlayApp[]>([]);
  const [toolsApps, setToolsApps] = useState<GooglePlayApp[]>([]);
  const [trendingApps, setTrendingApps] = useState<GooglePlayApp[]>([]);
  const [appDetails, setAppDetails] = useState<Record<string, GooglePlayApp>>({});
  
  const [loading, setLoading] = useState({
    recommended: false,
    tools: false,
    trending: false,
  });
  const [errors, setErrors] = useState({
    recommended: null as string | null,
    tools: null as string | null,
    trending: null as string | null,
  });

  // Fetch recommended apps
  const fetchRecommended = useCallback(async () => {
    setLoading(prev => ({ ...prev, recommended: true }));
    setErrors(prev => ({ ...prev, recommended: null }));

    try {
      const apps = await fetchAppsFromAPI('APPLICATION', 16);
      setRecommendedApps(apps);
      console.log('✅ Recommended apps fetched');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch recommended apps';
      setErrors(prev => ({ ...prev, recommended: errorMessage }));
      console.error('❌ Failed to fetch recommended apps:', error);
    } finally {
      setLoading(prev => ({ ...prev, recommended: false }));
    }
  }, []);

  // Fetch tools apps
  const fetchTools = useCallback(async () => {
    setLoading(prev => ({ ...prev, tools: true }));
    setErrors(prev => ({ ...prev, tools: null }));

    try {
      const apps = await fetchAppsFromAPI('APPLICATION', 16);
      setToolsApps(apps);
      console.log('✅ Tools apps fetched');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tools apps';
      setErrors(prev => ({ ...prev, tools: errorMessage }));
      console.error('❌ Failed to fetch tools apps:', error);
    } finally {
      setLoading(prev => ({ ...prev, tools: false }));
    }
  }, []);

  // Fetch trending apps
  const fetchTrending = useCallback(async () => {
    setLoading(prev => ({ ...prev, trending: true }));
    setErrors(prev => ({ ...prev, trending: null }));

    try {
      const apps = await fetchAppsFromAPI('APPLICATION', 6);
      setTrendingApps(apps);
      console.log('✅ Trending apps fetched');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch trending apps';
      setErrors(prev => ({ ...prev, trending: errorMessage }));
      console.error('❌ Failed to fetch trending apps:', error);
    } finally {
      setLoading(prev => ({ ...prev, trending: false }));
    }
  }, []);

  // Get app details
  const getAppDetails = useCallback(async (appId: string): Promise<GooglePlayApp | null> => {
    // Check if we have cached app details
    if (appDetails[appId]) {
      console.log('✅ Using cached app details for:', appId);
      return appDetails[appId];
    }

    try {
      console.log('🚀 Fetching app details for:', appId);
      const response = await fetch(`/api/apps/${appId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const app = await response.json();
      
      // Cache the app details
      setAppDetails(prev => ({
        ...prev,
        [appId]: app,
      }));
      
      console.log('✅ App details fetched for:', appId);
      return app;
    } catch (error) {
      console.error('❌ Failed to fetch app details:', error);
      return null;
    }
  }, [appDetails]);

  // Initialize data on mount - only for homepage
  useEffect(() => {
    // Only fetch homepage data if we're on the homepage
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      console.log('🚀 Initializing app data for homepage...');
      fetchRecommended();
      fetchTools();
      fetchTrending();
    }
  }, [fetchRecommended, fetchTools, fetchTrending]);

  // Context value
  const contextValue: AppDataContextType = {
    recommendedApps,
    toolsApps,
    trendingApps,
    loading,
    errors,
    refetchRecommended: fetchRecommended,
    refetchTools: fetchTools,
    refetchTrending: fetchTrending,
    getAppDetails,
  };

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
}

// Custom hook to use the context
export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
