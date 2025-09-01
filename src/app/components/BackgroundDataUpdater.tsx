"use client";

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface BackgroundDataUpdaterProps {
  onDataUpdate: (data: {
    recommendedApps: any[];
    toolsApps: any[];
    trendingApps: any[];
  }) => void;
}

export default function BackgroundDataUpdater({ onDataUpdate }: BackgroundDataUpdaterProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [nextUpdate, setNextUpdate] = useState<Date | null>(null);

  const fetchFreshData = async () => {
    try {
      setIsUpdating(true);
      console.log('🔄 Background: Fetching fresh data...');
      
      // Fetch fresh data in parallel using internal API routes
      const [recommendedRes, toolsRes, trendingRes] = await Promise.all([
        fetch('/api/apps?category=APPLICATION&collection=TOP_FREE'),
        fetch('/api/apps?category=APPLICATION&collection=TOP_FREE'),
        fetch('/api/apps?category=APPLICATION&collection=TOP_FREE')
      ]);

      const [recommendedData, toolsData, trendingData] = await Promise.all([
        recommendedRes.json(),
        toolsRes.json(),
        trendingRes.json()
      ]);

      const freshData = {
        recommendedApps: recommendedData?.results?.slice(0, 16) || [],
        toolsApps: toolsData?.results?.slice(0, 16) || [],
        trendingApps: trendingData?.results?.slice(0, 6) || [],
      };

      // Update the parent component with fresh data
      onDataUpdate(freshData);
      
      // Update timestamps
      const now = new Date();
      setLastUpdate(now);
      setNextUpdate(new Date(now.getTime() + 12 * 60 * 60 * 1000)); // 12 hours from now
      
      console.log('✅ Background: Data updated successfully');
    } catch (error) {
      console.error('❌ Background: Failed to fetch fresh data:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // Set initial timestamps
    const now = new Date();
    setLastUpdate(now);
    setNextUpdate(new Date(now.getTime() + 12 * 60 * 60 * 1000));

    // Set up interval for background updates (every 12 hours)
    const interval = setInterval(() => {
      fetchFreshData();
    }, 12 * 60 * 60 * 1000); // 12 hours

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Manual refresh function (for testing or user-triggered updates)
  const handleManualRefresh = () => {
    fetchFreshData();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-700">Data Status</span>
          <button
            onClick={handleManualRefresh}
            disabled={isUpdating}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            title="Refresh data manually"
          >
            <RefreshCw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
            <span>{isUpdating ? 'Updating...' : 'Fresh'}</span>
          </div>
          
          {lastUpdate && (
            <div>
              Last: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
          
          {nextUpdate && (
            <div>
              Next: {nextUpdate.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
