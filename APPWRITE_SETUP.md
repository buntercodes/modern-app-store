# Appwrite Cloud Database Setup

This document provides step-by-step instructions to set up Appwrite Cloud database for the Modern App Store.

## Prerequisites

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/)
2. Have the Appwrite SDK installed (already done via `npm install appwrite@latest`)

## Setup Steps

### 1. Create Appwrite Project

1. Go to [Appwrite Cloud Console](https://cloud.appwrite.io/)
2. Click "Create Project"
3. Enter project name: "Modern App Store"
4. Select region closest to your users
5. Click "Create"
6. Copy the **Project ID** from the project settings

### 2. Create Database

1. In your Appwrite project, go to "Databases" section
2. Click "Create Database"
3. Name: "AppStore"
4. Database ID: "appstore" (or auto-generated)
5. Click "Create"
6. Copy the **Database ID**

### 3. Create Table

1. Inside your database, click "Create Table"
2. Name: "Apps"
3. Table ID: "apps" (or auto-generated)
4. Click "Create"
5. Copy the **Table ID**

### 4. Configure Table Columns

Add the following columns to your "Apps" table:

#### Required String Columns:
- `appId` (String, required, 255 chars) - App package name/ID
- `title` (String, required, 255 chars) - App title
- `summary` (String, required, 1000 chars) - Brief summary
- `description` (String, optional, 5000 chars) - Detailed description
- `icon` (String, optional, 500 chars) - Icon URL
- `scoreText` (String, optional, 100 chars) - Rating text
- `url` (String, optional, 500 chars) - App URL
- `playstoreUrl` (String, optional, 500 chars) - Play Store URL
- `currency` (String, optional, 10 chars) - Currency code
- `categories` (String, optional, 255 chars) - App categories
- `permissions` (String, optional, 500 chars) - Permissions URL
- `similar` (String, optional, 500 chars) - Similar apps URL
- `reviews` (String, optional, 500 chars) - Reviews URL
- `datasafety` (String, optional, 500 chars) - Data safety URL
- `size` (String, optional, 50 chars) - App size
- `installs` (String, optional, 50 chars) - Install count
- `version` (String, optional, 50 chars) - App version
- `androidVersion` (String, optional, 50 chars) - Min Android version
- `contentRating` (String, optional, 50 chars) - Content rating
- `video` (String, optional, 500 chars) - Video URL
- `privacyPolicy` (String, optional, 500 chars) - Privacy policy URL
- `genre` (String, optional, 100 chars) - App genre
- `status` (String, required, 20 chars, default: "pending") - App status
- `submittedBy` (String, required, 255 chars) - Submitter email
- `submittedAt` (String, required, 50 chars) - Submission timestamp

#### JSON Columns:
- `developer` (JSON, required) - Developer information object
- `screenshots` (JSON, optional) - Array of screenshot URLs

#### Numeric Columns:
- `score` (Double, optional) - Rating score (0-5)
- `price` (Double, optional) - App price

#### Boolean Columns:
- `free` (Boolean, required, default: true) - Is app free

### 5. Set Table Permissions

Configure permissions for the "Apps" table:

#### Create Permission:
- Role: `users` - Allow authenticated users to create documents

#### Read Permission:
- Role: `any` - Allow anyone to read documents (for public app listing)

#### Update Permission:
- Role: `users` - Allow authenticated users to update their own documents
- Add custom rule for admin users if needed

#### Delete Permission:
- Role: `users` - Allow authenticated users to delete their own documents
- Add custom rule for admin users if needed

### 6. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google Play API Configuration
NEXT_PUBLIC_GOOGLE_PLAY_API_URL=http://localhost:3000

# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_TABLE_ID=your_table_id_here
```

Replace the placeholder values with your actual IDs from steps 1-3.

### 7. Configure Authentication (Optional)

If you want to use Appwrite authentication instead of the mock auth:

1. Go to "Auth" section in Appwrite console
2. Enable desired authentication methods (Email/Password, OAuth providers, etc.)
3. Configure security settings as needed

## Usage

### Adding New Apps

1. Navigate to `/admin/apps/add` in your application
2. Click "Lookup App" button
3. Enter a Google Play package name (e.g., `org.wikipedia`)
4. Click "Lookup" to fetch app details from the Google Play API
5. Review the fetched data in the modal
6. Click "Use This Data" to populate the form
7. Modify any fields as needed
8. Click "Save App" to store in Appwrite database

### Managing Apps

The apps will be stored in your Appwrite database with:
- Status tracking (pending/approved/rejected)
- Full app metadata from Google Play Store
- Submission tracking (who submitted, when)
- Developer information

## Troubleshooting

### Common Issues:

1. **Columns not configured**: Ensure all required columns are created in the table
2. **Permission errors**: Check table permissions allow the required operations
3. **Environment variables**: Ensure all Appwrite IDs are correctly set in `.env.local`
4. **Network errors**: Verify Appwrite endpoint is accessible

### Debug Mode:

Check browser console for detailed error messages when operations fail. The application includes comprehensive error logging.

## Next Steps

1. Set up proper user authentication with Appwrite Auth
2. Implement admin approval workflow
3. Add app status management in the admin panel
4. Set up webhooks for real-time updates
5. Implement search and filtering in the database
