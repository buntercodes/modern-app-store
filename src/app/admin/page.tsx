"use client";

import { 
  Users, 
  AppWindow, 
  Download, 
  Star, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Plus,
  Settings,
  BarChart3,
  Shield
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function AdminDashboard() {
  // Mock data - in real app this would come from API
  const stats = [
    { name: 'Total Apps', value: '2,847', change: '+12%', changeType: 'positive', icon: AppWindow },
    { name: 'Active Users', value: '45.2K', change: '+8%', changeType: 'positive', icon: Users },
    { name: 'Downloads Today', value: '12.4K', change: '+23%', changeType: 'positive', icon: Download },
    { name: 'Average Rating', value: '4.6', change: '+0.1', changeType: 'positive', icon: Star },
  ];

  const recentActivities = [
    { id: 1, type: 'app_approved', message: 'PhotoMaster Pro was approved', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'user_registered', message: 'New user registered: john.doe@email.com', time: '5 minutes ago', status: 'info' },
    { id: 3, type: 'app_rejected', message: 'GameApp was rejected due to policy violation', time: '1 hour ago', status: 'warning' },
    { id: 4, type: 'system_update', message: 'System maintenance completed', time: '2 hours ago', status: 'success' },
    { id: 5, type: 'security_alert', message: 'Suspicious login attempt detected', time: '3 hours ago', status: 'error' },
  ];

  const quickActions = [
    { name: 'Add New App', href: '/admin/apps/new', icon: Plus, color: 'bg-green-500' },
    { name: 'Review Pending Apps', href: '/admin/apps/pending', icon: Clock, color: 'bg-blue-500' },
    { name: 'View Analytics', href: '/admin/analytics', icon: BarChart3, color: 'bg-purple-500' },
    { name: 'Security Settings', href: '/admin/security', icon: Shield, color: 'bg-red-500' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Dashboard', current: true }
        ]} 
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening with your app store today.
          </p>
        </div>
        <div>
          <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Quick Actions
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className={`ml-3 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-current mr-1" />
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="px-6 py-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className="relative group bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                      {action.name}
                    </h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                            {getStatusIcon(activity.status)}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{activity.message}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time>{activity.time}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="px-6 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm font-medium text-green-700">API Server</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm font-medium text-green-700">Database</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm font-medium text-green-700">File Storage</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-sm font-medium text-yellow-700">Cache System</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Maintenance
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                View All Systems
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="px-6 py-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">245ms</div>
              <div className="text-sm text-gray-500">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1.2M</div>
              <div className="text-sm text-gray-500">Requests Today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
