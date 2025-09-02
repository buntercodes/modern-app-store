"use client";

import { useState } from "react";
import { Search, Play, Shield, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AccountMenu from "./AccountMenu";

interface HeaderProps {
  // No props needed - search bar always shown
}

export default function Header({}: HeaderProps) {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Apps', href: '/free-download-android-apps' },
    { name: 'Games', href: '/free-download-android-games' },
    { name: 'Categories', href: '/android-app-categories' },
  ];

  // Add admin link if user has admin/developer role
  if (user?.role === 'developer' || user?.role === 'admin') {
    navigation.push({ name: 'Admin', href: '/admin' });
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-900">App Store</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium flex items-center gap-1"
              >
                {item.name === 'Admin' && <Shield className="w-4 h-4" />}
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* Desktop Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for apps & games"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none bg-gray-50 text-sm"
                />
              </div>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-32 pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none bg-gray-50 text-sm"
              />
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
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name === 'Admin' && <Shield className="w-4 h-4" />}
                  {item.name}
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

