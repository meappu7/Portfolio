const fs = require("fs");
const path = require("path");

const heroPngPath = path.join(__dirname, "../public/assets/images/anfil_hero.png");
const heroBase64 = fs.readFileSync(heroPngPath).toString("base64");
const heroDataUri = `data:image/png;base64,${heroBase64}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="hero-vignette" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#2a2a2a" stop-opacity="0.2"/>
      <stop offset="55%" stop-color="#0e0e0e" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#040404" stop-opacity="0.95"/>
    </radialGradient>
    <linearGradient id="hero-bottom-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="40%" stop-color="transparent"/>
      <stop offset="85%" stop-color="#080808" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="1"/>
    </linearGradient>
    <filter id="hero-monochrome" x="0" y="0" width="100%" height="100%">
      <feColorMatrix type="matrix" values="
        0.33 0.33 0.33 0 0
        0.33 0.33 0.33 0 0
        0.33 0.33 0.33 0 0
        0    0    0    1 0
      "/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.05" intercept="-0.02"/>
        <feFuncG type="linear" slope="1.05" intercept="-0.02"/>
        <feFuncB type="linear" slope="1.05" intercept="-0.02"/>
      </feComponentTransfer>
    </filter>
  </defs>

  <!-- Dark base -->
  <rect width="1920" height="1080" fill="#080808"/>

  <!-- Anfil Hero Double-Exposure Portrait -->
  <g filter="url(#hero-monochrome)">
    <image
      href="${heroDataUri}"
      x="0"
      y="0"
      width="1920"
      height="1080"
      preserveAspectRatio="xMidYMid slice"
    />
  </g>

  <!-- Vignette & Bottom Shade for text contrast -->
  <rect width="1920" height="1080" fill="url(#hero-vignette)"/>
  <rect width="1920" height="1080" fill="url(#hero-bottom-shade)"/>
</svg>`;

const mediaDir = path.join(__dirname, "../public/assets/media");
fs.writeFileSync(path.join(mediaDir, "intro.svg"), svg, "utf8");
fs.writeFileSync(path.join(mediaDir, "intro.jpg"), svg, "utf8");
console.log("Successfully updated intro poster with Anfil's double-exposure hero image!");
