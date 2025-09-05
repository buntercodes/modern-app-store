"use client";

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { Search, Play, Shield, Menu, X, Loader2, Clock, TrendingUp, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AccountMenu from "./AccountMenu";

interface HeaderProps {
  className?: string;
}

export default function Header({ }: HeaderProps) {
  const { isAuthenticated, user } = useAuth();
  const { setSearchTerm, performSearch, isLoading, recentSearches, searchResults } = useSearch();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const navigation = [
    { name: 'Apps', href: '/free-download-android-apps' },
    { name: 'Games', href: '/free-download-android-games' },
    { name: 'Explore Categories', href: '/android-app-categories' },
  ];

  // Add admin link if user has admin/developer role
  if (user?.role === 'developer' || user?.role === 'admin') {
    navigation.push({ name: 'Admin', href: '/admin' });
  }

  // Search functionality
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search for suggestions
    if (value.trim().length > 2) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value, { limit: 8 }); // Get more suggestions
      }, 300);
    } else {
      // Clear suggestions if less than 3 characters
      setShowSearchSuggestions(false);
    }
    
    setShowSearchSuggestions(value.length > 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      setSearchTerm(localSearchTerm);
      performSearch(localSearchTerm);
      setShowSearchSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(localSearchTerm)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchTerm(suggestion);
    setSearchTerm(suggestion);
    setShowSearchSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchFocus = () => {
    if (localSearchTerm.length > 0 || recentSearches.length > 0) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSearchSuggestions(false), 200);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
    setShowSearchSuggestions(false);
    // Clear any pending search timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    // Focus back to input after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <Image 
                  src="/logo_test.png" 
                  alt="App Store Logo" 
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-medium text-gray-900">App Store</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-200 text-sm font-medium flex items-center gap-2 rounded-lg hover:bg-gray-50 hover:shadow-sm"
              >
                {item.name === 'Admin' && <Shield className="w-4 h-4 text-green-600 group-hover:text-green-700 transition-colors" />}
                {item.name === 'Apps' && <Play className="w-4 h-4 text-blue-600 group-hover:text-blue-700 transition-colors" />}
                {item.name === 'Games' && <Play className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />}
                {item.name === 'Explore Categories' && <Search className="w-4 h-4 text-orange-600 group-hover:text-orange-700 transition-colors" />}
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-200 group-hover:w-full"></span>
                </span>
              </a>
            ))}
          </nav>
          
          {/* Desktop Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-80">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                {localSearchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors w-4 h-4 flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {isLoading && !localSearchTerm && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
                )}
                <input
                  ref={searchInputRef}
                  type="text"
                  value={localSearchTerm}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search for apps & games"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none bg-gray-50 text-sm"
                />
                
                {/* Search Suggestions Dropdown */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {/* App Search Results */}
                    {localSearchTerm.length > 2 && searchResults.length > 0 && (
                      <div className="p-3">
                        <div className="flex items-center text-xs font-medium text-gray-500 mb-3">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Apps ({searchResults.length})
                        </div>
                        <div className="space-y-2">
                          {searchResults.slice(0, 6).map((app) => (
                            <button
                              key={app.appId}
                              onClick={() => {
                                setShowSearchSuggestions(false);
                                setLocalSearchTerm('');
                                router.push(`/app/${app.appId}`);
                              }}
                              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Image
                                    src={app.icon}
                                    alt={app.title}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-lg object-cover"
                                    unoptimized={true}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                  />
                                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold hidden">
                                    {app.title.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">{app.title}</div>
                                  <div className="text-xs text-gray-500 truncate">{app.developer.devId}</div>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-gray-600">{app.score}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-600">
                                      {app.free || app.price === 0 ? 'Free' : `$${app.price}`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        
                        {/* View All Results */}
                        <button
                          onClick={() => {
                            setShowSearchSuggestions(false);
                            handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent);
                          }}
                          className="w-full mt-3 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg border border-green-200 hover:border-green-300 transition-all flex items-center justify-center"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          View all results for &quot;{localSearchTerm}&quot;
                        </button>
                      </div>
                    )}
                    
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && localSearchTerm.length <= 2 && (
                      <div className="p-3 border-b border-gray-100">
                        <div className="flex items-center text-xs font-medium text-gray-500 mb-2">
                          <Clock className="w-3 h-3 mr-1" />
                          Recent Searches
                        </div>
                        {recentSearches.slice(0, 3).map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(search)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
                          >
                            <Search className="w-3 h-3 mr-2 text-gray-400" />
                            {search}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* No Results */}
                    {localSearchTerm.length > 2 && searchResults.length === 0 && !isLoading && (
                      <div className="p-4 text-center">
                        <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <div className="text-sm text-gray-500">No apps found for &quot;{localSearchTerm}&quot;</div>
                        <button
                          onClick={() => {
                            setShowSearchSuggestions(false);
                            handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent);
                          }}
                          className="mt-2 text-sm text-green-600 hover:text-green-700"
                        >
                          Search anyway
                        </button>
                      </div>
                    )}
                    
                    {/* Loading State */}
                    {isLoading && localSearchTerm.length > 2 && (
                      <div className="p-4 text-center">
                        <Loader2 className="w-6 h-6 text-gray-400 mx-auto mb-2 animate-spin" />
                        <div className="text-sm text-gray-500">Searching apps...</div>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              <a 
                href="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Sign In
              </a>
            )}
          </div>

          {/* Mobile Search and Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {localSearchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors w-3 h-3 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                {isLoading && !localSearchTerm && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 animate-spin" />
                )}
                <input
                  type="text"
                  value={localSearchTerm}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search..."
                  className="w-32 pl-8 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none bg-gray-50 text-sm"
                />
              </form>
              
              {/* Mobile Search Suggestions */}
              {showSearchSuggestions && (
                <div className="fixed top-16 left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {/* App Search Results */}
                  {localSearchTerm.length > 2 && searchResults.length > 0 && (
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                        Apps ({searchResults.length})
                      </div>
                      {searchResults.slice(0, 4).map((app) => (
                        <button
                          key={app.appId}
                          onClick={() => {
                            setShowSearchSuggestions(false);
                            setLocalSearchTerm('');
                            router.push(`/app/${app.appId}`);
                          }}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-md flex items-center space-x-3"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image
                              src={app.icon}
                              alt={app.title}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded object-cover"
                              unoptimized={true}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded flex items-center justify-center text-white text-sm font-bold hidden">
                              {app.title.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{app.title}</div>
                            <div className="text-xs text-gray-500 truncate">{app.developer.devId}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600">{app.score}</span>
                              </div>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-600">
                                {app.free || app.price === 0 ? 'Free' : `$${app.price}`}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                      
                      {/* View All Results */}
                      <button
                        onClick={() => {
                          setShowSearchSuggestions(false);
                          handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent);
                        }}
                        className="w-full mt-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md border border-green-200"
                      >
                        View all results
                      </button>
                    </div>
                  )}
                  
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && localSearchTerm.length <= 2 && (
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                        Recent
                      </div>
                      {recentSearches.slice(0, 3).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* No Results */}
                  {localSearchTerm.length > 2 && searchResults.length === 0 && !isLoading && (
                    <div className="p-3 text-center">
                      <div className="text-sm text-gray-500">No apps found</div>
                      <button
                        onClick={() => {
                          setShowSearchSuggestions(false);
                          handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent);
                        }}
                        className="mt-1 text-sm text-green-600 hover:text-green-700"
                      >
                        Search anyway
                      </button>
                    </div>
                  )}
                  
                  {/* Loading State */}
                  {isLoading && localSearchTerm.length > 2 && (
                    <div className="p-3 text-center">
                      <Loader2 className="w-4 h-4 text-gray-400 mx-auto mb-1 animate-spin" />
                      <div className="text-xs text-gray-500">Searching...</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg text-base font-medium flex items-center gap-3 transition-all duration-200 hover:shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name === 'Admin' && <Shield className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors" />}
                  {item.name === 'Apps' && <Play className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />}
                  {item.name === 'Games' && <Play className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />}
                  {item.name === 'Explore Categories' && <Search className="w-5 h-5 text-orange-600 group-hover:text-orange-700 transition-colors" />}
                  <span className="relative">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </a>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                {isAuthenticated ? (
                  <div className="px-3 py-2">
                    <AccountMenu />
                  </div>
                ) : (
                  <a
                    href="/login"
                    className="block px-3 py-2 bg-green-500 text-white rounded-md text-base font-medium text-center hover:bg-green-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

