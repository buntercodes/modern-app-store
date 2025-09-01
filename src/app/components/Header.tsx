"use client";

import { Search, Play, LogOut, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  showSearch?: boolean;
}

export default function Header({ showSearch = true }: HeaderProps) {
  const { isAuthenticated, logout, user } = useAuth();
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-900">App Store</span>
            </a>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Discover</a>
            <a href="/categories" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Categories</a>
            <a href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">My Apps</a>
            {(user?.role === 'developer' || user?.role === 'admin') && (
              <a href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Admin
              </a>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for apps & games"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-sm"
                  />
                </div>
              </div>
            )}
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <a 
                href="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

