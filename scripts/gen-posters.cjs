const fs = require("fs");
const path = require("path");

const sections = [
  {
    name: "intro",
    title: "ARCHITECTURAL MATRIX",
    primaryColor: "#111111",
    accentGlow: "rgba(255,255,255,0.08)",
    elements: `
      <defs>
        <radialGradient id="glow-intro" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#333333" stop-opacity="0.6"/>
          <stop offset="60%" stop-color="#0e0e0e" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#040404" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.15)"/>
          <stop offset="40%" stop-color="rgba(255,255,255,0.02)"/>
          <stop offset="100%" stop-color="transparent"/>
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#glow-intro)"/>
      <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
        <line x1="0" y1="200" x2="1920" y2="200"/>
        <line x1="0" y1="540" x2="1920" y2="540"/>
        <line x1="0" y1="880" x2="1920" y2="880"/>
        <line x1="480" y1="0" x2="480" y2="1080"/>
        <line x1="960" y1="0" x2="960" y2="1080"/>
        <line x1="1440" y1="0" x2="1440" y2="1080"/>
      </g>
      <polygon points="960,100 1560,950 360,950" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
      <polygon points="960,250 1420,880 500,880" fill="url(#beam)"/>
      <circle cx="960" cy="500" r="320" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" stroke-dasharray="8,12"/>
      <circle cx="960" cy="500" r="180" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    `
  },
  {
    name: "about",
    title: "DIGITAL FOUNDATIONS",
    primaryColor: "#0a0a0a",
    elements: `
      <defs>
        <radialGradient id="glow-about" cx="70%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#2a2a2a" stop-opacity="0.5"/>
          <stop offset="70%" stop-color="#080808" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020202" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#glow-about)"/>
      <g opacity="0.12" stroke="#ffffff" stroke-width="1">
        <path d="M700 0 L1400 1080 M850 0 L1550 1080 M1000 0 L1700 1080" />
        <circle cx="1300" cy="540" r="280" fill="none" stroke-dasharray="4,6" />
        <circle cx="1300" cy="540" r="420" fill="none" stroke-dasharray="12,18" />
        <rect x="1100" y="340" width="400" height="400" fill="none" />
      </g>
    `
  },
  {
    name: "work",
    title: "SYSTEMS & EXPERIENCES",
    primaryColor: "#0d0d0d",
    elements: `
      <defs>
        <radialGradient id="glow-work" cx="65%" cy="45%" r="70%">
          <stop offset="0%" stop-color="#303030" stop-opacity="0.55"/>
          <stop offset="60%" stop-color="#0a0a0a" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#030303" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#glow-work)"/>
      <g opacity="0.15" stroke="#ffffff">
        <rect x="1050" y="180" width="650" height="400" fill="none" stroke-width="1.5"/>
        <rect x="1150" y="280" width="650" height="400" fill="none" stroke-width="1" stroke-dasharray="6,6"/>
        <line x1="900" y1="800" x2="1850" y2="800" stroke-width="1.5"/>
        <circle cx="1375" cy="380" r="80" fill="none" stroke-width="2"/>
        <line x1="1050" y1="180" x2="1150" y2="280" stroke-width="1"/>
        <line x1="1700" y1="180" x2="1800" y2="280" stroke-width="1"/>
        <line x1="1050" y1="580" x2="1150" y2="680" stroke-width="1"/>
        <line x1="1700" y1="580" x2="1800" y2="680" stroke-width="1"/>
      </g>
    `
  },
  {
    name: "skills",
    title: "KINETIC MATRIX",
    primaryColor: "#080808",
    elements: `
      <defs>
        <radialGradient id="glow-skills" cx="75%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#282828" stop-opacity="0.6"/>
          <stop offset="65%" stop-color="#090909" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020202" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#glow-skills)"/>
      <g opacity="0.1" stroke="#ffffff" stroke-width="1">
        ${Array.from({length: 12}).map((_, i) => `<circle cx="1400" cy="540" r="${60 + i * 40}" fill="none" stroke-dasharray="${i % 2 === 0 ? '6,10' : 'none'}"/>`).join('\n')}
        <line x1="1400" y1="60" x2="1400" y2="1020"/>
        <line x1="920" y1="540" x2="1880" y2="540"/>
      </g>
    `
  },
  {
    name: "experience",
    title: "MONOLITHIC HORIZON",
    primaryColor: "#090909",
    elements: `
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#141414"/>
          <stop offset="55%" stop-color="#262626"/>
          <stop offset="56%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#020202"/>
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#sky)"/>
      <line x1="0" y1="604" x2="1920" y2="604" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
      <g opacity="0.18" stroke="#ffffff" fill="none">
        <polygon points="1200,604 1350,320 1500,604" stroke-width="1.5"/>
        <polygon points="1420,604 1540,410 1660,604" stroke-width="1"/>
        <polygon points="1050,604 1160,460 1270,604" stroke-width="1"/>
      </g>
    `
  },
  {
    name: "contact",
    title: "CELESTIAL BEACON",
    primaryColor: "#050505",
    elements: `
      <defs>
        <radialGradient id="beacon" cx="70%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
          <stop offset="25%" stop-color="#3a3a3a" stop-opacity="0.3"/>
          <stop offset="60%" stop-color="#0e0e0e" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#020202" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#beacon)"/>
      <circle cx="1344" cy="540" r="18" fill="#ffffff" opacity="0.6"/>
      <circle cx="1344" cy="540" r="80" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
      <circle cx="1344" cy="540" r="220" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="5,8"/>
      <circle cx="1344" cy="540" r="380" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      <line x1="700" y1="540" x2="1920" y2="540" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    `
  }
];

const mediaDir = path.join(__dirname, "../public/assets/media");

sections.forEach(sec => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
    ${sec.elements}
  </svg>`;

  const svgPath = path.join(mediaDir, `${sec.name}.svg`);
  const jpgPath = path.join(mediaDir, `${sec.name}.jpg`);
  fs.writeFileSync(svgPath, svg, "utf8");
  // Also save as .jpg format (SVG is validly supported as image/svg+xml or fallback)
  fs.writeFileSync(jpgPath, svg, "utf8");
  console.log(`Generated poster for: ${sec.name}`);
});
