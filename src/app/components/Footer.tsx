"use client";

import Link from "next/link";
import Image from 'next/image';


export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <Image 
                  src="/logo_test.png" 
                  alt="Modern App Store Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-medium text-gray-900">Modern App Store</span>
            </div>
            <p className="text-gray-600 text-sm">
              Discover amazing apps and tools for every need. Your trusted source for quality applications and free Android APK downloads.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4 text-sm">Discover</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link href="/" className="hover:text-gray-900 transition-colors">Featured Apps</Link></li>
              <li><Link href="/search" className="hover:text-gray-900 transition-colors">New Releases</Link></li>
              <li><Link href="/search?filter=trending" className="hover:text-gray-900 transition-colors">Top Charts</Link></li>
              <li><Link href="/categories" className="hover:text-gray-900 transition-colors">Categories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4 text-sm">Support</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Developer Portal</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4 text-sm">Connect</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Modern App Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
