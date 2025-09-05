"use client";

import { useState, useEffect } from 'react';
import AppCard from '../components/AppCard';
import AppCardSkeleton from '../components/AppCardSkeleton';
import { GooglePlayApp } from '../lib/googlePlayScraper';

interface ApiResponse {
  success: boolean;
  apps: GooglePlayApp[];
  count: number;
  category: string;
  collection: string;
  hasMore?: boolean;
  error?: string;
  message?: string;
}

export default function FreeAndroidGamesClient() {
  const [games, setGames] = useState<GooglePlayApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL_GAMES');

  const gameCategories = [
    { value: 'ALL_GAMES', label: 'All Games' },
    { value: 'GAME_ACTION', label: 'Action Games' },
    { value: 'GAME_ADVENTURE', label: 'Adventure Games' },
    { value: 'GAME_ARCADE', label: 'Arcade Games' },
    { value: 'GAME_BOARD', label: 'Board Games' },
    { value: 'GAME_CARD', label: 'Card Games' },
    { value: 'GAME_CASINO', label: 'Casino Games' },
    { value: 'GAME_CASUAL', label: 'Casual Games' },
    { value: 'GAME_EDUCATIONAL', label: 'Educational Games' },
    { value: 'GAME_MUSIC', label: 'Music Games' },
    { value: 'GAME_PUZZLE', label: 'Puzzle Games' },
    { value: 'GAME_RACING', label: 'Racing Games' },
    { value: 'GAME_ROLE_PLAYING', label: 'RPG Games' },
    { value: 'GAME_SIMULATION', label: 'Simulation Games' },
    { value: 'GAME_SPORTS', label: 'Sports Games' },
    { value: 'GAME_STRATEGY', label: 'Strategy Games' },
    { value: 'GAME_TRIVIA', label: 'Trivia Games' },
    { value: 'GAME_WORD', label: 'Word Games' }
  ];

  const fetchGames = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/games/free?category=${category}&limit=100`);
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setGames(result.apps);
        console.log(`✅ Loaded ${result.apps.length} free Android games in ${result.category} category`);
      } else {
        setError(result.message || 'Failed to fetch games');
        console.error('❌ Error fetching games:', result.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch games';
      setError(errorMessage);
      console.error('❌ Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-900 mb-2">Error Loading Games</h2>
        <p className="text-red-700 mb-6">{error}</p>
        <button 
          onClick={() => fetchGames(selectedCategory)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Filter by Game Category</h2>
        <div className="flex flex-wrap gap-2">
          {gameCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Free Android Games
            {!loading && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({games.length} games)
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <AppCardSkeleton key={index} />
            ))}
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {games.map((game) => (
              <AppCard key={game.appId} app={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Games Found</h3>
            <p className="text-gray-600 mb-6">
              No free games found in the selected category. Try selecting a different category.
            </p>
            <button 
              onClick={() => fetchGames(selectedCategory)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
