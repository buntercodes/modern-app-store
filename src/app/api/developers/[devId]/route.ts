import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper } from '../../../../lib/googlePlayScraper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ devId: string }> }
) {
  try {
    const { devId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    
    console.log(`🚀 API Route: Getting apps for developer: ${devId}, limit: ${limit}`);
    
    // Use the built-in Google Play scraper
    const apps = await googlePlayScraper.getDeveloperApps(devId, limit);
    
    console.log(`✅ Successfully retrieved ${apps.length} apps for developer: ${devId}`);
    
    // Return the data in the expected format
    return NextResponse.json({
      results: apps,
      total: apps.length,
      developer: devId,
      limit
    });
    
  } catch (error) {
    console.error('❌ API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to get developer apps', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
