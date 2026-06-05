/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPos, setTrailingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const trailingRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Smooth lagging trailing cursor loop
  useEffect(() => {
    let animFrameId: number;
    
    const updateTrailing = () => {
      const dx = position.x - trailingRef.current.x;
      const dy = position.y - trailingRef.current.y;
      
      // Interpolate with exponential decay for a smooth elastic lag
      trailingRef.current.x += dx * 0.14;
      trailingRef.current.y += dy * 0.14;
      
      setTrailingPos({ x: trailingRef.current.x, y: trailingRef.current.y });
      animFrameId = requestAnimationFrame(updateTrailing);
    };

    animFrameId = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animFrameId);
  }, [position]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(clickable);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Outer Glow Tracer Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/40 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-all duration-150 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})`,
          boxShadow: isHovering ? '0 0 12px rgba(6, 182, 212, 0.45)' : 'none',
          borderColor: isHovering ? 'rgba(212, 175, 55, 0.8)' : 'rgba(6, 182, 212, 0.4)',
        }}
      />
      {/* Inner Pinpoint Amber Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
