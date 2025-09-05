"use client";

// Removed unused imports
import Breadcrumb from '../../components/Breadcrumb';
import AnalyticsDashboard from '../../components/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Analytics', current: true }
        ]} 
      />

      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            View detailed analytics and insights about your app store
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Export Report
          </button>
        </div>
      </div>

      {/* Vercel Analytics Dashboard */}
      <AnalyticsDashboard />
    </div>
  );
}
