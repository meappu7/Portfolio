import React from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

interface SkillsSectionProps {
  isActive: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isActive }) => {
  return (
    <section
      className={`panel panel--content ${isActive ? 'is-active' : ''}`}
      id="skills"
      data-index="3"
      aria-labelledby="skills-title"
    >
      <div className="content-panel panel-copy">
        <p className="section-kicker"><span>03</span> Capabilities & Toolkit</p>
        
        <div className="heading-mask-wrapper">
          <h2 id="skills-title" className="section-heading">Architectural Disciplines</h2>
        </div>

        <p>
          Mastery across the complete modern creative-engineering lifecycle—from mathematical canvas graphics to high-throughput cloud infrastructure.
        </p>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="skill-category-card">
              <h3 className="skill-category-title">{cat.title}</h3>
              <p className="skill-category-desc">{cat.description}</p>
              <div className="skill-items-list">
                {cat.skills.map((s) => (
                  <div key={s.name} className="skill-item-badge">
                    {s.name}
                    {s.level && <span>• {s.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
