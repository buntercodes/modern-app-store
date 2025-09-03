"use client";

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { appwriteConfig, appwriteService } from '../lib/appwrite';

export default function AppwriteDiagnostic() {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{
    config: boolean;
    connection: boolean;
    permissions: boolean;
    error?: string;
  } | null>(null);

  const runDiagnostic = async () => {
    setIsChecking(true);
    setResults(null);

    try {
             // Check configuration
       const configValid = !!(
         appwriteConfig.projectId &&
         appwriteConfig.databaseId &&
         appwriteConfig.tableId1 &&
         appwriteConfig.tableId2
       );

      let connectionValid = false;
      let permissionsValid = false;
      let error = '';

      if (configValid) {
        try {
          // Test connection by trying to list documents
          await appwriteService.getApps(1, 0);
          connectionValid = true;
          permissionsValid = true;
        } catch (err: unknown) {
          connectionValid = false;
          if (err && typeof err === 'object' && 'message' in err) {
            const errorMessage = (err as { message: string }).message;
            if (errorMessage.includes('Permission denied')) {
              permissionsValid = false;
              error = 'Permission denied. Check collection permissions.';
            } else if (errorMessage.includes('not found')) {
              error = 'Database or collection not found. Check IDs.';
            } else {
              error = errorMessage || 'Connection failed.';
            }
          } else {
            error = 'Connection failed.';
          }
        }
      } else {
        error = 'Configuration incomplete. Check environment variables.';
      }

      setResults({
        config: configValid,
        connection: connectionValid,
        permissions: permissionsValid,
        error: error || undefined
      });
    } catch (err: unknown) {
      setResults({
        config: false,
        connection: false,
        permissions: false,
        error: (err && typeof err === 'object' && 'message' in err) ? (err as { message: string }).message : 'Unknown error occurred'
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Appwrite Diagnostic</h3>
        <button
          onClick={runDiagnostic}
          disabled={isChecking}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChecking ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <CheckCircle className="w-4 h-4 mr-2" />
          )}
          {isChecking ? 'Checking...' : 'Run Diagnostic'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Configuration Status */}
        <div className="flex items-center space-x-3">
          {results ? (
            results.config ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )
          ) : (
            <AlertCircle className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">Configuration</p>
            <p className="text-xs text-gray-500">
              {results ? (
                results.config ? 'All environment variables are set' : 'Missing environment variables'
              ) : (
                'Not checked'
              )}
            </p>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center space-x-3">
          {results ? (
            results.connection ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )
          ) : (
            <AlertCircle className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">Connection</p>
            <p className="text-xs text-gray-500">
              {results ? (
                results.connection ? 'Successfully connected to Appwrite' : 'Failed to connect'
              ) : (
                'Not checked'
              )}
            </p>
          </div>
        </div>

        {/* Permissions Status */}
        <div className="flex items-center space-x-3">
          {results ? (
            results.permissions ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )
          ) : (
            <AlertCircle className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">Permissions</p>
            <p className="text-xs text-gray-500">
              {results ? (
                results.permissions ? 'Collection permissions are correct' : 'Permission issues detected'
              ) : (
                'Not checked'
              )}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {results?.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {results.error}
            </p>
          </div>
        )}

        {/* Configuration Details */}
                 <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
           <p className="text-xs font-medium text-gray-700 mb-2">Current Configuration:</p>
           <div className="space-y-1 text-xs text-gray-600">
             <p><strong>Endpoint:</strong> {appwriteConfig.endpoint}</p>
             <p><strong>Project ID:</strong> {appwriteConfig.projectId || 'Not set'}</p>
             <p><strong>Database ID:</strong> {appwriteConfig.databaseId || 'Not set'}</p>
             <p><strong>Table 1 ID:</strong> {appwriteConfig.tableId1 || 'Not set'}</p>
             <p><strong>Table 2 ID:</strong> {appwriteConfig.tableId2 || 'Not set'}</p>
           </div>
         </div>
      </div>
    </div>
  );
}
