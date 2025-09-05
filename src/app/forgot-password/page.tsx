"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { sendPasswordRecovery, loading, error, isAuthenticated, authLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await sendPasswordRecovery(email);
      
      if (success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Password recovery error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-sm text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ve sent a password recovery link to <strong>{email}</strong>
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Please check your email and follow the instructions to reset your password.
            </p>
            <div className="mt-8">
              <button
                onClick={() => window.location.href = '/login'}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = '/login'}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to login
          </button>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* API Error */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading || !email.trim()}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting || loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Send Reset Instructions'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
