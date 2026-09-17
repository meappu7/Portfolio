import React from 'react';

interface AboutSectionProps {
  isActive: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isActive }) => {
  return (
    <section
      className={`panel panel--content ${isActive ? 'is-active' : ''}`}
      id="about"
      data-index="1"
      aria-labelledby="about-title"
    >
      <div className="content-panel panel-copy">
        <p className="section-kicker"><span>01</span> About & Philosophy</p>
        
        <div className="heading-mask-wrapper">
          <h2 id="about-title" className="section-heading">Digital Experiences with Substance</h2>
        </div>

        <p>
          I am a creative developer and technical architect who bridges the gap between engineering rigor and cinematic storytelling. For me, exceptional software doesn't start with arbitrary syntax—it starts with an obsession for how a digital environment feels, breathes, and responds to human touch.
        </p>
        <p>
          I specialize in building immersive web platforms, real-time WebGL graphics, and resilient distributed frontends. Every animation, easing curve, and shader is calibrated with purpose—never gratuitous, always intentional.
        </p>
        <p>
          Modern engineering also demands intelligent automation. I integrate LLM-driven pipelines and autonomous workflow architectures that strip away friction, automate complexity behind the scenes, and maintain blazing fast 60fps rendering in the viewport.
        </p>
        <p>
          Technology can be sophisticated and immensely complex under the hood. For the human on the other side of the glass, it should feel intuitive, effortless, and impossible to forget.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem',
          padding: '1rem 1.25rem',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '0.85rem',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)'
        }}>
          <img
            src="/assets/images/anfil.png"
            alt="Anfil"
            style={{
              width: '3.8rem',
              height: '3.8rem',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              border: '1px solid rgba(255,255,255,0.25)',
              filter: 'grayscale(1) contrast(1.1) brightness(0.95)'
            }}
          />
          <div>
            <strong style={{ display: 'block', color: '#fff', fontSize: '0.92rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Anfil</strong>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)' }}>Creative Developer & Technical Architect</span>
          </div>
        </div>
      </div>
    </section>
  );
};
