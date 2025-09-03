import { Client, Account, ID, Models } from 'appwrite';
import { log } from './logger';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize Account service
const account = new Account(client);

// User interface
export interface AppwriteUser {
  $id: string;
  email: string;
  name: string;
  emailVerification: boolean;
  prefs: {
    role?: 'user' | 'developer' | 'admin';
  };
}

// Authentication service class
export class AppwriteAuthService {
  private account: Account;

  constructor() {
    this.account = account;
  }

  // Check if user is authenticated
  async getCurrentUser(): Promise<AppwriteUser | null> {
    try {
      const user = await this.account.get();
      console.log('✅ Current user:', user);
      return user as AppwriteUser;
    } catch (error) {
      console.log('❌ No authenticated user:', error);
      return null;
    }
  }

  // Register new user
  async register(email: string, password: string, name: string): Promise<AppwriteUser> {
    try {
      console.log('🚀 Registering new user:', email);
      
      const user = await this.account.create(ID.unique(), email, password, name);
      
      console.log('✅ User registered successfully:', user);
      return user as AppwriteUser;
    } catch (error) {
      log.error('❌ Registration failed:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Login user
  async login(email: string, password: string): Promise<AppwriteUser> {
    try {
      console.log('🚀 Logging in user:', email);
      
      await this.account.createEmailPasswordSession(email, password);
      const user = await this.account.get();
      
      console.log('✅ User logged in successfully:', user);
      return user as AppwriteUser;
    } catch (error) {
      log.error('❌ Login failed:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      console.log('🚀 Logging out user');
      await this.account.deleteSession('current');
      console.log('✅ User logged out successfully');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Send email verification
  async sendEmailVerification(): Promise<void> {
    try {
      console.log('🚀 Sending email verification');
      await this.account.createVerification(`${window.location.origin}/verify-email`);
      console.log('✅ Email verification sent');
    } catch (error) {
      console.error('❌ Failed to send email verification:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Verify email
  async verifyEmail(userId: string, secret: string): Promise<void> {
    try {
      console.log('🚀 Verifying email for user:', userId);
      await this.account.updateVerification(userId, secret);
      console.log('✅ Email verified successfully');
    } catch (error) {
      console.error('❌ Email verification failed:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Send password recovery email
  async sendPasswordRecovery(email: string): Promise<void> {
    try {
      console.log('🚀 Sending password recovery email to:', email);
      await this.account.createRecovery(email, `${window.location.origin}/reset-password`);
      console.log('✅ Password recovery email sent');
    } catch (error) {
      console.error('❌ Failed to send password recovery:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Update password
  async updatePassword(password: string, oldPassword?: string): Promise<void> {
    try {
      console.log('🚀 Updating password');
      await this.account.updatePassword(password, oldPassword);
      console.log('✅ Password updated successfully');
    } catch (error) {
      console.error('❌ Password update failed:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Update user preferences (including role)
  async updateUserPrefs(prefs: { role?: 'user' | 'developer' | 'admin' }): Promise<AppwriteUser> {
    try {
      console.log('🚀 Updating user preferences:', prefs);
      const user = await this.account.updatePrefs(prefs);
      console.log('✅ User preferences updated:', user);
      return user as AppwriteUser;
    } catch (error) {
      console.error('❌ Failed to update user preferences:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Get user sessions
  async getSessions(): Promise<Models.Session[]> {
    try {
      console.log('🚀 Getting user sessions');
      const sessions = await this.account.listSessions();
      console.log('✅ User sessions retrieved:', sessions);
      return sessions.sessions;
    } catch (error) {
      console.error('❌ Failed to get user sessions:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Delete all sessions (logout from all devices)
  async deleteAllSessions(): Promise<void> {
    try {
      console.log('🚀 Deleting all user sessions');
      const sessions = await this.account.listSessions();
      
      for (const session of sessions.sessions) {
        await this.account.deleteSession(session.$id);
      }
      
      console.log('✅ All sessions deleted');
    } catch (error) {
      console.error('❌ Failed to delete sessions:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Helper method to extract error messages
  private getErrorMessage(error: unknown): string {
    // Handle AppwriteException specifically
    if (error?.type === 'general_unauthorized_scope' || error?.code === 401) {
      return 'Invalid credentials. Please check your email and password.';
    }
    
    if (error?.type === 'user_invalid_credentials') {
      return 'Invalid email or password. Please try again.';
    }
    
    if (error?.type === 'user_email_already_exists') {
      return 'An account with this email already exists.';
    }
    
    if (error?.type === 'user_password_mismatch') {
      return 'Password does not match. Please try again.';
    }
    
    if (error?.type === 'user_email_not_found') {
      return 'No account found with this email address.';
    }
    
    if (error?.type === 'user_blocked') {
      return 'Your account has been blocked. Please contact support.';
    }
    
    if (error?.type === 'user_invalid_token') {
      return 'Your session has expired. Please log in again.';
    }
    
    if (error?.type === 'general_rate_limit_exceeded') {
      return 'Too many attempts. Please try again later.';
    }
    
    // Handle network errors
    if (error?.name === 'NetworkError' || error?.message?.includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }
    
    // Handle generic AppwriteException
    if (error?.message && typeof error.message === 'string') {
      // Clean up Appwrite error messages
      const message = error.message.toLowerCase();
      if (message.includes('invalid credentials') || message.includes('unauthorized')) {
        return 'Invalid credentials. Please check your email and password.';
      }
      if (message.includes('email already exists')) {
        return 'An account with this email already exists.';
      }
      if (message.includes('password')) {
        return 'Password error. Please check your password and try again.';
      }
      return error.message;
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    return 'An unexpected error occurred. Please try again.';
  }

  // Check if user has specific role
  hasRole(user: AppwriteUser | null, role: 'user' | 'developer' | 'admin'): boolean {
    if (!user) return false;
    return user.prefs?.role === role;
  }

  // Check if user is admin or developer
  isAdminOrDeveloper(user: AppwriteUser | null): boolean {
    if (!user) return false;
    return user.prefs?.role === 'admin' || user.prefs?.role === 'developer';
  }
}

// Export singleton instance
export const appwriteAuth = new AppwriteAuthService();
export default appwriteAuth;
