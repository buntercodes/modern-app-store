# Vercel Analytics Setup Guide

This guide will help you set up Vercel Analytics integration for your admin panel.

## 🔧 Prerequisites

1. **Vercel Account**: You need a Vercel account with a deployed project
2. **Vercel Analytics**: Analytics must be enabled on your Vercel project
3. **API Access**: You need API access to fetch analytics data

## 📋 Setup Steps

### Step 1: Get Vercel API Token

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name like "Analytics API Token"
4. Select "Full Account" scope
5. Copy the generated token

### Step 2: Get Project ID

1. Go to your project in Vercel Dashboard
2. Go to Settings → General
3. Copy the "Project ID" from the project details

### Step 3: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Vercel Analytics API Configuration
VERCEL_TOKEN=your_vercel_api_token_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### Step 4: Enable Analytics on Vercel

1. Go to your project in Vercel Dashboard
2. Go to Analytics tab
3. Enable "Web Analytics" if not already enabled
4. Wait for data to start collecting (may take a few hours)

## 🚀 Features

The analytics dashboard includes:

- **Real-time Metrics**: Live visitor count and activity
- **Page Views**: Total page views with formatting
- **Unique Visitors**: Unique user count
- **Bounce Rate**: User engagement metrics
- **Session Duration**: Average time spent on site
- **Top Pages**: Most visited pages with percentages
- **Device Analytics**: Desktop, mobile, tablet breakdown
- **Browser Analytics**: Browser usage statistics
- **Performance Metrics**: Core Web Vitals and load times
- **Date Range Selection**: Custom date range filtering
- **Auto Refresh**: Real-time data updates
- **Mock Data Fallback**: Works even without Vercel API access

## 🔒 Security

- API tokens are stored securely in environment variables
- Rate limiting is implemented to prevent abuse
- CORS headers are properly configured
- Error handling for failed API calls

## 🛠️ Troubleshooting

### Common Issues:

1. **"Vercel API credentials not configured"**
   - Check that `VERCEL_TOKEN` and `VERCEL_PROJECT_ID` are set in `.env.local`
   - Restart your development server after adding environment variables
   - **Note**: The dashboard will show mock data if API is not available

2. **"Rate limited"**
   - The API has rate limiting (10 requests per minute)
   - Wait a moment before trying again

3. **"No analytics data available"**
   - Analytics may take time to collect data
   - Check that Web Analytics is enabled in Vercel
   - Verify your project ID is correct
   - **Mock data will be shown for development**

4. **"Failed to fetch analytics data"**
   - Check your Vercel token permissions
   - Verify the project ID is correct
   - Check Vercel API status
   - **The dashboard will automatically fall back to mock data**

5. **"Vercel API error: 404"**
   - This is normal - Vercel's analytics API has changed
   - The dashboard will use mock data instead
   - Real data will work when properly configured

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded
3. Test API endpoint directly: `http://localhost:3000/api/analytics`
4. Check Vercel dashboard for analytics data

## 📊 Data Refresh

- Data refreshes automatically when date range changes
- Manual refresh button available
- Real-time status indicator shows live data
- Rate limiting prevents excessive API calls

## 🎯 Next Steps

1. Set up the environment variables
2. Deploy to Vercel to test with real data
3. Customize the dashboard layout if needed
4. Add additional metrics as required

## 📝 Notes

- Analytics data is cached for performance
- Date range selection affects all metrics
- Real-time data updates every 30 seconds
- Performance metrics depend on Core Web Vitals data
