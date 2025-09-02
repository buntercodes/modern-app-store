"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { appwriteAuth, AppwriteUser } from '../lib/appwriteAuth';
import { log } from '../lib/logger';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'developer' | 'admin';
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  sendEmailVerification: () => Promise<boolean>;
  sendPasswordRecovery: (email: string) => Promise<boolean>;
  updatePassword: (password: string, oldPassword?: string) => Promise<boolean>;
  updateUserRole: (role: 'user' | 'developer' | 'admin') => Promise<boolean>;
  clearError: () => void;
  loading: boolean;
  authLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert AppwriteUser to our User interface
  const convertAppwriteUser = (appwriteUser: AppwriteUser): User => {
    return {
      id: appwriteUser.$id,
      name: appwriteUser.name,
      email: appwriteUser.email,
      role: appwriteUser.prefs?.role || 'user',
      emailVerified: appwriteUser.emailVerification
    };
  };

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        setAuthLoading(true);
        setError(null);
        
        const appwriteUser = await appwriteAuth.getCurrentUser();
        if (appwriteUser) {
          setUser(convertAppwriteUser(appwriteUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Don't set error state for auth check failures - this is normal for unauthenticated users
        // Only log the error for debugging purposes
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const appwriteUser = await appwriteAuth.login(email, password);
      setUser(convertAppwriteUser(appwriteUser));
      return true;
    } catch (error) {
      log.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const appwriteUser = await appwriteAuth.register(email, password, name);
      setUser(convertAppwriteUser(appwriteUser));
      return true;
    } catch (error) {
      log.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await appwriteAuth.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error instanceof Error ? error.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const sendEmailVerification = async (): Promise<boolean> => {
    try {
      setError(null);
      await appwriteAuth.sendEmailVerification();
      return true;
    } catch (error) {
      console.error('Email verification error:', error);
      setError(error instanceof Error ? error.message : 'Failed to send verification email');
      return false;
    }
  };

  const sendPasswordRecovery = async (email: string): Promise<boolean> => {
    try {
      setError(null);
      await appwriteAuth.sendPasswordRecovery(email);
      return true;
    } catch (error) {
      console.error('Password recovery error:', error);
      setError(error instanceof Error ? error.message : 'Failed to send password recovery email');
      return false;
    }
  };

  const updatePassword = async (password: string, oldPassword?: string): Promise<boolean> => {
    try {
      setError(null);
      await appwriteAuth.updatePassword(password, oldPassword);
      return true;
    } catch (error) {
      console.error('Password update error:', error);
      setError(error instanceof Error ? error.message : 'Failed to update password');
      return false;
    }
  };

  const updateUserRole = async (role: 'user' | 'developer' | 'admin'): Promise<boolean> => {
    try {
      setError(null);
      const appwriteUser = await appwriteAuth.updateUserPrefs({ role });
      setUser(convertAppwriteUser(appwriteUser));
      return true;
    } catch (error) {
      console.error('Role update error:', error);
      setError(error instanceof Error ? error.message : 'Failed to update user role');
      return false;
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    sendEmailVerification,
    sendPasswordRecovery,
    updatePassword,
    updateUserRole,
    clearError,
    loading,
    authLoading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}