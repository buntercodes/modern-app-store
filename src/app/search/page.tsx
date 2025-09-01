import { Filter, Star, Download, Smartphone, Grid3X3, List, SlidersHorizontal, Play, MoreVertical, Share2, Bookmark } from "lucide-react";
import Header from "../components/Header";

export default function SearchPage() {
  // Mock search results - in real app this would come from API
  const searchResults = [
    {
      id: 1,
      name: "PhotoMaster Pro",
      description: "Professional photo editing with AI-powered tools",
      rating: 4.8,
      downloads: "2.5M",
      price: "$9.99",
      category: "Photo & Video",
      featured: true,
      developer: "Creative Studios Inc.",
      size: "45.2 MB"
    },
    {
      id: 2,
      name: "TaskFlow",
      description: "Smart task management and productivity app",
      rating: 4.9,
      downloads: "1.8M",
      price: "Free",
      category: "Productivity",
      featured: false,
      developer: "Productivity Labs",
      size: "23.1 MB"
    },
    {
      id: 3,
      name: "SoundWave",
      description: "High-quality music streaming and discovery",
      rating: 4.7,
      downloads: "5.2M",
      price: "$4.99/month",
      category: "Music & Audio",
      featured: false,
      developer: "AudioTech Solutions",
      size: "67.8 MB"
    },
    {
      id: 4,
      name: "MindMap",
      description: "Visual thinking and brainstorming tool",
      rating: 4.6,
      downloads: "890K",
      price: "Free",
      category: "Productivity",
      featured: false,
      developer: "MindTools Inc.",
      size: "34.5 MB"
    },
    {
      id: 5,
      name: "FitTracker",
      description: "Comprehensive fitness and health monitoring",
      rating: 4.7,
      downloads: "1.2M",
      price: "$2.99",
      category: "Health & Fitness",
      featured: false,
      developer: "HealthTech Pro",
      size: "28.9 MB"
    },
    {
      id: 6,
      name: "CodeEditor",
      description: "Advanced code editor for developers",
      rating: 4.8,
      downloads: "650K",
      price: "$19.99",
      category: "Development",
      featured: false,
      developer: "DevTools Studio",
      size: "156.7 MB"
    },
    {
      id: 7,
      name: "PhotoLight",
      description: "Simple photo editing for beginners",
      rating: 4.3,
      downloads: "750K",
      price: "Free",
      category: "Photo & Video",
      featured: false,
      developer: "PhotoSimple Inc.",
      size: "18.3 MB"
    },
    {
      id: 8,
      name: "TaskMaster",
      description: "Basic task management app",
      rating: 4.2,
      downloads: "450K",
      price: "Free",
      category: "Productivity",
      featured: false,
      developer: "TaskTools",
      size: "12.7 MB"
    }
  ];

  const categories = [
    "All Categories",
    "Photo & Video",
    "Productivity",
    "Music & Audio",
    "Health & Fitness",
    "Development",
    "Entertainment",
    "Business"
  ];

  const priceRanges = [
    "All Prices",
    "Free",
    "Under $5",
    "$5 - $10",
    "$10 - $20",
    "Over $20"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600 text-sm">Found {searchResults.length} apps matching "photo editing"</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium text-gray-900 text-sm">Filters</h3>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        defaultChecked={category === "All Categories"}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={range}
                        defaultChecked={range === "All Prices"}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        defaultChecked={rating === 4.0}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{rating}+ stars</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full text-green-600 hover:text-green-700 font-medium text-sm">
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">{searchResults.length} results</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">Sorted by relevance</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {searchResults.map((app) => (
                <div key={app.id} className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-base mb-1 truncate">{app.name}</h3>
                          <p className="text-gray-500 text-xs mb-2">{app.developer}</p>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{app.description}</p>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-gray-700">{app.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{app.downloads}</span>
                        <span>•</span>
                        <span>{app.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">{app.price}</span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                            Install
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm" disabled>
                  Previous
                </button>
                <button className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm">1</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">2</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">3</button>
                <span className="px-3 py-2 text-gray-500 text-sm">...</span>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">10</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">&copy; 2024 App Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
