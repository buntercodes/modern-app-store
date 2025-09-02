"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Star, Download, Smartphone, Grid3X3, List, SlidersHorizontal, Play, MoreVertical, Share2, Bookmark, Loader2, Search, X, Clock, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import Breadcrumb, { BreadcrumbItem } from "../components/Breadcrumb";
import { useSearch } from "../context/SearchContext";
import AppCard from "../components/AppCard";
import AppCardSkeleton from "../components/AppCardSkeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { searchResults, isLoading, error, performSearch, recentSearches } = useSearch();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [selectedRating, setSelectedRating] = useState(4.0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Get search term from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchTerm(q);
      performSearch(q, { limit: 50 });
    }
  }, [searchParams, performSearch]);

  // Apply filters
  const applyFilters = useCallback(() => {
    if (searchTerm) {
      const options: any = { limit: 50 };
      
      if (selectedCategory !== 'All Categories') {
        options.category = selectedCategory;
      }
      
      if (selectedPrice !== 'All Prices') {
        options.price = selectedPrice.toLowerCase();
      }
      
      if (selectedRating > 0) {
        options.rating = selectedRating;
      }
      
      performSearch(searchTerm, options);
    }
  }, [searchTerm, selectedCategory, selectedPrice, selectedRating, performSearch]);

  // Apply filters when they change
  useEffect(() => {
    if (searchTerm) {
      applyFilters();
    }
  }, [selectedCategory, selectedPrice, selectedRating, applyFilters]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedPrice('All Prices');
    setSelectedRating(4.0);
  };

  // Mock search results for fallback
  const mockSearchResults = [
    {
      id: 1,
      name: "PhotoMaster Pro",
      description: "Professional photo editing with AI-powered tools",
      rating: 4.8,
      downloads: "2.5M",
      price: "$9.99",
      category: "Photo & Video",
      featured: true,
      developer: "Creative Studios Inc.",
      size: "45.2 MB"
    },
    {
      id: 2,
      name: "TaskFlow",
      description: "Smart task management and productivity app",
      rating: 4.9,
      downloads: "1.8M",
      price: "Free",
      category: "Productivity",
      featured: false,
      developer: "Productivity Labs",
      size: "23.1 MB"
    },
    {
      id: 3,
      name: "SoundWave",
      description: "High-quality music streaming and discovery",
      rating: 4.7,
      downloads: "5.2M",
      price: "$4.99/month",
      category: "Music & Audio",
      featured: false,
      developer: "AudioTech Solutions",
      size: "67.8 MB"
    },
    {
      id: 4,
      name: "MindMap",
      description: "Visual thinking and brainstorming tool",
      rating: 4.6,
      downloads: "890K",
      price: "Free",
      category: "Productivity",
      featured: false,
      developer: "MindTools Inc.",
      size: "34.5 MB"
    },
    {
      id: 5,
      name: "FitTracker",
      description: "Comprehensive fitness and health monitoring",
      rating: 4.7,
      downloads: "1.2M",
      price: "$2.99",
      category: "Health & Fitness",
      featured: false,
      developer: "HealthTech Pro",
      size: "28.9 MB"
    },
    {
      id: 6,
      name: "CodeEditor",
      description: "Advanced code editor for developers",
      rating: 4.8,
      downloads: "650K",
      price: "$19.99",
      category: "Development",
      featured: false,
      developer: "DevTools Studio",
      size: "156.7 MB"
    },
    {
      id: 7,
      name: "PhotoLight",
      description: "Simple photo editing for beginners",
      rating: 4.3,
      downloads: "750K",
      price: "Free",
      category: "Photo & Video",
      featured: false,
      developer: "PhotoSimple Inc.",
      size: "18.3 MB"
    },
    {
      id: 8,
      name: "TaskMaster",
      description: "Basic task management app",
      rating: 4.2,
      downloads: "450K",
      price: "Free",
      category: "Productivity",
      featured: false,
      developer: "TaskTools",
      size: "12.7 MB"
    }
  ];

  const categories = [
    "All Categories",
    "Photo & Video",
    "Productivity",
    "Music & Audio",
    "Health & Fitness",
    "Development",
    "Entertainment",
    "Business"
  ];

  const priceRanges = [
    "All Prices",
    "Free",
    "Under $5",
    "$5 - $10",
    "$10 - $20",
    "Over $20"
  ];

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

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium text-gray-900 text-sm">Filters</h3>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={range}
                        checked={selectedPrice === range}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{rating}+ stars</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button 
                onClick={clearFilters}
                className="w-full text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">{searchResults.length} results</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">Sorted by {sortBy}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

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
                  onClick={() => searchTerm && performSearch(searchTerm)}
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
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {searchResults.map((app) => (
                  <AppCard 
                    key={app.appId} 
                    app={app} 
                    variant={viewMode === 'grid' ? 'detailed' : 'compact'}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm" disabled>
                  Previous
                </button>
                <button className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm">1</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">2</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">3</button>
                <span className="px-3 py-2 text-gray-500 text-sm">...</span>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">10</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">&copy; 2024 App Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
