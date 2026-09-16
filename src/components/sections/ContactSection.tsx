import React from 'react';
import { SOCIAL_LINKS } from '../../data/portfolioData';

interface ContactSectionProps {
  isActive: boolean;
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isActive, onOpenContactModal }) => {
  return (
    <section
      className={`panel panel--content ${isActive ? 'is-active' : ''}`}
      id="contact"
      data-index="5"
      aria-labelledby="contact-title"
    >
      <div className="content-panel panel-copy">
        <p className="section-kicker"><span>05</span> Communication</p>
        
        <div className="heading-mask-wrapper">
          <h2 id="contact-title" className="section-heading">Let's Build Something Worth Remembering</h2>
        </div>

        <p>
          Available for select client projects, advisory roles, technical architecture consulting, and creative engineering collaborations.
        </p>

        <div className="contact-actions">
          <button
            type="button"
            className="editorial-cta"
            onClick={onOpenContactModal}
            aria-label="Initiate conversation"
          >
            <span>Let's Talk</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <div className="contact-channels">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-link"
              >
                <span>{item.label}</span>
                <span style={{ fontFamily: 'monospace', opacity: 0.65 }}>{item.username} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
