import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_WORDS } from '../../data/portfolioData';

interface IntroSectionProps {
  isActive: boolean;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ isActive }) => {
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (words.length === 0) return;

    // Build timeline
    const tl = gsap.timeline({ repeat: -1, paused: !isActive });

    words.forEach((word, index) => {
      const nextWord = words[(index + 1) % words.length];

      tl.to(word, {
        yPercent: -120,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.inOut',
        delay: 3.8
      })
      .fromTo(
        nextWord,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.inOut'
        },
        '<0.1'
      );
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  // When section becomes active, reset to initial word and play timeline from start
  useEffect(() => {
    const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (words.length === 0 || !timelineRef.current) return;

    if (isActive) {
      // Reset all words
      gsap.set(words, { yPercent: 120, opacity: 0 });
      gsap.set(words[0], { yPercent: 0, opacity: 1 });
      timelineRef.current.restart();
    } else {
      timelineRef.current.pause();
    }
  }, [isActive]);

  return (
    <section
      className={`panel panel--intro ${isActive ? 'is-active' : ''}`}
      id="intro"
      data-index="0"
      aria-labelledby="intro-title"
    >
      <div className="intro-copy panel-copy">
        <h1 className="intro-subline">
          <strong>Anfil</strong>
          <span>Creative Developer & Technical Architect</span>
        </h1>

        <h2 className="hero-title" id="intro-title" aria-label="Design. Develop. Deliver.">
          <span className="hero-word-window" aria-hidden="true">
            {HERO_WORDS.map((word, idx) => (
              <span
                key={word}
                ref={(el) => (wordsRef.current[idx] = el)}
                className={`hero-word ${idx === 0 ? 'is-current' : ''}`}
              >
                {word}
              </span>
            ))}
          </span>
        </h2>
      </div>
    </section>
  );
};
