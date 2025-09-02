"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook to handle hydration mismatches caused by browser extensions
 * that modify the DOM before React hydrates
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after the component mounts on the client
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
