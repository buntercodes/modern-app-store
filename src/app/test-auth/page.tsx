"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle, User, Mail, Lock } from 'lucide-react';

export default function TestAuthPage() {
  const { login, register, logout, user, isAuthenticated, loading, error } = useAuth();
  
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('testpassword123');
  const [testName, setTestName] = useState('Test User');

  const handleTestLogin = async () => {
    const success = await login(testEmail, testPassword);
    if (success) {
      console.log('✅ Login successful');
    } else {
      console.log('❌ Login failed');
    }
  };

  const handleTestRegister = async () => {
    const success = await register(testEmail, testPassword, testName);
    if (success) {
      console.log('✅ Registration successful');
    } else {
      console.log('❌ Registration failed');
    }
  };

  const handleTestLogout = async () => {
    await logout();
    console.log('✅ Logout successful');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Authentication Test Page</h1>
          <p className="mt-2 text-gray-600">Test the Appwrite authentication with improved error handling</p>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm">
                Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="text-sm">Loading: {loading ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center space-x-2">
              {error ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="text-sm">Error: {error ? 'Yes' : 'No'}</span>
            </div>
          </div>
          
          {user && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800">User Information:</h3>
              <p className="text-sm text-green-700">Name: {user.name}</p>
              <p className="text-sm text-green-700">Email: {user.email}</p>
              <p className="text-sm text-green-700">Role: {user.role}</p>
              <p className="text-sm text-green-700">Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-medium text-red-800">Error:</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Test Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Login</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <button
                onClick={handleTestLogin}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Testing...' : 'Test Login'}
              </button>
            </div>
          </div>

          {/* Register Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Registration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <button
                onClick={handleTestRegister}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Testing...' : 'Test Registration'}
              </button>
            </div>
          </div>
        </div>

        {/* Logout Test */}
        {isAuthenticated && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Logout</h2>
            <button
              onClick={handleTestLogout}
              disabled={loading}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging out...' : 'Test Logout'}
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-800 mb-2">Test Instructions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Try logging in with invalid credentials to see error handling</li>
            <li>• Try registering with an existing email to see error handling</li>
            <li>• Check the browser console for detailed error logs</li>
            <li>• All errors should be displayed gracefully without breaking the app</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
