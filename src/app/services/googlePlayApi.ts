// Google Play API service for fetching app data
// Note: Now using built-in scraper instead of external API
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface GooglePlayApp {
  appId: string;
  title: string;
  summary: string;
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
}

export interface SearchParams {
  term: string;
  category?: string;
  price?: string;
  rating?: number;
  limit?: number;
}

export interface CategoryParams {
  category: string;
  limit?: number;
}

class GooglePlayApiService {
  private async makeRequest<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    try {
      // Use relative URLs since we're now using built-in API routes
      const url = new URL(endpoint, window.location.origin);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      console.log(`🌐 Making API request to: ${url.toString()}`);
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ API response received:`, data);
      return data;
    } catch (error) {
      console.error('❌ Google Play API request failed:', error);
      throw error;
    }
  }

  // Search for apps
  async searchApps(params: SearchParams): Promise<GooglePlayApp[]> {
    const response = await this.makeRequest<{ results: GooglePlayApp[] }>('/api/search', params);
    return response.results || [];
  }

  // Get apps by category
  async getAppsByCategory(params: CategoryParams): Promise<GooglePlayApp[]> {
    const response = await this.makeRequest<{ results: GooglePlayApp[] }>('/api/apps', {
      category: params.category,
      collection: 'TOP_FREE',
      limit: params.limit || 20
    });
    return response.results || [];
  }

  // Get app details
  async getAppDetails(appId: string): Promise<GooglePlayApp> {
    return this.makeRequest<GooglePlayApp>(`/api/apps/${appId}`);
  }

  // Get trending apps (top charts)
  async getTrendingApps(limit: number = 20): Promise<GooglePlayApp[]> {
    const response = await this.makeRequest<{ results: GooglePlayApp[] }>('/api/apps', {
      category: 'APPLICATION',
      collection: 'TOP_FREE',
      limit
    });
    return response.results || [];
  }

  // Get recommended apps (based on popular categories)
  async getRecommendedApps(limit: number = 20): Promise<GooglePlayApp[]> {
    const response = await this.makeRequest<{ results: GooglePlayApp[] }>('/api/apps', {
      collection: 'TOP_FREE',
      category: 'APPLICATION',
      limit
    });
    return response.results || [];
  }

  // Get tools and utilities apps
  async getToolsApps(limit: number = 20): Promise<GooglePlayApp[]> {
    const response = await this.makeRequest<{ results: GooglePlayApp[] }>('/api/apps', {
      category: 'TOOLS',
      collection: 'TOP_FREE',
      limit
    });
    return response.results || [];
  }

  // Get all available categories
  async getCategories(): Promise<string[]> {
    const response = await this.makeRequest<{ categories: string[] }>('/api/categories');
    return response.categories || [];
  }
}

export const googlePlayApi = new GooglePlayApiService();

// Fallback mock data for development/testing (used when API fails)
export const mockApps: GooglePlayApp[] = [
  {
    appId: 'com.torproject.torbrowser',
    title: 'Tor Browser',
    summary: 'Browse the web privately and securely',
    developer: {
      devId: 'The Tor Project',
      url: 'http://localhost:3000/api/developers/The%20Tor%20Project'
    },
    icon: 'https://lh3.googleusercontent.com/QDRAv7v4LSCfZgz3GIbOSz8Zj8rWqeeYuqqYiqyQXkxRJwG7vvUltzsFaWK5D7-JMnIZ=w340',
    score: 4.4,
    scoreText: '4.4',
    price: 0,
    free: true,
    url: 'http://localhost:3000/api/apps/com.torproject.torbrowser',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.torproject.torbrowser',
    currency: 'USD'
  },
  {
    appId: 'com.termius',
    title: 'Termius - Modern SSH Client',
    summary: 'Professional SSH client for mobile and desktop',
    developer: {
      devId: 'Termius',
      url: 'http://localhost:3000/api/developers/Termius'
    },
    icon: 'https://lh3.googleusercontent.com/QDRAv7v4LSCfZgz3GIbOSz8Zj8rWqeeYuqqYiqyQXkxRJwG7vvUltzsFaWK5D7-JMnIZ=w340',
    score: 4.7,
    scoreText: '4.7',
    price: 0,
    free: true,
    url: 'http://localhost:3000/api/apps/com.termius',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.termius',
    currency: 'USD'
  },
  {
    appId: 'com.github.android',
    title: 'GitHub',
    summary: 'Build software better, together',
    developer: {
      devId: 'GitHub',
      url: 'http://localhost:3000/api/developers/GitHub'
    },
    icon: 'https://lh3.googleusercontent.com/QDRAv7v4LSCfZgz3GIbOSz8Zj8rWqeeYuqqYiqyQXkxRJwG7vvUltzsFaWK5D7-JMnIZ=w340',
    score: 4.5,
    scoreText: '4.5',
    price: 0,
    free: true,
    url: 'http://localhost:3000/api/apps/com.github.android',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.github.android',
    currency: 'USD'
  },
  {
    appId: 'com.spotify.music',
    title: 'Spotify: Music and Podcasts',
    summary: 'Listen to music and podcasts on the go',
    developer: {
      devId: 'Spotify AB',
      url: 'http://localhost:3000/api/developers/Spotify%20AB'
    },
    icon: 'https://lh3.googleusercontent.com/QDRAv7v4LSCfZgz3GIbOSz8Zj8rWqeeYuqqYiqyQXkxRJwG7vvUltzsFaWK5D7-JMnIZ=w340',
    score: 4.6,
    scoreText: '4.6',
    price: 0,
    free: true,
    url: 'http://localhost:3000/api/apps/com.spotify.music',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.spotify.music',
    currency: 'USD'
  },
  {
    appId: 'com.whatsapp',
    title: 'WhatsApp Messenger',
    summary: 'Simple, secure, reliable messaging',
    developer: {
      devId: 'WhatsApp LLC',
      url: 'http://localhost:3000/api/developers/WhatsApp%20LLC'
    },
    icon: 'https://lh3.googleusercontent.com/QDRAv7v4LSCfZgz3GIbOSz8Zj8rWqeeYuqqYiqyQXkxRJwG7vvUltzsFaWK5D7-JMnIZ=w340',
    score: 4.3,
    scoreText: '4.3',
    price: 0,
    free: true,
    url: 'http://localhost:3000/api/apps/com.whatsapp',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.whatsapp',
    currency: 'USD'
  }
];
