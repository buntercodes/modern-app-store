"use client";

import { useEffect } from 'react';

export default function PerformanceOptimizations() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload next page resources
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/api/apps/free?category=APPLICATION&limit=100';
      document.head.appendChild(link);
    };

    // Lazy load images when they come into viewport
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Optimize scroll performance
    const optimizeScroll = () => {
      let ticking = false;
      
      const updateScroll = () => {
        // Throttled scroll handling for better performance
        ticking = false;
      };

      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateScroll);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', requestTick);
      };
    };

    // Initialize optimizations
    preloadCriticalResources();
    lazyLoadImages();
    const cleanup = optimizeScroll();

    return cleanup;
  }, []);

  return null;
}
