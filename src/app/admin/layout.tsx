"use client";

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  AppWindow, 
  BarChart3, 
  Shield, 
  Menu, 
  X,
  LogOut,
  User,
  Plus
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useRouter } from 'next/navigation';
import AdminSignInForm from '../components/AdminSignInForm';
import { AdminAuthProvider } from '../context/AdminAuthContext';
// import Breadcrumb, { BreadcrumbItem } from '../components/Breadcrumb';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { adminUser, adminLogout, isAdminAuthenticated, authLoading } = useAdminAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'App Management', href: '/admin/apps', icon: AppWindow },
    { name: 'Add New App', href: '/admin/apps/add', icon: Plus },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Security', href: '/admin/security', icon: Shield },
  ];

  const handleLogout = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to logout from the admin panel?');
    if (!confirmed) return;
    
    try {
      setIsLoggingOut(true);
      setSidebarOpen(false);
      
      // Perform admin logout (clears localStorage and all sessions)
      await adminLogout();
      
      // Redirect to home page
      router.push('/');
      
      // Force page refresh to ensure clean state
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
      // Still redirect even if logout fails
      router.push('/');
    }
  };

  // Add keyboard shortcut for logout (Ctrl+Q)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();
        handleLogout();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleLogout]);

  // Show loading state while checking admin authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show admin sign-in form if not authenticated
  if (!isAdminAuthenticated || !adminUser) {
    return <AdminSignInForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = typeof window !== 'undefined' && window.location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>

        {/* User info at bottom - Fixed */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{adminUser.name}</p>
              <p className="text-xs text-gray-500 truncate">Admin</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Sign out"
            >
              {isLoggingOut ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
              ) : (
                <LogOut className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top header - Sticky */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1"></div>

            <div className="flex items-center space-x-4">
              
              {/* Admin User Info & Logout */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{adminUser.name}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Sign out from admin panel (Ctrl+Q)"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 mr-1 border-b-2 border-red-700"></div>
                      <span className="hidden sm:inline">Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Logout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminAuthProvider>
  );
}
