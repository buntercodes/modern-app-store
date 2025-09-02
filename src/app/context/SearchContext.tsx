"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface SearchResult {
  appId: string;
  title: string;
  summary: string;
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
  size?: string;
  installs?: string;
  version?: string;
  androidVersion?: string;
  contentRating?: string;
  genre?: string;
  screenshots?: string[];
}

interface SearchContextType {
  searchTerm: string;
  searchResults: SearchResult[];
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
  suggestions: string[];
  setSearchTerm: (term: string) => void;
  performSearch: (term: string, options?: SearchOptions) => Promise<void>;
  clearSearch: () => void;
  addToRecentSearches: (term: string) => void;
  clearRecentSearches: () => void;
}

interface SearchOptions {
  category?: string;
  price?: string;
  rating?: number;
  limit?: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const performSearch = useCallback(async (term: string, options: SearchOptions = {}) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({
        term: term.trim(),
        ...(options.category && { category: options.category }),
        ...(options.price && { price: options.price }),
        ...(options.rating && { rating: options.rating.toString() }),
        ...(options.limit && { limit: options.limit.toString() })
      });

      const response = await fetch(`/api/search?${searchParams}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setSearchResults(data.results || []);
      setSearchTerm(term);
      
      // Add to recent searches if not already present
      addToRecentSearches(term);
      
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    setError(null);
  }, []);

  const addToRecentSearches = useCallback((term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    setRecentSearches(prev => {
      const filtered = prev.filter(search => search.toLowerCase() !== trimmedTerm.toLowerCase());
      return [trimmedTerm, ...filtered].slice(0, 10); // Keep only 10 recent searches
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    // Simple suggestion logic - in a real app, this could be more sophisticated
    const commonTerms = [
      'games', 'social', 'photo', 'music', 'video', 'productivity', 'fitness',
      'education', 'business', 'travel', 'shopping', 'news', 'weather',
      'camera', 'messenger', 'browser', 'calculator', 'calendar', 'maps'
    ];

    const filtered = commonTerms.filter(term => 
      term.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  }, [searchTerm]);

  const value: SearchContextType = {
    searchTerm,
    searchResults,
    isLoading,
    error,
    recentSearches,
    suggestions,
    setSearchTerm,
    performSearch,
    clearSearch,
    addToRecentSearches,
    clearRecentSearches,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
