import React, { useEffect } from 'react';
import { IMPRESSUM_CONTENT, PRIVACY_CONTENT } from '../data/legalData';

interface LegalModalProps {
  type: 'impressum' | 'privacy' | 'none';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const isOpen = type !== 'none';
  const content = type === 'impressum' ? IMPRESSUM_CONTENT : PRIVACY_CONTENT;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal-layer ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true">
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close dialog" />

      <article className="modal-card" tabIndex={-1}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close dialog">
          Close ✕
        </button>

        <p className="modal-kicker">{content.kicker}</p>
        <h2>{content.title}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
          {content.sections.map((sec, idx) => (
            <div key={idx}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.6rem', fontFamily: '"Anton", sans-serif' }}>
                {sec.heading}
              </h3>
              {sec.body.map((p, pIdx) => (
                <p key={pIdx} style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '0.5rem' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};
