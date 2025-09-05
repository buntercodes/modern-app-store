import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper } from '../../../lib/googlePlayScraper';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const category = searchParams.get('category') || 'APPLICATION';
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log(`📱 Fetching ${limit} free Android apps in category: ${category} (offset: ${offset})`);

    let apps;

    if (category === 'ALL_APPS') {
      // For ALL_APPS, fetch from multiple categories and combine
      const appCategories = [
        'APPLICATION', 'TOOLS', 'COMMUNICATION', 'PRODUCTIVITY', 'SOCIAL',
        'PHOTOGRAPHY', 'VIDEO_PLAYERS', 'MUSIC_AND_AUDIO', 'NEWS_AND_MAGAZINES',
        'MAPS_AND_NAVIGATION', 'EDUCATION', 'ENTERTAINMENT', 'FINANCE',
        'HEALTH_AND_FITNESS', 'LIFESTYLE', 'SHOPPING', 'TRAVEL_AND_LOCAL'
      ];

      const appsPerCategory = Math.ceil(limit / appCategories.length);
      const allApps = [];

      for (const cat of appCategories) {
        try {
          const categoryApps = await googlePlayScraper.getAppsByCategory({
            category: cat,
            collection: 'TOP_FREE',
            limit: appsPerCategory
          });
          allApps.push(...categoryApps);
        } catch (error) {
          console.warn(`Failed to fetch apps for category ${cat}:`, error);
        }
      }

      // Remove duplicates based on appId
      const uniqueApps = allApps.filter((app, index, self) => 
        index === self.findIndex(a => a.appId === app.appId)
      );

      // Filter free apps and slice to limit
      apps = uniqueApps
        .filter(app => app.free || app.price === 0)
        .slice(0, limit);
    } else {
      // For specific category, fetch normally
      apps = await googlePlayScraper.getAppsByCategory({
        category: category,
        collection: 'TOP_FREE',
        limit: limit + offset // Fetch more to account for offset
      });

      // Filter to ensure we only get free apps
      apps = apps.filter(app => app.free || app.price === 0);

      // Apply offset
      if (offset > 0) {
        apps = apps.slice(offset);
      }

      // Limit results
      apps = apps.slice(0, limit);
    }

    console.log(`✅ Successfully fetched ${apps.length} free Android apps`);

    return NextResponse.json({
      success: true,
      apps: apps,
      count: apps.length,
      category: category,
      collection: 'TOP_FREE',
      hasMore: apps.length === limit
    });

  } catch (error) {
    console.error('❌ Error fetching free Android apps:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch free Android apps',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
