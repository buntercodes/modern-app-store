"use client";

import { Shield, AlertTriangle, Lock, Eye, Key } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Security', current: true }
        ]} 
      />

      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security</h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor and manage security settings for your app store
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Security Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Security Score</dt>
                  <dd className="text-2xl font-semibold text-gray-900">95/100</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Lock className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Sessions</dt>
                  <dd className="text-2xl font-semibold text-gray-900">12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Failed Logins</dt>
                  <dd className="text-2xl font-semibold text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <Key className="w-5 h-5 text-yellow-500 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">Security Dashboard</h3>
          </div>
          
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Security monitoring active</h3>
            <p className="mt-1 text-sm text-gray-500">Your app store is being monitored for security threats.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
