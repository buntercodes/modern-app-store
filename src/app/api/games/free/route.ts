import { NextRequest, NextResponse } from 'next/server';
import { googlePlayScraper, GooglePlayApp } from '../../../lib/googlePlayScraper';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const category = searchParams.get('category') || 'ALL_GAMES';
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log(`🎮 Fetching ${limit} free Android games in category: ${category} (offset: ${offset})`);

    let games: GooglePlayApp[] = [];

    if (category === 'ALL_GAMES') {
      // For "All Games", fetch from multiple game categories and combine
      const gameCategories = [
        'GAME_ACTION', 'GAME_ADVENTURE', 'GAME_ARCADE', 'GAME_CASUAL',
        'GAME_PUZZLE', 'GAME_RACING', 'GAME_ROLE_PLAYING', 'GAME_SIMULATION',
        'GAME_SPORTS', 'GAME_STRATEGY'
      ];
      
      const gamesPerCategory = Math.ceil(limit / gameCategories.length);
      const allGames: GooglePlayApp[] = [];
      
      for (const gameCategory of gameCategories) {
        try {
          const categoryGames = await googlePlayScraper.getAppsByCategory({
            category: gameCategory,
            collection: 'TOP_FREE',
            limit: gamesPerCategory
          });
          allGames.push(...categoryGames);
        } catch (err) {
          console.warn(`⚠️ Failed to fetch games for category ${gameCategory}:`, err);
        }
      }
      
      // Remove duplicates based on appId and take the requested limit
      const uniqueGames = allGames.filter((game, index, self) => 
        index === self.findIndex(g => g.appId === game.appId)
      );
      
      games = uniqueGames.slice(0, limit);
    } else {
      // For specific category, fetch normally
      games = await googlePlayScraper.getAppsByCategory({
        category: category,
        collection: 'TOP_FREE',
        limit: limit + offset // Fetch more to account for offset
      });

      // Filter to ensure we only get free games
      games = games.filter(game => game.free || game.price === 0);

      // Apply offset
      if (offset > 0) {
        games = games.slice(offset);
      }

      // Limit results
      games = games.slice(0, limit);
    }

    console.log(`✅ Successfully fetched ${games.length} free Android games`);

    return NextResponse.json({
      success: true,
      apps: games, // Use 'apps' to match the expected response format
      count: games.length,
      category: category,
      collection: 'TOP_FREE',
      hasMore: games.length === limit
    });

  } catch (error) {
    console.error('❌ Error fetching free Android games:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch free Android games',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
