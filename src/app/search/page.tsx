"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import Header from "../components/Header";
import Breadcrumb, { BreadcrumbItem } from "../components/Breadcrumb";
import { useSearch } from "../context/SearchContext";
import AppCard from "../components/AppCard";
import AppCardSkeleton from "../components/AppCardSkeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { searchResults, isLoading, error, performSearch, recentSearches } = useSearch();
  
  const [searchTerm, setSearchTerm] = useState('');

  // Get search term from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchTerm(q);
      performSearch(q, { limit: 20 });
    }
  }, [searchParams, performSearch]);



  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Search Results', current: true }
          ]} 
        />

        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Search Results'}
          </h1>
          {isLoading ? (
            <p className="text-gray-600 text-sm flex items-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Searching...
            </p>
          ) : error ? (
            <p className="text-red-600 text-sm">Error: {error}</p>
          ) : (
            <p className="text-gray-600 text-sm">
              Found {searchResults.length} apps
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          )}
          </div>

          {/* Search Results */}
        <div className="w-full">


            {/* Results Display */}
            {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <AppCardSkeleton key={index} variant="detailed" />
                ))}
                    </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                        </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                                <button 
                  onClick={() => searchTerm && performSearch(searchTerm, { limit: 20 })}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Try Again
                </button>
                      </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                        </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? `No apps found for "${searchTerm}"` : 'Enter a search term to find apps'}
                </p>
                {recentSearches.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-3">Recent searches:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {recentSearches.slice(0, 5).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchTerm(search);
                            performSearch(search);
                          }}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {search}
                          </button>
                      ))}
                    </div>
                  </div>
                )}
                </div>
                        ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {searchResults.map((app) => (
                  <AppCard 
                    key={app.appId} 
                    app={app} 
                    variant="detailed"
                  />
                ))}
              </div>
                        )}
        </div>
      </main>
    </div>
  );
}
