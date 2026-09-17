const fs = require("fs");
const path = require("path");

const anfilPngPath = path.join(__dirname, "../public/assets/images/anfil.png");
const anfilBase64 = fs.readFileSync(anfilPngPath).toString("base64");
const anfilDataUri = `data:image/png;base64,${anfilBase64}`;

const sections = [
  {
    name: "intro",
    glow: `
      <radialGradient id="spotlight-intro" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#383838" stop-opacity="0.65"/>
        <stop offset="50%" stop-color="#121212" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="vignette-bottom" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="70%" stop-color="transparent"/>
        <stop offset="100%" stop-color="#080808"/>
      </linearGradient>
    `,
    backgroundElements: `
      <rect width="1920" height="1080" fill="url(#spotlight-intro)"/>
      <g stroke="rgba(255,255,255,0.035)" stroke-width="1">
        <line x1="0" y1="270" x2="1920" y2="270"/>
        <line x1="0" y1="540" x2="1920" y2="540"/>
        <line x1="0" y1="810" x2="1920" y2="810"/>
        <line x1="480" y1="0" x2="480" y2="1080"/>
        <line x1="960" y1="0" x2="960" y2="1080"/>
        <line x1="1440" y1="0" x2="1440" y2="1080"/>
      </g>
      <circle cx="960" cy="460" r="380" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1.5" stroke-dasharray="10,14"/>
    `,
    imageX: 585,
    imageY: 80,
    imageW: 750,
    imageH: 1000
  },
  {
    name: "about",
    glow: `
      <radialGradient id="spotlight-about" cx="72%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#333333" stop-opacity="0.6"/>
        <stop offset="60%" stop-color="#0e0e0e" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
      </radialGradient>
    `,
    backgroundElements: `
      <rect width="1920" height="1080" fill="url(#spotlight-about)"/>
      <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
        <circle cx="1400" cy="500" r="300" fill="none" stroke-dasharray="6,8"/>
        <circle cx="1400" cy="500" r="450" fill="none" stroke-dasharray="12,16"/>
        <line x1="850" y1="0" x2="1750" y2="1080"/>
      </g>
    `,
    imageX: 1050,
    imageY: 100,
    imageW: 740,
    imageH: 980
  },
  {
    name: "work",
    glow: `
      <radialGradient id="spotlight-work" cx="70%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#3a3a3a" stop-opacity="0.65"/>
        <stop offset="60%" stop-color="#101010" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
      </radialGradient>
    `,
    backgroundElements: `
      <rect width="1920" height="1080" fill="url(#spotlight-work)"/>
      <g stroke="rgba(255,255,255,0.045)" stroke-width="1.5">
        <rect x="1000" y="180" width="700" height="450" fill="none"/>
        <rect x="1100" y="280" width="700" height="450" fill="none" stroke-dasharray="8,8"/>
      </g>
    `,
    imageX: 1060,
    imageY: 90,
    imageW: 740,
    imageH: 990
  },
  {
    name: "skills",
    glow: `
      <radialGradient id="spotlight-skills" cx="74%" cy="48%" r="55%">
        <stop offset="0%" stop-color="#303030" stop-opacity="0.6"/>
        <stop offset="60%" stop-color="#0c0c0c" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
      </radialGradient>
    `,
    backgroundElements: `
      <rect width="1920" height="1080" fill="url(#spotlight-skills)"/>
      <g stroke="rgba(255,255,255,0.035)" stroke-width="1">
        ${Array.from({ length: 8 }).map((_, i) => `<circle cx="1420" cy="520" r="${100 + i * 50}" fill="none" stroke-dasharray="${i % 2 === 0 ? '6,10' : 'none'}"/>`).join('\n')}
      </g>
    `,
    imageX: 1090,
    imageY: 110,
    imageW: 720,
    imageH: 970
  },
  {
    name: "experience",
    glow: `
      <radialGradient id="spotlight-experience" cx="72%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#343434" stop-opacity="0.6"/>
        <stop offset="60%" stop-color="#0e0e0e" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#040404" stop-opacity="1"/>
      </radialGradient>
    `,
    backgroundElements: `
      <rect width="1920" height="1080" fill="url(#spotlight-experience)"/>
      <line x1="0" y1="620" x2="1920" y2="620" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <polygon points="1150,620 1350,300 1550,620" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5"/>
    `,
    imageX: 1070,
    imageY: 100,
    imageW: 730,
    imageH: 980
  },
  {
    name: "contact",
    glow: `
      <radialGradient id="spotlight-contact" cx="68%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#3c3c3c" stop-opacity="0.65"/>
        <stop offset="60%" stop-color="#111111" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#030303" stop-opacity="1"/>
      </radialGradient>
    `,
    backgroundElements: `
      <rect width="1920" height="1080" fill="url(#spotlight-contact)"/>
      <circle cx="1340" cy="500" r="260" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6,8"/>
    `,
    imageX: 980,
    imageY: 90,
    imageW: 750,
    imageH: 990
  }
];

const mediaDir = path.join(__dirname, "../public/assets/media");

sections.forEach(sec => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" width="1920" height="1080">
    <defs>
      ${sec.glow}
      <filter id="cinematic-portrait" x="-10%" y="-10%" width="120%" height="120%">
        <!-- Desaturate to pure black & white, boost contrast and clarity -->
        <feColorMatrix type="matrix" values="
          0.33 0.33 0.33 0 0
          0.33 0.33 0.33 0 0
          0.33 0.33 0.33 0 0
          0    0    0    1 0
        "/>
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.08" intercept="-0.03"/>
          <feFuncG type="linear" slope="1.08" intercept="-0.03"/>
          <feFuncB type="linear" slope="1.08" intercept="-0.03"/>
        </feComponentTransfer>
      </filter>
      <!-- Bottom fade gradient to blend seamlessly into the floor -->
      <linearGradient id="bottom-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="80%" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="98%" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <mask id="fade-mask">
        <rect x="0" y="0" width="1920" height="1080" fill="url(#bottom-fade)"/>
      </mask>
    </defs>

    ${sec.backgroundElements}

    <!-- Anfil Portrait Layer -->
    <g mask="url(#fade-mask)" filter="url(#cinematic-portrait)">
      <image
        href="${anfilDataUri}"
        x="${sec.imageX}"
        y="${sec.imageY}"
        width="${sec.imageW}"
        height="${sec.imageH}"
        preserveAspectRatio="xMidYMid meet"
      />
    </g>

    <!-- Floor vignette -->
    <rect x="0" y="920" width="1920" height="160" fill="url(#vignette-bottom)" opacity="0.9"/>
  </svg>`;

  const svgPath = path.join(mediaDir, `${sec.name}.svg`);
  const jpgPath = path.join(mediaDir, `${sec.name}.jpg`);

  fs.writeFileSync(svgPath, svg, "utf8");
  fs.writeFileSync(jpgPath, svg, "utf8");
  console.log(`Generated self-contained cinematic portrait poster: ${sec.name}`);
});
