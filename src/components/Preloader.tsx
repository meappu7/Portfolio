import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3;
      if (progress >= 100) {
        progress = 100;
        setPercent(100);
        clearInterval(interval);

        // Exit animation
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.05,
              filter: 'blur(10px)',
              duration: 0.85,
              ease: 'power3.inOut',
              onComplete: () => {
                document.body.classList.remove('is-loading');
                onComplete();
              }
            });
          }
        }, 300);
      } else {
        setPercent(progress);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Update needle position
  useEffect(() => {
    if (needleRef.current && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const x = (percent / 100) * trackWidth;
      gsap.to(needleRef.current, {
        x,
        duration: 0.1,
        ease: 'power1.out'
      });
    }
  }, [percent]);

  const totalSegments = 20;

  return (
    <div className="preloader" ref={containerRef} role="status" aria-live="polite" aria-label="Experience initializing">
      <div className="preloader-glass">
        <div className="meter-heading">
          <span>Initializing Experience</span>
          <strong id="load-percentage">{percent}%</strong>
        </div>

        <div className="vu-meter" aria-hidden="true">
          <div className="vu-labels">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span className="danger-label">85%</span>
            <span>100%</span>
          </div>

          <div className="vu-track" ref={trackRef}>
            {Array.from({ length: totalSegments }).map((_, i) => {
              const segThreshold = ((i + 1) / totalSegments) * 100;
              const isActive = percent >= segThreshold;
              const isDanger = i >= 16;
              return (
                <div
                  key={i}
                  className={`vu-segment ${isActive ? 'is-active' : ''} ${isDanger ? 'is-danger' : ''}`}
                />
              );
            })}
          </div>

          <div className="vu-needle" ref={needleRef} />
        </div>
      </div>
    </div>
  );
};
