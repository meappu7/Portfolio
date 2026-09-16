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
      </div>
    </section>
  );
};
