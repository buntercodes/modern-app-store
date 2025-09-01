import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper } from '../../../lib/googlePlayScraper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appId } = await params;
    console.log(`🚀 API Route: Scraping app details for ${appId}`);
    
    // Use the built-in Google Play scraper
    const app = await googlePlayScraper.getAppDetails(appId);
    
    console.log(`✅ Successfully scraped app details for ${appId}`);
    
    // Return the data directly to the frontend
    return NextResponse.json(app);
    
  } catch (error) {
    console.error('❌ API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape app details', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
