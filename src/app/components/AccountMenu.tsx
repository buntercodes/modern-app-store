"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Settings, 
  Heart, 
  Download, 
  LogOut, 
  ChevronDown,
  Shield,
  Package
} from 'lucide-react';

export default function AccountMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside or when mouse leaves
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleMouseLeave = () => {
      // Only close on mouse leave if it wasn't opened by click
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener('mouseleave', handleMouseLeave);
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      if (menuElement) {
        menuElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    // Perform full page refresh after successful logout
    window.location.href = '/';
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      description: 'Manage your account'
    },
    {
      icon: Heart,
      label: 'Favorites',
      path: '/favorites',
      description: 'Your saved apps'
    },
    {
      icon: Download,
      label: 'Downloads',
      path: '/downloads',
      description: 'Download history'
    },
    {
      icon: Package,
      label: 'My Apps',
      path: '/my-apps',
      description: 'Your published apps'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      description: 'Account preferences'
    }
  ];

  // Add admin link if user is admin or developer
  if (user?.role === 'admin' || user?.role === 'developer') {
    menuItems.push({
      icon: Shield,
      label: 'Admin Panel',
      path: '/admin',
      description: 'Manage the platform'
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Account Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                {user?.role && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <item.icon className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group cursor-pointer"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-red-600">Sign Out</p>
                <p className="text-sm text-gray-500">End your session</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
