import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper } from '../../lib/googlePlayScraper';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'APPLICATION';
    const collection = searchParams.get('collection') || 'TOP_FREE';
    const limit = parseInt(searchParams.get('limit') || '20');
    
    console.log(`🚀 API Route: Scraping ${category} apps with collection ${collection}, limit: ${limit}`);
    
    // Use the built-in Google Play scraper
    const apps = await googlePlayScraper.getAppsByCategory({
      category,
      collection,
      limit
    });
    
    console.log(`✅ Successfully scraped ${apps.length} apps from Google Play`);
    
    // Return the data in the expected format
    return NextResponse.json({
      results: apps,
      total: apps.length,
      category,
      collection,
      limit
    });
    
  } catch (error) {
    console.error('❌ API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape apps', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
