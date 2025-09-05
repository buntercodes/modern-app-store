import { Client, Account, ID } from 'appwrite';
import { log } from './logger';

// Admin-specific Appwrite client (separate from main app)
// Using a different session name to avoid conflicts
const adminClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Admin Account service
const adminAccount = new Account(adminClient);

// Admin session storage key (different from main app)
const ADMIN_SESSION_KEY = 'admin_session_data';

// Admin user interface
export interface AdminUser {
  $id: string;
  email: string;
  name: string;
  emailVerification: boolean;
  labels: string[]; // This will contain the "admin" label
}

// Admin Authentication Service Class
export class AdminAuthService {
  private account: Account;

  constructor() {
    this.account = adminAccount;
  }

  // Check if current user is admin (has "admin" label)
  async getCurrentAdmin(): Promise<AdminUser | null> {
    try {
      // Check if we have stored admin session data
      const storedAdminData = this.getStoredAdminData();
      if (storedAdminData) {
        console.log('✅ Admin user from storage:', storedAdminData);
        return storedAdminData;
      }

      // No stored admin data, return null
      console.log('❌ No admin session found');
      return null;
    } catch (error) {
      console.log('❌ No admin session found:', error);
      return null;
    }
  }

  // Admin login
  async adminLogin(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      console.log('🚀 Admin login attempt for:', email);
      
      // Validate input
      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required.'
        };
      }
      
      // First, clear any existing sessions to prevent interference
      await this.forceLogoutFromMainApp();
      
      // Create a temporary session for verification only
      const tempSession = await this.account.createEmailPasswordSession(email, password);
      
      // Get user data
      const user = await this.account.get();
      
      // Verify admin label
      if (!user.labels || !user.labels.includes('admin')) {
        // Delete the temporary session immediately
        try {
          await this.account.deleteSession(tempSession.$id);
        } catch (logoutError) {
          console.warn('Failed to delete temp session:', logoutError);
        }
        console.log('❌ User does not have admin privileges');
        return { 
          success: false, 
          error: 'Access denied. Admin privileges required.' 
        };
      }
      
      // Store admin data in localStorage
      const adminUser = user as AdminUser;
      this.storeAdminData(adminUser);
      
      // Delete the temporary session immediately to avoid interfering with main app
      await this.account.deleteSession(tempSession.$id);
      
      console.log('✅ Admin login successful:', adminUser);
      return { 
        success: true, 
        user: adminUser 
      };
    } catch (error) {
      console.error('❌ Admin login failed:', error);
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  }

  // Admin logout
  async adminLogout(): Promise<void> {
    try {
      console.log('🚀 Admin logout');
      
      // Clear stored admin data from localStorage
      this.clearStoredAdminData();
      
      // Clear all Appwrite sessions to prevent any interference
      await this.forceLogoutFromMainApp();
      
      // Clear any other potential traces
      if (typeof window !== 'undefined') {
        // Clear any admin-related session storage
        sessionStorage.removeItem('admin_session_data');
        sessionStorage.removeItem('admin_auth_state');
        
        // Clear any admin-related cookies (if any)
        document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      
      console.log('✅ Admin logout successful - all traces cleared');
    } catch (error) {
      console.error('❌ Admin logout failed:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Check if user has admin label
  hasAdminLabel(user: AdminUser | null): boolean {
    if (!user) return false;
    return user.labels && user.labels.includes('admin');
  }

  // Store admin data in localStorage
  private storeAdminData(adminUser: AdminUser): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
      }
    } catch (error) {
      console.warn('Failed to store admin data:', error);
    }
  }

  // Get stored admin data from localStorage
  private getStoredAdminData(): AdminUser | null {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(ADMIN_SESSION_KEY);
        if (stored) {
          return JSON.parse(stored) as AdminUser;
        }
      }
    } catch (error) {
      console.warn('Failed to get stored admin data:', error);
    }
    return null;
  }

  // Clear stored admin data from localStorage
  private clearStoredAdminData(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    } catch (error) {
      console.warn('Failed to clear stored admin data:', error);
    }
  }

  // Force logout from main app by clearing all Appwrite sessions
  private async forceLogoutFromMainApp(): Promise<void> {
    try {
      // Get all sessions and delete them
      const sessions = await this.account.listSessions();
      for (const session of sessions.sessions) {
        try {
          await this.account.deleteSession(session.$id);
        } catch (error) {
          console.warn('Failed to delete session:', session.$id, error);
        }
      }
      console.log('✅ Cleared all Appwrite sessions to prevent main app login');
    } catch (error) {
      console.warn('Failed to clear Appwrite sessions:', error);
    }
  }

  // Public method to clear all sessions (used by context)
  async clearAllSessions(): Promise<void> {
    await this.forceLogoutFromMainApp();
  }

  // Helper method to extract error messages
  private getErrorMessage(error: unknown): string {
    const errorObj = error as { type?: string; code?: number; name?: string; message?: string };
    
    if (errorObj?.type === 'general_unauthorized_scope' || errorObj?.code === 401) {
      return 'Invalid admin credentials. Please check your email and password.';
    }
    
    if (errorObj?.type === 'user_invalid_credentials') {
      return 'Invalid email or password. Please try again.';
    }
    
    if (errorObj?.type === 'user_email_not_found') {
      return 'No admin account found with this email address.';
    }
    
    if (errorObj?.type === 'user_blocked') {
      return 'Your admin account has been blocked. Please contact support.';
    }
    
    if (errorObj?.type === 'user_invalid_token') {
      return 'Your admin session has expired. Please log in again.';
    }
    
    if (errorObj?.type === 'general_rate_limit_exceeded') {
      return 'Too many login attempts. Please try again later.';
    }
    
    if (errorObj?.name === 'NetworkError' || errorObj?.message?.includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }
    
    if (errorObj?.message && typeof errorObj.message === 'string') {
      return errorObj.message;
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    return 'An unexpected error occurred. Please try again.';
  }
}

// Export singleton instance
export const adminAuth = new AdminAuthService();
export default adminAuth;
