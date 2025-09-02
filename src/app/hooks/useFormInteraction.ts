"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when user starts interacting with a form
 * This helps prevent auto-fill from being visible until user interaction
 */
export function useFormInteraction() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleInteraction = () => {
      setHasInteracted(true);
    };

    // Listen for various interaction events
    const events = ['focus', 'input', 'change', 'click', 'keydown'];
    
    events.forEach(event => {
      form.addEventListener(event, handleInteraction, { capture: true });
    });

    return () => {
      events.forEach(event => {
        form.removeEventListener(event, handleInteraction, { capture: true });
      });
    };
  }, []);

  return { hasInteracted, formRef };
}
