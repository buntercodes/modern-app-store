import { User, Settings, Download, Heart, Clock, Star, Play, Edit, Grid3X3, List, Filter, Plus, Bell, CreditCard, HelpCircle, Shield } from "lucide-react";
import Header from "../components/Header";
import Breadcrumb, { BreadcrumbItem } from "../components/Breadcrumb";

export default function ProfilePage() {
  // Mock user data - in real app this would come from API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/john-doe.jpg",
    joinDate: "March 2023",
    totalApps: 24,
    totalReviews: 8,
    memberSince: "1 year"
  };

  const installedApps = [
    {
      id: 1,
      name: "PhotoMaster Pro",
      icon: "/app-icons/photo-master.png",
      category: "Photo & Video",
      lastUsed: "2 days ago",
      size: "45.2 MB"
    },
    {
      id: 2,
      name: "TaskFlow",
      icon: "/app-icons/taskflow.png",
      category: "Productivity",
      lastUsed: "1 week ago",
      size: "23.1 MB"
    },
    {
      id: 3,
      name: "SoundWave",
      icon: "/app-icons/soundwave.png",
      category: "Music & Audio",
      lastUsed: "3 days ago",
      size: "67.8 MB"
    }
  ];

  const favoriteApps = [
    {
      id: 4,
      name: "MindMap",
      icon: "/app-icons/mindmap.png",
      category: "Productivity",
      rating: 4.6,
      price: "Free"
    },
    {
      id: 5,
      name: "FitTracker",
      icon: "/app-icons/fittracker.png",
      category: "Health & Fitness",
      rating: 4.7,
      price: "$2.99"
    }
  ];

  const recentReviews = [
    {
      id: 1,
      appName: "PhotoMaster Pro",
      rating: 5,
      comment: "Excellent photo editing app with professional features!",
      date: "2 days ago"
    },
    {
      id: 2,
      appName: "TaskFlow",
      rating: 4,
      comment: "Great productivity tool, helps me stay organized.",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Profile', current: true }
          ]} 
        />

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-3">{user.email}</p>
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <span>Member since {user.memberSince}</span>
                <span>{user.totalApps} apps installed</span>
                <span>{user.totalReviews} reviews written</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm">
                Edit Profile
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Installed Apps */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Installed Apps</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {installedApps.map((app) => (
                  <div key={app.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{app.name}</h3>
                      <p className="text-xs text-gray-500">{app.category} • {app.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Last used</p>
                      <p className="text-xs text-gray-600">{app.lastUsed}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  View All Installed Apps
                </button>
              </div>
            </div>

            {/* Favorite Apps */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Favorite Apps</h2>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favoriteApps.map((app) => (
                  <div key={app.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{app.name}</h3>
                      <p className="text-xs text-gray-500">{app.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-700">{app.rating}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-900">{app.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Reviews</h2>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{review.appName}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <Plus className="w-4 h-4 text-green-600" />
                  <span>Add New App</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <Heart className="w-4 h-4 text-pink-600" />
                  <span>Browse Favorites</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <Download className="w-4 h-4 text-green-600" />
                  <span>Download History</span>
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <User className="w-4 h-4 text-green-600" />
                  <span>Personal Information</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <Bell className="w-4 h-4 text-orange-600" />
                  <span>Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Privacy & Security</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Payment Methods</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <HelpCircle className="w-4 h-4 text-gray-600" />
                  <span>Help & Support</span>
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Apps Installed</span>
                  <span className="font-medium text-gray-900 text-sm">{user.totalApps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Reviews Written</span>
                  <span className="font-medium text-gray-900 text-sm">{user.totalReviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Member Since</span>
                  <span className="font-medium text-gray-900 text-sm">{user.joinDate}</span>
                </div>
              </div>
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
