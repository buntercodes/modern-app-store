"use client";

import { useEffect } from 'react';

export default function PerformanceOptimizations() {
  useEffect(() => {
    // Preload critical resources
    const preloadFonts = () => {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);
    };

    // Preconnect to Google Play domains
    const preconnectDomains = () => {
      const domains = [
        'https://lh3.googleusercontent.com',
        'https://play.google.com'
      ];
      
      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Lazy load images
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
      
      const updateScrollPosition = () => {
        // Add any scroll-based optimizations here
        ticking = false;
      };

      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', requestTick);
      };
    };

    // Initialize optimizations
    preloadFonts();
    preconnectDomains();
    
    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        lazyLoadImages();
        optimizeScroll();
      });
    } else {
      lazyLoadImages();
      optimizeScroll();
    }
  }, []);

  return null;
}
