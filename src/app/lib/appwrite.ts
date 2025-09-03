"use client";

import { Client, Databases, Account, ID, Query } from 'appwrite';

// Appwrite configuration - Updated for Two Tables architecture
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const APPWRITE_TABLE_ID_1 = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID_1 || 'add_new_app';
const APPWRITE_TABLE_ID_2 = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID_2 || 'add_new_app_2';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// Initialize services
export const databases = new Databases(client);
export const account = new Account(client);

// App row interface for Table 1 (add_new_app)
export interface AppRowTable1 {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  app_package: string;
  app_title: string;
  app_description: string;
  app_icon_url: string;
  app_developer_name: string;
  app_developer_url: string;
  app_rating_text: string;
  is_app_free: boolean;
}

// App row interface for Table 2 (add_new_app_2)
export interface AppRowTable2 {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  app_package: string; // Reference to main app
  app_size: string;
  app_latest_version: string;
}

// Combined app interface
export interface AppRow extends AppRowTable1 {
  table2Data?: AppRowTable2;
}

// Configuration object
export const appwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  tableId1: APPWRITE_TABLE_ID_1,
  tableId2: APPWRITE_TABLE_ID_2,
};

// Database service class
export class AppwriteService {
  // Check configuration
  private checkConfig() {
    console.log('🔧 Appwrite Configuration:');
    console.log('Endpoint:', appwriteConfig.endpoint);
    console.log('Project ID:', appwriteConfig.projectId);
    console.log('Database ID:', appwriteConfig.databaseId);
    console.log('Table 1 ID:', appwriteConfig.tableId1);
    console.log('Table 2 ID:', appwriteConfig.tableId2);
    
    if (!appwriteConfig.projectId || !appwriteConfig.databaseId || !appwriteConfig.tableId1 || !appwriteConfig.tableId2) {
      throw new Error('❌ Appwrite configuration incomplete. Please check your environment variables.');
    }
  }

  // Create a new app document across both tables
  async createApp(appData: {
    app_package: string;
    app_title: string;
    app_description: string;
    app_icon_url: string;
    app_developer_name: string;
    app_developer_url: string;
    app_rating_text: string;
    is_app_free: boolean;
    app_size?: string;
    app_latest_version?: string;
  }): Promise<AppRow> {
    this.checkConfig();
    
    try {
      console.log('🚀 Creating app in Table 1 with data:', appData);
      
      // Create main app document in table 1
      const table1Data = {
        app_package: appData.app_package,
        app_title: appData.app_title,
        app_description: appData.app_description,
        app_icon_url: appData.app_icon_url,
        app_developer_name: appData.app_developer_name,
        app_developer_url: appData.app_developer_url,
        app_rating_text: appData.app_rating_text,
        is_app_free: appData.is_app_free
      };

      const row = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tableId1,
        ID.unique(),
        table1Data
      );
      
      console.log('✅ App row created successfully in Table 1:', row);
      
      // Create corresponding entry in table 2 (if additional data is provided)
      let table2Data: AppRowTable2 | undefined;
      
      if (appData.app_size || appData.app_latest_version) {
        try {
          const table2RowData = {
            app_package: appData.app_package,
            app_size: appData.app_size || '',
            app_latest_version: appData.app_latest_version || ''
          };

          const table2Row = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tableId2,
            ID.unique(),
            table2RowData
          );
          console.log('✅ App row created successfully in Table 2:', table2Row);
          table2Data = table2Row as unknown as AppRowTable2;
        } catch (table2Error) {
          console.warn('⚠️ Failed to create entry in Table 2:', table2Error);
          // Continue even if table 2 creation fails
        }
      }
      
      return {
        ...(row as unknown as AppRowTable1),
        table2Data
      };
    } catch (error: unknown) {
      console.error('❌ Error creating app:', error);
      
      // Provide specific error messages
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = (error as { code: number }).code;
        if (errorCode === 401) {
          throw new Error('Authentication failed. Check your project ID.');
        } else if (errorCode === 404) {
          throw new Error('Database or table not found. Check your database and table IDs.');
        } else if (errorCode === 403) {
          throw new Error('Permission denied. Check your table permissions.');
        } else if (errorCode === 400) {
          throw new Error('Invalid data format. Check your app data structure.');
        }
      }
      
      throw error;
    }
  }

  // Get apps from table 1
  async getApps(limit: number = 100, offset: number = 0): Promise<AppRow[]> {
    this.checkConfig();
    
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tableId1,
        [
          Query.limit(limit),
          Query.offset(offset)
        ]
      );
      return response.documents as unknown as AppRow[];
    } catch (error) {
      console.error('Error fetching apps:', error);
      throw error;
    }
  }

  // Get a specific app by ID from table 1
  async getApp(rowId: string): Promise<AppRow> {
    this.checkConfig();
    
    try {
      const row = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tableId1,
        rowId
      );
      return row as unknown as AppRow;
    } catch (error) {
      console.error('Error fetching app:', error);
      throw error;
    }
  }

  // Update app status in table 1
  async updateAppStatus(rowId: string, status: 'pending' | 'approved' | 'rejected'): Promise<AppRow> {
    this.checkConfig();
    
    try {
      const row = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tableId1,
        rowId,
        { status }
      );
      return row as unknown as AppRow;
    } catch (error) {
      console.error('Error updating app status:', error);
      throw error;
    }
  }

  // Delete app from both tables
  async deleteApp(rowId: string): Promise<void> {
    this.checkConfig();
    
    try {
      // Delete from table 1
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tableId1,
        rowId
      );
      
      // Try to delete from table 2 (if exists)
      try {
        // You might need to implement a way to find the corresponding table 2 entry
        // For now, we'll just log that we're not deleting from table 2
        console.log('ℹ️ Note: Table 2 entry deletion not implemented yet');
      } catch (table2Error) {
        console.warn('⚠️ Failed to delete from Table 2:', table2Error);
      }
    } catch (error) {
      console.error('Error deleting app:', error);
      throw error;
    }
  }

  // Search apps in table 1
  async searchApps(searchTerm: string): Promise<AppRow[]> {
    this.checkConfig();
    
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tableId1,
        [
          // Add search queries here
        ]
      );
      
      // Filter results based on search term
      const filteredApps = response.documents.filter((doc: unknown) => {
        const docObj = doc as Record<string, unknown>;
        return (
          (docObj.app_title as string)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (docObj.app_package as string)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (docObj.app_description as string)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (docObj.app_developer_name as string)?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      
      return filteredApps as unknown as AppRow[];
    } catch (error) {
      console.error('Error searching apps:', error);
      throw error;
    }
  }
}

// Create service instance
export const appwriteService = new AppwriteService();
