import React from 'react';

interface SectionControlsProps {
  currentIndex: number;
  totalSections: number;
  onPrev: () => void;
  onNext: () => void;
}

export const SectionControls: React.FC<SectionControlsProps> = ({
  currentIndex,
  totalSections,
  onPrev,
  onNext
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;
  const progressRatio = totalSections > 1 ? currentIndex / (totalSections - 1) : 0;

  return (
    <div className="section-controls" aria-label="Section Navigation Controls">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous Section"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="section-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progressRatio})` }} />
      </div>

      <div className="section-counter" aria-hidden="true">
        0{currentIndex + 1} / 0{totalSections}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        aria-label="Next Section"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};
