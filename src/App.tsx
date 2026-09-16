import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { SECTIONS } from './data/portfolioData';
import { ActiveModal } from './types';
import { Preloader } from './components/Preloader';
import { VideoStage } from './components/VideoStage';
import { Topbar } from './components/Topbar';
import { MobileMenu } from './components/MobileMenu';
import { SectionControls } from './components/SectionControls';
import { CustomCursor } from './components/CustomCursor';
import { LegalModal } from './components/LegalModal';
import { ContactModal } from './components/ContactModal';
import { TechAuditModal } from './components/TechAuditModal';

import { IntroSection } from './components/sections/IntroSection';
import { AboutSection } from './components/sections/AboutSection';
import { WorkSection } from './components/sections/WorkSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';

export const App: React.FC = () => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAnimatingRef = useRef(false);
  const wipeRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  // Transition controller
  const transitionToSection = useCallback((targetIndex: number) => {
    if (isAnimatingRef.current) return;
    if (targetIndex === currentIndex) return;
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;

    isAnimatingRef.current = true;
    const direction = targetIndex > currentIndex ? 1 : -1;
    const currentPanel = document.getElementById(SECTIONS[currentIndex].id);
    const targetPanel = document.getElementById(SECTIONS[targetIndex].id);

    // Update body attribute for CSS context (e.g. content-shade)
    document.body.setAttribute('data-section', SECTIONS[targetIndex].id);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setCurrentIndex(targetIndex);
        window.history.replaceState(null, '', `#${SECTIONS[targetIndex].id}`);
        isAnimatingRef.current = false;
      }
    });

    // 1. Cinematic Wipe Effect Line
    if (wipeRef.current) {
      tl.fromTo(
        wipeRef.current,
        { left: '-5%', opacity: 0 },
        {
          left: '105%',
          opacity: 1,
          duration: 1.15,
          ease: 'power2.inOut',
          onUpdate: function () {
            // Fade out near edges
            const progress = this.progress();
            if (wipeRef.current) {
              const edgeFade = Math.sin(progress * Math.PI);
              wipeRef.current.style.opacity = `${edgeFade * 0.9}`;
            }
          }
        },
        0
      );
    }

    // 2. Animate out current content
    if (currentPanel) {
      const currentCopy = currentPanel.querySelector('.panel-copy');
      if (currentCopy) {
        tl.to(
          currentCopy,
          {
            y: direction * -35,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.in'
          },
          0
        );
      }
      tl.set(currentPanel, { opacity: 0, visibility: 'hidden', pointerEvents: 'none' }, 0.6);
    }

    // 3. Reveal target panel & animate in new content
    if (targetPanel) {
      tl.set(targetPanel, { opacity: 1, visibility: 'visible', pointerEvents: 'auto' }, 0.55);

      const targetCopy = targetPanel.querySelector('.panel-copy');
      const targetHeading = targetPanel.querySelector('.section-heading');
      const targetKicker = targetPanel.querySelector('.section-kicker');
      const targetParagraphs = targetPanel.querySelectorAll('p:not(.section-kicker), .project-list, .skills-grid, .experience-timeline, .contact-actions');

      if (targetCopy) {
        gsap.set(targetCopy, { opacity: 1, y: 0 });
      }

      if (targetKicker) {
        tl.fromTo(
          targetKicker,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          0.6
        );
      }

      if (targetHeading) {
        tl.fromTo(
          targetHeading,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power4.out' },
          0.68
        );
      }

      if (targetParagraphs.length > 0) {
        tl.fromTo(
          targetParagraphs,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
          0.8
        );
      }
    }
  }, [currentIndex]);

  // Sync with URL Hash on Mount & Hash Changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const matched = SECTIONS.findIndex((s) => s.id === hash);
      if (matched !== -1 && matched !== currentIndex) {
        transitionToSection(matched);
      }
    };

    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, [currentIndex, transitionToSection]);

  // Mouse wheel navigation with debounce and transition lock
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (activeModal !== 'none' || isMobileMenuOpen) return;

      // Check if user is scrolling inside a scrollable content panel
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest('.content-panel') as HTMLElement | null;
      if (scrollable) {
        const canScrollDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 5;
        const canScrollUp = scrollable.scrollTop > 5;

        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return; // Let user scroll inside the content panel
        }
      }

      const now = Date.now();
      if (now - lastWheelTime < 650) return; // Debounce window
      if (Math.abs(e.deltaY) < 25) return; // Threshold

      lastWheelTime = now;
      if (e.deltaY > 0) {
        transitionToSection(currentIndex + 1);
      } else {
        transitionToSection(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, activeModal, isMobileMenuOpen, transitionToSection]);

  // Touch swipe navigation for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (activeModal !== 'none' || isMobileMenuOpen) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      // Ensure not scrolling inner content
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest('.content-panel') as HTMLElement | null;
      if (scrollable) {
        const canScrollDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 10;
        const canScrollUp = scrollable.scrollTop > 10;
        if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
          return;
        }
      }

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          transitionToSection(currentIndex + 1);
        } else {
          transitionToSection(currentIndex - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, activeModal, isMobileMenuOpen, transitionToSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal !== 'none') {
        if (e.key === 'Escape') setActiveModal('none');
        return;
      }

      if (isMobileMenuOpen) {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
          transitionToSection(currentIndex + 1);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          transitionToSection(currentIndex - 1);
          break;
        case 'Home':
          transitionToSection(0);
          break;
        case 'End':
          transitionToSection(SECTIONS.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activeModal, isMobileMenuOpen, transitionToSection]);

  return (
    <div className="site-shell">
      {/* Skip to Content for Accessibility */}
      <a className="skip-link" href="#main-content">Skip to Content</a>

      {/* Cinematic Preloader */}
      {!isPreloaderDone && (
        <Preloader onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* Fullscreen Video & Canvas Stage */}
      <VideoStage
        sections={SECTIONS}
        currentSectionIndex={currentIndex}
        wipeRef={wipeRef}
      />

      {/* Topbar Glass Navigation */}
      <Topbar
        sections={SECTIONS}
        currentSectionIndex={currentIndex}
        onNavigate={transitionToSection}
        onOpenContact={() => setActiveModal('contact')}
        onOpenAudit={() => setActiveModal('techAudit')}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        sections={SECTIONS}
        currentSectionIndex={currentIndex}
        onSelectSection={transitionToSection}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenContact={() => setActiveModal('contact')}
        onOpenAudit={() => setActiveModal('techAudit')}
      />

      {/* Section Viewport Container */}
      <main className="viewport" id="main-content">
        <IntroSection isActive={currentIndex === 0} />
        <AboutSection isActive={currentIndex === 1} />
        <WorkSection isActive={currentIndex === 2} />
        <SkillsSection isActive={currentIndex === 3} />
        <ExperienceSection isActive={currentIndex === 4} />
        <ContactSection
          isActive={currentIndex === 5}
          onOpenContactModal={() => setActiveModal('contact')}
        />
      </main>

      {/* Section Controls (Bottom-Right) */}
      <SectionControls
        currentIndex={currentIndex}
        totalSections={SECTIONS.length}
        onPrev={() => transitionToSection(currentIndex - 1)}
        onNext={() => transitionToSection(currentIndex + 1)}
      />

      {/* Legal & Info Links (Bottom-Left) */}
      <footer className="legal-links" aria-label="Legal information">
        <span>© {new Date().getFullYear()} Anfil P.</span>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => setActiveModal('impressum')}>Impressum</button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => setActiveModal('privacy')}>Datenschutz</button>
      </footer>

      {/* Desktop Custom Glass Cursor */}
      <CustomCursor />

      {/* Modals */}
      <LegalModal
        type={activeModal === 'impressum' ? 'impressum' : activeModal === 'privacy' ? 'privacy' : 'none'}
        onClose={() => setActiveModal('none')}
      />

      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal('none')}
      />

      <TechAuditModal
        isOpen={activeModal === 'techAudit'}
        onClose={() => setActiveModal('none')}
      />
    </div>
  );
};
