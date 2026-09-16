import React from 'react';
import { SectionMeta } from '../types';

interface TopbarProps {
  sections: SectionMeta[];
  currentSectionIndex: number;
  onNavigate: (index: number) => void;
  onOpenContact: () => void;
  onOpenAudit: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  sections,
  currentSectionIndex,
  onNavigate,
  onOpenContact,
  onOpenAudit,
  onToggleMobileMenu,
  isMobileMenuOpen
}) => {
  return (
    <header className="topbar">
      {/* Monogram Logo */}
      <a
        className="home-mark"
        href="#intro"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(0);
        }}
        aria-label="Back to Intro"
      >
        <span>AP</span>
      </a>

      {/* Center Glass Navigation Pill */}
      <nav className="site-nav" id="site-nav" aria-label="Main Navigation">
        {sections.slice(1).map((sec) => {
          const isActive = currentSectionIndex === sec.index;
          return (
            <button
              key={sec.id}
              type="button"
              className={isActive ? 'is-active' : ''}
              onClick={() => onNavigate(sec.index)}
              aria-current={isActive ? 'page' : undefined}
            >
              {sec.label}
            </button>
          );
        })}
      </nav>

      {/* Header Actions (Desktop) */}
      <div className="header-actions">
        <button
          type="button"
          className="audit-button"
          onClick={onOpenAudit}
          aria-label="Open Performance Diagnostic"
        >
          <span>Architecture Audit</span>
        </button>

        <button
          type="button"
          className="contact-button"
          onClick={onOpenContact}
          aria-label="Open Contact Modal"
        >
          <span>Let's Talk</span>
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="menu-toggle"
        type="button"
        onClick={onToggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isMobileMenuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>
    </header>
  );
};
