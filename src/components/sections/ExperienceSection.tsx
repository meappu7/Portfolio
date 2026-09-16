import React from 'react';
import { EXPERIENCES } from '../../data/portfolioData';

interface ExperienceSectionProps {
  isActive: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isActive }) => {
  return (
    <section
      className={`panel panel--content ${isActive ? 'is-active' : ''}`}
      id="experience"
      data-index="4"
      aria-labelledby="experience-title"
    >
      <div className="content-panel panel-copy">
        <p className="section-kicker"><span>04</span> Journey & Milestones</p>
        
        <div className="heading-mask-wrapper">
          <h2 id="experience-title" className="section-heading">Proven Track Record</h2>
        </div>

        <p>
          Over six years of delivering digital products, creative development, and mission-critical applications across global teams.
        </p>

        <div className="experience-timeline">
          {EXPERIENCES.map((exp) => (
            <div key={exp.company + exp.period} className="experience-item">
              <div className="experience-period">{exp.period}</div>
              <h3 className="experience-role">{exp.role}</h3>
              <div className="experience-company">{exp.company} — {exp.location}</div>
              <p className="experience-desc">{exp.description}</p>
              <ul className="experience-highlights">
                {exp.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
