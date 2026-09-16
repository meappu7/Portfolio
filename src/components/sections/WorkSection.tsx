import React from 'react';
import { PROJECTS } from '../../data/portfolioData';

interface WorkSectionProps {
  isActive: boolean;
  onOpenProject?: (id: string) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ isActive }) => {
  return (
    <section
      className={`panel panel--content ${isActive ? 'is-active' : ''}`}
      id="work"
      data-index="2"
      aria-labelledby="work-title"
    >
      <div className="content-panel panel-copy">
        <p className="section-kicker"><span>02</span> Selected Works</p>
        
        <div className="heading-mask-wrapper">
          <h2 id="work-title" className="section-heading">Crafted for Impact</h2>
        </div>

        <p>
          A selection of engineered web applications, real-time audio-visual systems, and component architectures built with uncompromising performance.
        </p>

        <div className="project-list">
          {PROJECTS.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card-header">
                <span className="project-card-num">PROJECT {project.number}</span>
                <span className="project-card-year">{project.year}</span>
              </div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-subtitle">{project.subtitle}</p>
              <p className="project-card-desc">{project.description}</p>
              <div className="project-tech-tags">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
