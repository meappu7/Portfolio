import React from 'react';
import { SectionMeta } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  sections: SectionMeta[];
  currentSectionIndex: number;
  onSelectSection: (index: number) => void;
  onClose: () => void;
  onOpenContact: () => void;
  onOpenAudit: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  sections,
  currentSectionIndex,
  onSelectSection,
  onClose,
  onOpenContact,
  onOpenAudit
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobile-menu-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`mobile-menu-drawer ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-menu-links">
          {sections.map((sec) => {
            const isActive = currentSectionIndex === sec.index;
            return (
              <button
                key={sec.id}
                type="button"
                className={`mobile-menu-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  onSelectSection(sec.index);
                  onClose();
                }}
              >
                <span>{sec.kickerNumber}</span>
                {sec.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
          <button
            type="button"
            className="audit-button"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              onClose();
              onOpenAudit();
            }}
          >
            Architecture Audit
          </button>
          <button
            type="button"
            className="contact-button"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              onClose();
              onOpenContact();
            }}
          >
            Let's Talk →
          </button>
        </div>
      </div>
    </>
  );
};
