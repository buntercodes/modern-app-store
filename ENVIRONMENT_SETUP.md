# Environment Setup Guide

This guide will help you set up the required environment variables for the Modern App Store.

## Required Environment Variables

Create a `.env.local` file in your project root with the following content:

```bash
# Google Play API Configuration (Now using built-in scraper)
# NEXT_PUBLIC_GOOGLE_PLAY_API_URL=http://localhost:3000  # No longer needed

# Appwrite Configuration (Replace with your actual values)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_TABLE_ID_1=add_new_app
NEXT_PUBLIC_APPWRITE_TABLE_ID_2=add_new_app_2
```

## How to Get Appwrite Values

### 1. Project ID
1. Go to [Appwrite Cloud Console](https://cloud.appwrite.io/)
2. Select your project
3. Go to **Settings** → **General**
4. Copy the **Project ID**

### 2. Database ID
1. In your Appwrite project, go to **Databases**
2. Click on your database name
3. Copy the **Database ID** from the URL or database settings

### 3. Table IDs
1. Inside your database, you should have two tables:
   - **Table 1**: `add_new_app` (for primary app data)
   - **Table 2**: `add_new_app_2` (for additional app data)
2. Copy the **Table IDs** from the URL or table settings

## Common Issues and Solutions

### Issue: "APPWRITE_PROJECT_ID is not set"
**Solution**: Make sure your `.env.local` file exists and contains the correct project ID.

### Issue: "Database or table not found"
**Solution**: 
1. Verify your database ID is correct
2. Verify both table IDs are correct (`add_new_app` and `add_new_app_2`)
3. Make sure the database and both tables exist in your Appwrite project

### Issue: "Permission denied"
**Solution**: 
1. Go to both table settings in Appwrite (`add_new_app` and `add_new_app_2`)
2. Set **Create** permission to `users` or `any`
3. Set **Read** permission to `any` (for public access)
4. Set **Update** permission to `users`
5. Set **Delete** permission to `users`

### Issue: "Authentication failed"
**Solution**: 
1. Verify your project ID is correct
2. Make sure you're using the correct Appwrite endpoint
3. Check if your project is active in Appwrite Cloud

## Testing Your Setup

### 1. Test Environment Variables
Open your browser console and look for the configuration log:
```
🔧 Appwrite Configuration:
Endpoint: https://cloud.appwrite.io/v1
Project ID: your_project_id
Database ID: your_database_id
Collection ID: your_collection_id
```

### 2. Test App Creation
1. Start the application: `npm run dev`
2. Navigate to `http://localhost:3000/admin/apps/add`
3. Click "Lookup App" and search for "org.wikipedia"
4. Fill the form and click "Save App"
5. Check the browser console for detailed logs

## Testing Without Appwrite

If you want to test the application without setting up Appwrite:

1. You can still use the Google Play API lookup functionality
2. The form will be populated with data from the API
3. The save operation will fail gracefully with an error message
4. All other features of the admin panel will continue to work

## Verification Checklist

- [ ] `.env.local` file exists in project root
- [ ] All Appwrite environment variables are set
- [ ] Project ID is correct and project is active
- [ ] Database exists and ID is correct
- [ ] Both tables exist and IDs are correct (`add_new_app` and `add_new_app_2`)
- [ ] Both table permissions are set correctly
- [ ] Google Play API is running on localhost:3000

## Need Help?

1. Check the browser console for detailed error messages
2. Verify your Appwrite project is active and accessible
3. Ensure all environment variables are correctly set
4. Check the `APPWRITE_SETUP.md` for detailed setup instructions
