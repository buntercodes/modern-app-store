"use client";

import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Save, 
  X, 
  Loader2, 
  ExternalLink, 
  Star, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { appwriteService } from '../../../lib/appwrite';
import AppwriteDiagnostic from '../../../components/AppwriteDiagnostic';
import Breadcrumb from '../../../components/Breadcrumb';
import { useAdminAuth } from '../../../context/AdminAuthContext';

interface AppLookupData {
  appId: string;
  title: string;
  summary: string;
  description?: string;
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
  size?: string;
  installs?: string;
  version?: string;
  androidVersion?: string;
  contentRating?: string;
  screenshots?: string[];
  video?: string;
  privacyPolicy?: string;
  genre?: string;
}

interface FormData {
  app_package: string;
  app_title: string;
  app_description: string;
  app_icon_url: string;
  app_developer_name: string;
  app_developer_url: string;
  app_rating_text: string;
  is_app_free: boolean;
  app_size: string;
  app_latest_version: string;
}

export default function AddAppPage() {
  const router = useRouter();
  const { adminUser } = useAdminAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [lookupData, setLookupData] = useState<AppLookupData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState<FormData>({
    app_package: '',
    app_title: '',
    app_description: '',
    app_icon_url: '',
    app_developer_name: '',
    app_developer_url: '',
    app_rating_text: '',
    is_app_free: true,
    app_size: '',
    app_latest_version: ''
  });

  // Lookup app from Google Play API
  const handleAppLookup = async () => {
    if (!packageName.trim()) {
      setLookupError('Please enter a package name');
      return;
    }

    setIsLookingUp(true);
    setLookupError('');
    setLookupData(null);

    try {
      const response = await fetch(`/api/apps/${packageName.trim()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch app data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ App lookup successful:', data);
      setLookupData(data);
    } catch (error) {
      console.error('❌ App lookup failed:', error);
      setLookupError(error instanceof Error ? error.message : 'Failed to fetch app data');
    } finally {
      setIsLookingUp(false);
    }
  };

  // Fill form with lookup data
  const handleFillForm = () => {
    if (!lookupData) return;

    setFormData({
      app_package: lookupData.appId || '',
      app_title: lookupData.title || '',
      app_description: lookupData.description || lookupData.summary || '',
      app_icon_url: lookupData.icon || '',
      app_developer_name: lookupData.developer?.devId || '',
      app_developer_url: lookupData.developer?.url || '',
      app_rating_text: lookupData.scoreText || '',
      is_app_free: lookupData.free !== undefined ? lookupData.free : true,
      app_size: lookupData.size || '',
      app_latest_version: lookupData.version || ''
    });

    setIsModalOpen(false);
    setLookupData(null);
    setPackageName('');
  };

  // Save app to Appwrite
  const handleSave = async () => {
    if (!adminUser) {
      alert('You must be logged in as admin to add apps');
      return;
    }

    if (!formData.app_package || !formData.app_title) {
      alert('App Package and Title are required');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const appData = {
        app_package: formData.app_package,
        app_title: formData.app_title,
        app_description: formData.app_description,
        app_icon_url: formData.app_icon_url,
        app_developer_name: formData.app_developer_name,
        app_developer_url: formData.app_developer_url,
        app_rating_text: formData.app_rating_text,
        is_app_free: formData.is_app_free,
        app_size: formData.app_size,
        app_latest_version: formData.app_latest_version
      };

      console.log('🚀 Attempting to save app with data:', appData);
      const result = await appwriteService.createApp(appData);
      console.log('✅ App saved successfully:', result);
      
      setSaveStatus('success');
      
      // Redirect to apps list after a short delay
      setTimeout(() => {
        router.push('/admin/apps');
      }, 2000);
      
    } catch (error: unknown) {
      console.error('❌ Failed to save app:', error);
      setSaveStatus('error');
      
      // Show more specific error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to save app: ${errorMessage}\n\nPlease check the browser console for more details.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'App Management', href: '/admin/apps' },
          { label: 'Add New App', current: true }
        ]} 
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New App</h1>
          <p className="mt-2 text-lg text-gray-600">
            Add a new application to the store
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-lg shadow-sm text-base font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Lookup App
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !formData.app_package || !formData.app_title}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save App'}
          </button>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                App saved successfully! Redirecting to apps list...
              </p>
            </div>
          </div>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Failed to save app. Please try again.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Appwrite Diagnostic */}
      <AppwriteDiagnostic />

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Basic Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Package Name *
                </label>
                <input
                  type="text"
                  value={formData.app_package}
                  onChange={(e) => handleInputChange('app_package', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="e.g., com.example.myapp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Title *
                </label>
                <input
                  type="text"
                  value={formData.app_title}
                  onChange={(e) => handleInputChange('app_title', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter app title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Description
                </label>
                <textarea
                  value={formData.app_description}
                  onChange={(e) => handleInputChange('app_description', e.target.value)}
                  rows={4}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Detailed description of the app"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Icon URL
                </label>
                <input
                  type="url"
                  value={formData.app_icon_url}
                  onChange={(e) => handleInputChange('app_icon_url', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="https://example.com/icon.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Rating Text
                </label>
                <input
                  type="text"
                  value={formData.app_rating_text}
                  onChange={(e) => handleInputChange('app_rating_text', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="e.g., 4.5 (1K reviews)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is App Free?
                </label>
                <select
                  value={formData.is_app_free ? 'true' : 'false'}
                  onChange={(e) => handleInputChange('is_app_free', e.target.value === 'true')}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="true">Yes, Free</option>
                  <option value="false">No, Paid</option>
                </select>
              </div>
            </div>

            {/* Developer & Additional Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Developer & Additional Info
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Developer Name
                </label>
                <input
                  type="text"
                  value={formData.app_developer_name}
                  onChange={(e) => handleInputChange('app_developer_name', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Developer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Developer URL
                </label>
                <input
                  type="url"
                  value={formData.app_developer_url}
                  onChange={(e) => handleInputChange('app_developer_url', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="https://developer-website.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Size
                </label>
                <input
                  type="text"
                  value={formData.app_size}
                  onChange={(e) => handleInputChange('app_size', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="e.g., 25MB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latest Version
                </label>
                <input
                  type="text"
                  value={formData.app_latest_version}
                  onChange={(e) => handleInputChange('app_latest_version', e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="e.g., 1.2.3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Lookup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setIsModalOpen(false)} 
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Lookup App
                      </h3>
                      <p className="text-blue-100 text-xs">
                        Search by package name
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:text-blue-100 transition-colors p-1 hover:bg-white hover:bg-opacity-20 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="space-y-4">
                  {/* Search Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAppLookup()}
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                        placeholder="e.g., org.wikipedia"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Examples: com.spotify.music, org.wikipedia
                    </p>
                  </div>

                  {/* Search Button */}
                  <div>
                    <button
                      onClick={handleAppLookup}
                      disabled={isLookingUp || !packageName.trim()}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                    >
                      {isLookingUp ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Search App
                        </>
                      )}
                    </button>
                  </div>

                  {/* Error Message */}
                  {lookupError && (
                    <div className="rounded-lg bg-red-50 p-3 border border-red-200">
                      <div className="flex">
                        <AlertCircle className="h-4 w-4 text-red-400 mt-0.5" />
                        <div className="ml-2">
                          <h4 className="text-xs font-medium text-red-800">Search Failed</h4>
                          <p className="text-xs text-red-700 mt-1">{lookupError}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* App Results */}
                  {lookupData && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start space-x-3">
                        {/* App Icon */}
                        <div className="relative">
                          <Image
                            src={lookupData.icon}
                            alt={lookupData.title}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-xl object-cover shadow-md"
                            unoptimized={true}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Im0zIDkgOS05bTAgMGw5IDlNMTIgM3YxOCIvPgo8L3N2Zz4KPC9zdmc+';
                            }}
                          />
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        
                        {/* App Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm mb-1">{lookupData.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{lookupData.developer?.devId}</p>
                          
                          {/* App Stats */}
                          <div className="flex items-center space-x-2 mb-2 text-xs">
                            <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-yellow-700 font-medium">{lookupData.score}</span>
                            </div>
                            <div className="bg-green-50 px-2 py-1 rounded">
                              <span className="text-green-700 font-medium">
                                {lookupData.free ? 'Free' : `$${lookupData.price}`}
                              </span>
                            </div>
                          </div>
                          
                          {/* App Description */}
                          <p className="text-xs text-gray-700 line-clamp-2 mb-3">{lookupData.summary}</p>
                          
                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button
                              onClick={handleFillForm}
                              className="flex-1 flex items-center justify-center px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Use Data
                            </button>
                            {lookupData.playstoreUrl && (
                              <a
                                href={lookupData.playstoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center px-3 py-2 border border-gray-300 text-xs rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
