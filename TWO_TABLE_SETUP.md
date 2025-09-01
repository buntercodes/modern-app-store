# Two-Table Appwrite Setup Guide

## Overview

Due to Appwrite's limitation of 11 columns per table, this project uses a two-table architecture to store all app data:

- **Table 1**: `add_new_app` - Primary app data (11 columns max)
- **Table 2**: `add_new_app_2` - Additional app data (11 columns max)

## Table Structure

### Table 1: `add_new_app` (Primary Data)

**Columns to create:**

1. **app_package** (String, required, 255 chars) - App package name/ID
2. **app_title** (String, required, 255 chars) - App title
3. **app_description** (String, optional, 5000 chars) - Detailed description
4. **app_icon_url** (String, optional, 500 chars) - Icon URL
5. **app_developer_name** (String, optional, 255 chars) - Developer name
6. **app_developer_url** (String, optional, 500 chars) - Developer URL
7. **app_rating_text** (String, optional, 100 chars) - Rating text
8. **is_app_free** (Boolean, required, default: true) - Is app free

### Table 2: `add_new_app_2` (Additional Data)

**Columns to create:**

1. **app_package** (String, required, 255 chars) - Reference to main app
2. **app_size** (String, optional, 50 chars) - App size
3. **app_latest_version** (String, optional, 50 chars) - Latest version

## Setup Instructions

### 1. Create Database
1. Go to your Appwrite project
2. Navigate to **Databases**
3. Click **Create Database**
4. Name: "AppStore"
5. Database ID: "appstore" (or auto-generated)
6. Click **Create**

### 2. Create Table 1: `add_new_app`
1. Inside your database, click **Create Table**
2. Name: "Add New App"
3. Table ID: "add_new_app"
4. Click **Create**
5. Add the 11 columns listed above for Table 1

### 3. Create Table 2: `add_new_app_2`
1. Inside your database, click **Create Table**
2. Name: "Add New App 2"
3. Table ID: "add_new_app_2"
4. Click **Create**
5. Add the 11 columns listed above for Table 2

### 4. Set Permissions

**For both tables:**

#### Create Permission:
- Role: `users` - Allow authenticated users to create documents

#### Read Permission:
- Role: `any` - Allow anyone to read documents (for public app listing)

#### Update Permission:
- Role: `users` - Allow authenticated users to update their own documents

#### Delete Permission:
- Role: `users` - Allow authenticated users to delete their own documents

### 5. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google Play API Configuration
NEXT_PUBLIC_GOOGLE_PLAY_API_URL=http://localhost:3000

# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_TABLE_ID_1=add_new_app
NEXT_PUBLIC_APPWRITE_TABLE_ID_2=add_new_app_2
```

## How It Works

### Data Flow
1. **App Creation**: When a user creates an app, data is stored in both tables
2. **Primary Data**: Essential app information goes to `add_new_app`
3. **Additional Data**: Extended metadata goes to `add_new_app_2`
4. **Linking**: Both tables are linked via the `appId` field

### Current Implementation
- **Table 1**: Stores the main app data that's most frequently accessed
- **Table 2**: Stores additional metadata that's accessed less frequently
- **Fallback**: If Table 2 creation fails, the app is still created in Table 1

## Troubleshooting

### Common Issues

1. **"Table not found" error**
   - Ensure both tables exist with exact IDs: `add_new_app` and `add_new_app_2`
   - Check that you're in the correct database

2. **"Permission denied" error**
   - Set permissions for both tables, not just one
   - Ensure Create permission is set to `users` or `any`

3. **"Column not found" error**
   - Verify all required columns are created in both tables
   - Check column names match exactly (case-sensitive)

4. **"Configuration incomplete" error**
   - Ensure all environment variables are set
   - Check that both table IDs are specified

### Testing Your Setup

1. **Run Diagnostic**: Go to `/admin/apps/add` and click "Run Diagnostic"
2. **Check Console**: Look for configuration logs in browser console
3. **Test App Creation**: Try creating a new app to verify both tables work

## Future Enhancements

### Potential Improvements
1. **Data Synchronization**: Implement better sync between tables
2. **Table 2 Optimization**: Add more fields to Table 2 as needed
3. **Query Optimization**: Implement efficient queries across both tables
4. **Data Migration**: Tools to migrate data between tables

### Column Distribution Strategy
- **Table 1**: Most frequently accessed data (title, summary, rating, etc.)
- **Table 2**: Less frequently accessed data (URLs, metadata, etc.)

This approach ensures optimal performance while working within Appwrite's column limitations.
