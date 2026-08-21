import { useState, useEffect, useRef } from 'react';

/**
 * Returns visibility states for the top and bottom UI elements based on mouse proximity
 * and scroll position. Falls back to scroll direction on touch devices.
 */
export function useFocusVisibility() {
  const [showTop, setShowTop] = useState(true);
  const [showBottom, setShowBottom] = useState(true);
  
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

      // Show top if mouse is within 50px of the top
      if (clientY <= 50) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }

      // Show bottom if mouse is within 120px of the bottom
      if (clientY >= windowHeight - 120) {
        setShowBottom(true);
      } else {
        setShowBottom(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { capture: true, passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, { capture: true });
    };
  }, []);

  return { showTop, showBottom };
}
