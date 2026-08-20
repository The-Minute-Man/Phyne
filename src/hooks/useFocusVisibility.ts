import { useState, useEffect, useRef } from 'react';

/**
 * Returns visibility states for the top and bottom UI elements based on mouse proximity
 * and scroll position. Falls back to scroll direction on touch devices.
 */
export function useFocusVisibility() {
  const [showTop, setShowTop] = useState(true);
  const [showBottom, setShowBottom] = useState(true);
  
  const lastScrollY = useRef(0);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Detect if the device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    isTouchDevice.current = !mediaQuery.matches;

    // --- MOUSE LOGIC ---
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice.current) return;
      
      const { clientY } = e;
      const windowHeight = window.innerHeight;

      // Show top if mouse is within 120px of the top
      if (clientY <= 120) {
        setShowTop(true);
      } else {
        // Only hide if we are not at the absolute top of the document
        if (window.scrollY > 50) {
          setShowTop(false);
        }
      }

      // Show bottom if mouse is within 120px of the bottom
      if (clientY >= windowHeight - 120) {
        setShowBottom(true);
      } else {
        // Only hide if we are not at the absolute bottom of the document
        if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 50) {
          setShowBottom(false);
        }
      }
    };

    // --- SCROLL LOGIC (Fallback & Absolute positioning) ---
    let ticking = false;
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!isTouchDevice.current) {
        // Desktop logic: only care about absolute top/bottom overrides
        if (scrollY <= 50) setShowTop(true);
        if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) setShowBottom(true);
      } else {
        // Mobile fallback logic: scroll direction
        if (Math.abs(scrollY - lastScrollY.current) < 5) {
          ticking = false;
          return;
        }

        if (scrollY <= 50) {
          setShowTop(true);
          setShowBottom(true);
        } else if (scrollY > lastScrollY.current) {
          // Scrolling down
          setShowTop(false);
          setShowBottom(false);
        } else if (scrollY < lastScrollY.current) {
          // Scrolling up
          setShowTop(true);
          setShowBottom(true);
        }

        if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
          setShowBottom(true);
        }
      }

      lastScrollY.current = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    lastScrollY.current = window.scrollY;
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { showTop, showBottom };
}
