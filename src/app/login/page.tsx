"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useFormInteraction } from '../hooks/useFormInteraction';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error, clearError, isAuthenticated, authLoading } = useAuth();
  const { hasInteracted, formRef } = useFormInteraction();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  // Get CSS classes for input styling
  const getInputClasses = () => {
    const baseClasses = "block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-black transition-colors";
    const autofillClasses = hasInteracted ? "input-show-autofill" : "input-hide-autofill";
    return `${baseClasses} input-text-black ${autofillClasses}`;
  };

  const getPasswordInputClasses = () => {
    const baseClasses = "block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-black transition-colors";
    const autofillClasses = hasInteracted ? "input-show-autofill" : "input-hide-autofill";
    return `${baseClasses} input-text-black ${autofillClasses}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Login', current: true }
          ]} 
        />

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className={getInputClasses()}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={getPasswordInputClasses()}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* API Error */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Login Failed</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                  {error.includes('Invalid credentials') && (
                    <div className="mt-2 text-xs text-red-600">
                      💡 Make sure you&apos;re using the correct email and password
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting || loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Sign In
                </div>
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => router.push('/register')}
                className="font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                Create one here
              </button>
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}