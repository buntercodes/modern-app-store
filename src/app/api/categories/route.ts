import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper } from '../../lib/googlePlayScraper';

export async function GET() {
  try {
    console.log(`🚀 API Route: Getting available categories`);
    
    // Use the built-in Google Play scraper
    const categories = await googlePlayScraper.getCategories();
    
    console.log(`✅ Successfully retrieved ${categories.length} categories`);
    
    // Return the data in the expected format
    return NextResponse.json({
      categories,
      total: categories.length
    });
    
  } catch (error) {
    console.error('❌ API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to get categories', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
