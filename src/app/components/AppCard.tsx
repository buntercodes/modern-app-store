"use client";

import { Star, Download, ExternalLink } from 'lucide-react';
import { GooglePlayApp } from '../lib/googlePlayScraper';

interface AppCardProps {
  app: GooglePlayApp;
  variant?: 'compact' | 'detailed';
  className?: string;
}

export default function AppCard({ app, variant = 'compact', className = '' }: AppCardProps) {
  const handleAppClick = () => {
    // Navigate to the app detail page using the app ID
    window.location.href = `/app/${app.appId}`;
  };

  const getRandomColor = (appId: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-orange-500', 'bg-red-500', 'bg-teal-500'
    ];
    const index = appId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const formatDownloads = (installs?: string) => {
    if (!installs) return 'Unknown';
    return installs;
  };

  if (variant === 'detailed') {
    return (
      <div 
        className={`bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-4 cursor-pointer group ${className}`}
        onClick={handleAppClick}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {app.icon ? (
              <img 
                src={app.icon} 
                alt={app.title}
                className="w-16 h-16 rounded-xl object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`${getRandomColor(app.appId)} w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold hidden`}>
              {app.title.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-base mb-1 truncate group-hover:text-green-600 transition-colors">
              {app.title}
            </h3>
            <p className="text-gray-500 text-xs mb-2">{app.developer.devId}</p>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{app.summary}</p>
            
            <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-gray-700">{app.score}</span>
              </div>
              <span>•</span>
              <span>{formatDownloads(app.installs)}</span>
              {app.size && (
                <>
                  <span>•</span>
                  <span>{app.size}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">
                {app.free || app.price === 0 ? 'Free' : `$${app.price}`}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant (default)
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-3 text-center group cursor-pointer ${className}`}
      onClick={handleAppClick}
    >
      <div className="mb-3">
        {app.icon ? (
          <img 
            src={app.icon} 
            alt={app.title}
            className="w-16 h-16 rounded-2xl mx-auto object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`${getRandomColor(app.appId)} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-white text-2xl font-bold group-hover:scale-105 transition-transform hidden`}>
          {app.title.charAt(0).toUpperCase()}
        </div>
      </div>
      
      <h3 className="font-medium text-gray-900 text-xs mb-2 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
        {app.title}
      </h3>
      
      <div className="flex items-center justify-center space-x-1 mb-2">
        <Star className="w-3 h-3 text-yellow-400 fill-current" />
        <span className="text-xs text-gray-600">{app.score}</span>
      </div>
      
      <div className="text-xs text-gray-500">
        {app.free || app.price === 0 ? 'Free' : `$${app.price}`}
      </div>
    </div>
  );
}
