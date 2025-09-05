'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  Monitor, 
  Smartphone, 
  Tablet,
  TrendingUp,
  Activity,
  RefreshCw,
  Calendar
} from 'lucide-react';

interface AnalyticsData {
  summary: {
    pageviews: number;
    visitors: number;
    bounceRate: number;
    sessionDuration: number;
  };
  topPages: Array<{ path: string; views: number; percentage: number }>;
  referrers: Array<{ source: string; visitors: number; percentage: number }>;
  devices: Array<{ device: string; visitors: number; percentage: number }>;
  browsers: Array<{ browser: string; visitors: number; percentage: number }>;
  countries: Array<{ country: string; visitors: number; percentage: number }>;
  realtime: {
    activeVisitors: number;
    liveEvents: Array<{ event: string; timestamp: string; path: string }>;
  };
  performance: {
    coreWebVitals: {
      lcp?: number;
      fid?: number;
      cls?: number;
    };
    pageLoadTime: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  const fetchAnalytics = async () => {
    try {
      setError(null);
      const response = await fetch(
        `/api/analytics?start=${dateRange.start}&end=${dateRange.end}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, fetchAnalytics]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin text-green-600" />
          <span className="text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-red-800">Analytics Error</h3>
        </div>
        <p className="text-red-600 mt-2">{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">
            {new Date(analytics.dateRange.start).toLocaleDateString()} - {new Date(analytics.dateRange.end).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-3xl font-bold text-blue-600">{formatNumber(analytics.summary.pageviews)}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-3xl font-bold text-green-600">{formatNumber(analytics.summary.visitors)}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-3xl font-bold text-orange-600">{analytics.summary.bounceRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Session Duration</p>
              <p className="text-3xl font-bold text-purple-600">{formatDuration(analytics.summary.sessionDuration)}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Active Visitors:</span>
            <span className="font-semibold text-green-600">{analytics.realtime.activeVisitors}</span>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
        <div className="space-y-3">
          {analytics.topPages.slice(0, 10).map((page, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                <span className="text-sm text-gray-900 font-mono">{page.path}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-gray-900">{formatNumber(page.views)}</span>
                <span className="text-xs text-gray-500">({page.percentage.toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Devices & Browsers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Devices</h3>
          <div className="space-y-3">
            {analytics.devices.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {device.device === 'desktop' && <Monitor className="w-4 h-4 text-gray-500" />}
                  {device.device === 'mobile' && <Smartphone className="w-4 h-4 text-gray-500" />}
                  {device.device === 'tablet' && <Tablet className="w-4 h-4 text-gray-500" />}
                  <span className="text-sm text-gray-900 capitalize">{device.device}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-gray-900">{formatNumber(device.visitors)}</span>
                  <span className="text-xs text-gray-500">({device.percentage.toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Browsers</h3>
          <div className="space-y-3">
            {analytics.browsers.map((browser, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-900 capitalize">{browser.browser}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-gray-900">{formatNumber(browser.visitors)}</span>
                  <span className="text-xs text-gray-500">({browser.percentage.toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Page Load Time</p>
            <p className="text-2xl font-bold text-blue-600">{analytics.performance.pageLoadTime.toFixed(2)}s</p>
          </div>
          {analytics.performance.coreWebVitals.lcp && (
            <div>
              <p className="text-sm text-gray-600">LCP (Largest Contentful Paint)</p>
              <p className="text-2xl font-bold text-green-600">{analytics.performance.coreWebVitals.lcp.toFixed(2)}s</p>
            </div>
          )}
          {analytics.performance.coreWebVitals.fid && (
            <div>
              <p className="text-sm text-gray-600">FID (First Input Delay)</p>
              <p className="text-2xl font-bold text-orange-600">{analytics.performance.coreWebVitals.fid.toFixed(2)}ms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
