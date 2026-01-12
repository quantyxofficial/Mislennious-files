import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values for raw mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Bouncy Spring Physics (Apple Feel)
  // High stiffness + lower damping = "Bouncy" but precise
  const springConfig = { damping: 28, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target is interactive
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[data-hover]') ||
        target.tagName === 'INPUT' ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isInteractive);

      // Smart Dark Mode Detection
      // Checks if the hovered element or its parents have specific dark classes or IDs (like the footer)
      const contactSection = target.closest('#contact');
      const darkElement = target.closest('.bg-lux-text') || target.closest('.bg-black') || window.getComputedStyle(target).backgroundColor === 'rgb(28, 25, 23)';
      
      if (contactSection || darkElement) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Colors
  // Light Mode (Default): Solid Black Dot, Grey Ring
  // Dark Mode (Footer): Solid White Dot, White Ring
  const dotColor = isDark ? '#FFFFFF' : '#000000';
  
  // Hover State
  // Light Mode: Black Border, Transparent Fill
  // Dark Mode: White Border, Transparent Fill
  const ringBorderColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
  const ringActiveBorder = isDark ? '#FFFFFF' : '#000000';
  
  return (
    <>
      {/* Main Cursor Dot - Solid Color (No Mix Blend) */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[99999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: dotColor,
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 0 : 1), // Dot hides smoothly on hover
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Outer Ring - Dynamic */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[99998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.9 : (isHovering ? 2 : 1),
          borderWidth: isHovering ? '1.5px' : '1px',
          borderColor: isHovering ? ringActiveBorder : ringBorderColor,
          backgroundColor: 'transparent', // Kept transparent for clean "Apple" look
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28 // Bouncy but controlled
        }}
      />
    </>
  );
};