"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth, AdminUser } from '../lib/adminAuth';
// Removed unused import

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  clearError: () => void;
  loading: boolean;
  authLoading: boolean;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing admin session on mount
    const checkAdminAuth = async () => {
      try {
        setAuthLoading(true);
        setError(null);
        
        // Clear any existing Appwrite sessions to prevent main app interference
        await adminAuth.clearAllSessions();
        
        const adminUser = await adminAuth.getCurrentAdmin();
        if (adminUser) {
          setAdminUser(adminUser);
        }
      } catch (error) {
        console.error('Error checking admin auth:', error);
        // Don't set error state for auth check failures - this is normal for unauthenticated users
      } finally {
        setAuthLoading(false);
      }
    };

    checkAdminAuth();

    // Cleanup function to clear sessions when component unmounts
    return () => {
      // Clear sessions when admin context unmounts
      adminAuth.clearAllSessions().catch(console.warn);
    };
  }, []);

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await adminAuth.adminLogin(email, password);
      
      if (result.success && result.user) {
        setAdminUser(result.user);
        return true;
      } else {
        setError(result.error || 'Admin login failed');
        return false;
      }
    } catch (error) {
      console.error('Unexpected admin login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Admin login failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await adminAuth.adminLogout();
      setAdminUser(null);
    } catch (error) {
      console.error('Admin logout error:', error);
      setError(error instanceof Error ? error.message : 'Admin logout failed');
    } finally {
      setLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: AdminAuthContextType = {
    adminUser,
    isAdminAuthenticated: !!adminUser,
    adminLogin,
    adminLogout,
    clearError,
    loading,
    authLoading,
    error
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
