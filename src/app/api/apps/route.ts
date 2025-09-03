import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper } from '../../lib/googlePlayScraper';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'APPLICATION';
  const collection = searchParams.get('collection') || 'TOP_FREE';
  const limit = parseInt(searchParams.get('limit') || '20');
  
  try {
    console.log(`🚀 API Route: Scraping ${category} apps with collection ${collection}, limit: ${limit}`);
    
    // Set a timeout for the scraping operation
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Scraping timeout')), 25000); // 25 second timeout
    });
    
    // Use the built-in Google Play scraper with timeout
    const scrapingPromise = googlePlayScraper.getAppsByCategory({
      category,
      collection,
      limit
    });
    
    const apps = await Promise.race([scrapingPromise, timeoutPromise]) as unknown[];
    
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
    
    // Return fallback data instead of error to prevent empty states
    const fallbackApps = [
      {
        appId: 'com.whatsapp',
        title: 'WhatsApp',
        summary: 'Simple, reliable messaging and calling for free.',
        developer: { devId: 'whatsapp-inc', url: 'https://play.google.com/store/apps/developer?id=WhatsApp+Inc.' },
        icon: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptPuwXCKWXlO0xV5Om96d0hZg9Rsfb9f3FTX5byr_VXu',
        score: 4.1,
        scoreText: '4.1',
        price: 0,
        free: true,
        url: 'https://play.google.com/store/apps/details?id=com.whatsapp',
        playstoreUrl: 'https://play.google.com/store/apps/details?id=com.whatsapp',
        currency: 'USD',
        categories: 'COMMUNICATION',
        installs: '5,000,000,000+',
        version: '2.24.1.78',
        androidVersion: '5.0',
        contentRating: 'Everyone',
        genre: 'Communication'
      },
      {
        appId: 'com.instagram.android',
        title: 'Instagram',
        summary: 'Connect with friends, share your life and discover amazing content.',
        developer: { devId: 'instagram', url: 'https://play.google.com/store/apps/developer?id=Instagram' },
        icon: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLas1RRWCZ5VUUrLL-m49BcB85GACEWX0Ofp6ZE64qX5w',
        score: 4.3,
        scoreText: '4.3',
        price: 0,
        free: true,
        url: 'https://play.google.com/store/apps/details?id=com.instagram.android',
        playstoreUrl: 'https://play.google.com/store/apps/details?id=com.instagram.android',
        currency: 'USD',
        categories: 'SOCIAL',
        installs: '1,000,000,000+',
        version: '312.0.0.45.120',
        androidVersion: '7.0',
        contentRating: 'Teen',
        genre: 'Social'
      },
      {
        appId: 'com.spotify.music',
        title: 'Spotify',
        summary: 'Music and podcasts for everyone.',
        developer: { devId: 'spotify-ab', url: 'https://play.google.com/store/apps/developer?id=Spotify+AB' },
        icon: 'https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM',
        score: 4.5,
        scoreText: '4.5',
        price: 0,
        free: true,
        url: 'https://play.google.com/store/apps/details?id=com.spotify.music',
        playstoreUrl: 'https://play.google.com/store/apps/details?id=com.spotify.music',
        currency: 'USD',
        categories: 'MUSIC_AND_AUDIO',
        installs: '1,000,000,000+',
        version: '8.8.96.510',
        androidVersion: '5.0',
        contentRating: 'Everyone',
        genre: 'Music & Audio'
      }
    ];
    
    console.log('⚠️ Using fallback data due to scraping error');
    
    return NextResponse.json({
      results: fallbackApps.slice(0, limit),
      total: fallbackApps.length,
      category,
      collection,
      limit,
      fallback: true
    });
  }
}
