import gplay from 'google-play-scraper';

// Interface for our standardized app data structure
export interface GooglePlayApp {
  appId: string;
  title: string;
  summary: string;
  description?: string;
  developer: {
    devId: string;
    url: string;
  };
  icon: string;
  score: number;
  scoreText: string;
  price: number;
  free: boolean;
  url: string;
  playstoreUrl: string;
  currency: string;
  categories?: string;
  permissions?: string;
  similar?: string;
  reviews?: string;
  datasafety?: string;
  size?: string;
  installs?: string;
  version?: string;
  androidVersion?: string;
  contentRating?: string;
  video?: string;
  privacyPolicy?: string;
  genre?: string;
  screenshots?: string[];
}

// Interface for search parameters
export interface SearchParams {
  term: string;
  category?: string;
  price?: string;
  rating?: number;
  limit?: number;
}

// Interface for category parameters
export interface CategoryParams {
  category: string;
  limit?: number;
}

class GooglePlayScraperService {
  // Transform Google Play scraper data to our standardized format
  private transformAppData(app: any): GooglePlayApp {
    return {
      appId: app.appId || app.id || '',
      title: app.title || '',
      summary: app.summary || '',
      description: app.description || '',
      developer: {
        devId: app.developer || app.developerId || '',
        url: app.developerWebsite || app.developerURL || ''
      },
      icon: app.icon || '',
      score: app.score || 0,
      scoreText: app.scoreText || '',
      price: app.price || 0,
      free: app.free !== undefined ? app.free : (app.price === 0),
      url: app.url || '',
      playstoreUrl: app.url || '',
      currency: app.currency || 'USD',
      categories: app.genre || app.categories?.[0] || '',
      permissions: app.permissions ? JSON.stringify(app.permissions) : '',
      similar: app.similarApps ? JSON.stringify(app.similarApps) : '',
      reviews: app.reviews ? JSON.stringify(app.reviews) : '',
      datasafety: app.dataSafety ? JSON.stringify(app.dataSafety) : '',
      size: app.size || '',
      installs: app.installs || '',
      version: app.version || '',
      androidVersion: app.androidVersion || '',
      contentRating: app.contentRating || '',
      video: app.video || '',
      privacyPolicy: app.privacyPolicy || '',
      genre: app.genre || '',
      screenshots: app.screenshots || []
    };
  }

