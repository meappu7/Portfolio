import React, { useEffect, useRef } from 'react';
import { SectionMeta } from '../types';

interface VideoStageProps {
  sections: SectionMeta[];
  currentSectionIndex: number;
  wipeRef: React.RefObject<HTMLDivElement>;
}

export const VideoStage: React.FC<VideoStageProps> = ({
  sections,
  currentSectionIndex,
  wipeRef
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cinematic procedural background animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles/Nodes for subtle atmospheric depth
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.35 + 0.1
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric dark base
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, width, height);

      // Subtle shifting volumetric gradient
      const gradX = width * 0.65 + Math.sin(time) * 60;
      const gradY = height * 0.45 + Math.cos(time * 0.8) * 40;
      const radialGrad = ctx.createRadialGradient(gradX, gradY, 50, gradX, gradY, width * 0.7);
      radialGrad.addColorStop(0, 'rgba(45, 45, 45, 0.32)');
      radialGrad.addColorStop(0.5, 'rgba(15, 15, 15, 0.6)');
      radialGrad.addColorStop(1, 'rgba(4, 4, 4, 0.98)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Render subtle particle matrix
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
        ctx.fill();
      });

      // Render architectural geometry lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const waveY = height * 0.6 + Math.sin(time * 0.5) * 25;
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      ctx.bezierCurveTo(width * 0.35, waveY - 40, width * 0.65, waveY + 40, width, waveY);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="video-stage" aria-hidden="true">
      {/* 60fps Living Cinematic Canvas */}
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Section Posters with Crossfade */}
      {sections.map((section, idx) => {
        const isActive = idx === currentSectionIndex;
        return (
          <img
            key={section.id}
            id={`poster-${section.id}`}
            className={`background-poster ${isActive ? 'is-active' : ''}`}
            src={section.poster}
            alt=""
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        );
      })}

      {/* Visual Treatments */}
      <div className="video-treatment" />
      <div className="content-shade" />
      <div className="grain" />
      <div className="wipe-edge" ref={wipeRef} />
    </div>
  );
};
