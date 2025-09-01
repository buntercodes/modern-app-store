"use client";

interface AppCardSkeletonProps {
  variant?: 'compact' | 'detailed';
  className?: string;
}

export default function AppCardSkeleton({ variant = 'compact', className = '' }: AppCardSkeletonProps) {
  if (variant === 'detailed') {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-8"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-12"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div className={`bg-white rounded-xl p-3 text-center ${className}`}>
      <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-3 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-3 bg-gray-200 rounded animate-pulse w-16 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
    </div>
  );
}