  // Get apps by category and collection
  async getAppsByCategory(params: {
    category?: string;
    collection?: string;
    limit?: number;
  }): Promise<GooglePlayApp[]> {
    try {
      const { category = 'APPLICATION', collection = 'TOP_FREE', limit = 20 } = params;
      
      console.log(`🔍 Scraping ${category} apps with collection ${collection}, limit: ${limit}`);
      
      let apps: any[] = [];
      
      switch (collection) {
        case 'TOP_FREE':
          apps = await gplay.list({
            category: category as any,
            collection: gplay.collection.TOP_FREE,
            num: limit
          });
          break;
        case 'TOP_PAID':
          apps = await gplay.list({
            category: category as any,
            collection: gplay.collection.TOP_PAID,
            num: limit
          });
          break;
        case 'NEW_FREE':
          apps = await gplay.list({
            category: category as any,
            collection: gplay.collection.NEW_FREE,
            num: limit
          });
          break;
        case 'NEW_PAID':
          apps = await gplay.list({
            category: category as any,
            collection: gplay.collection.NEW_PAID,
            num: limit
          });
          break;
        case 'GROSSING':
          apps = await gplay.list({
            category: category as any,
            collection: gplay.collection.GROSSING,
            num: limit
          });
          break;
        default:
          apps = await gplay.list({
            category: category as any,
            collection: gplay.collection.TOP_FREE,
            num: limit
          });
      }
      
      console.log(`✅ Scraped ${apps.length} apps from Google Play`);
      
      // Transform the data to our standardized format
      const transformedApps = apps.map(app => this.transformAppData(app));
      
      return transformedApps;
    } catch (error) {
      console.error('❌ Error scraping apps by category:', error);
      throw new Error(`Failed to scrape apps: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Search for apps
  async searchApps(params: SearchParams): Promise<GooglePlayApp[]> {
    try {
      const { term, category, price, rating, limit = 20 } = params;
      
      console.log(`🔍 Searching for: "${term}" with limit: ${limit}`);
      
      const searchOptions: any = {
        term,
        num: limit
      };
      
      if (category) {
        searchOptions.category = category as any;
      }
      
      if (price) {
        searchOptions.price = price as any;
      }
      
      if (rating) {
        searchOptions.rating = rating;
      }
      
      const apps = await gplay.search(searchOptions);
      
      console.log(`✅ Found ${apps.length} apps for search: "${term}"`);
      
      // Transform the data to our standardized format
      const transformedApps = apps.map(app => this.transformAppData(app));
      
      return transformedApps;
    } catch (error) {
      console.error('❌ Error searching apps:', error);
      throw new Error(`Failed to search apps: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get app details by ID
  async getAppDetails(appId: string): Promise<GooglePlayApp> {
    try {
      console.log(`🔍 Getting app details for: ${appId}`);
      
      const app = await gplay.app({ appId });
      
      console.log(`✅ Retrieved app details for: ${appId}`);
      
      // Transform the data to our standardized format
      return this.transformAppData(app);
    } catch (error) {
      console.error('❌ Error getting app details:', error);
      throw new Error(`Failed to get app details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get trending apps
  async getTrendingApps(limit: number = 20): Promise<GooglePlayApp[]> {
    try {
      console.log(`🔍 Getting trending apps, limit: ${limit}`);
      
      const apps = await gplay.list({
        category: gplay.category.APPLICATION,
        collection: gplay.collection.TOP_FREE,
        num: limit
      });
      
      console.log(`✅ Retrieved ${apps.length} trending apps`);
      
      // Transform the data to our standardized format
      const transformedApps = apps.map(app => this.transformAppData(app));
      
      return transformedApps;
    } catch (error) {
      console.error('❌ Error getting trending apps:', error);
      throw new Error(`Failed to get trending apps: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get recommended apps
  async getRecommendedApps(limit: number = 20): Promise<GooglePlayApp[]> {
    try {
      console.log(`🔍 Getting recommended apps, limit: ${limit}`);
      
      const apps = await gplay.list({
        category: gplay.category.APPLICATION,
        collection: gplay.collection.TOP_FREE,
        num: limit
      });
      
      console.log(`✅ Retrieved ${apps.length} recommended apps`);
      
      // Transform the data to our standardized format
      const transformedApps = apps.map(app => this.transformAppData(app));
      
      return transformedApps;
    } catch (error) {
      console.error('❌ Error getting recommended apps:', error);
      throw new Error(`Failed to get recommended apps: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get tools apps
  async getToolsApps(limit: number = 20): Promise<GooglePlayApp[]> {
    try {
      console.log(`🔍 Getting tools apps, limit: ${limit}`);
      
      const apps = await gplay.list({
        category: gplay.category.TOOLS,
        collection: gplay.collection.TOP_FREE,
        num: limit
      });
      
      console.log(`✅ Retrieved ${apps.length} tools apps`);
      
      // Transform the data to our standardized format
      const transformedApps = apps.map(app => this.transformAppData(app));
      
      return transformedApps;
    } catch (error) {
      console.error('❌ Error getting tools apps:', error);
      throw new Error(`Failed to get tools apps: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all available categories
  async getCategories(): Promise<string[]> {
    try {
      console.log(`🔍 Getting available categories`);
      
      const categories = Object.values(gplay.category);
      
      console.log(`✅ Retrieved ${categories.length} categories`);
      
      return categories;
    } catch (error) {
      console.error('❌ Error getting categories:', error);
      throw new Error(`Failed to get categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get developer apps
  async getDeveloperApps(devId: string, limit: number = 20): Promise<GooglePlayApp[]> {
    try {
      console.log(`🔍 Getting apps for developer: ${devId}, limit: ${limit}`);
      
      const apps = await gplay.developer({ devId, num: limit });
      
      console.log(`✅ Retrieved ${apps.length} apps for developer: ${devId}`);
      
      // Transform the data to our standardized format
      const transformedApps = apps.map(app => this.transformAppData(app));
      
      return transformedApps;
    } catch (error) {
      console.error('❌ Error getting developer apps:', error);
      throw new Error(`Failed to get developer apps: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export a singleton instance
export const googlePlayScraper = new GooglePlayScraperService();
export default googlePlayScraper;
