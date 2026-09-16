import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable for desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, '--cursor-x', { duration: 0.22, ease: 'power3.out', unit: 'px' });
    const yTo = gsap.quickTo(cursor, '--cursor-y', { duration: 0.22, ease: 'power3.out', unit: 'px' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest('a, button, input, textarea, .project-card, [role="button"]');
      if (interactiveEl) {
        document.body.classList.add('cursor-link');
      } else {
        document.body.classList.remove('cursor-link');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-link');
    };
  }, []);

  return (
    <div className="scroll-cursor" ref={cursorRef} aria-hidden="true">
      <span>Scroll</span>
    </div>
  );
};