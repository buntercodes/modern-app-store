import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper } from '../../lib/googlePlayScraper';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term') || searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const price = searchParams.get('price') || undefined;
    const rating = searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined;
    const limit = parseInt(searchParams.get('limit') || '20');
    
    if (!term) {
      return NextResponse.json(
        { error: 'Search term is required' },
        { status: 400 }
      );
    }
    
    console.log(`🚀 API Route: Searching for "${term}" with limit: ${limit}`);
    
    // Use the built-in Google Play scraper
    const apps = await googlePlayScraper.searchApps({
      term,
      category,
      price,
      rating,
      limit
    });
    
    console.log(`✅ Successfully found ${apps.length} apps for search: "${term}"`);
    
    // Return the data in the expected format
    return NextResponse.json({
      results: apps,
      total: apps.length,
      term,
      category,
      price,
      rating,
      limit
    });
    
  } catch (error) {
    console.error('❌ API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to search apps', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
