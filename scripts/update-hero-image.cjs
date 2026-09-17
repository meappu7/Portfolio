const fs = require("fs");
const path = require("path");

const heroSrc = "C:/Users/DELL UZER/.gemini/antigravity/brain/141a65c7-8681-4b16-b164-e4dc2a5e3477/.user_uploaded/media_1789648471537.png";
const heroDest = path.join(__dirname, "../public/assets/images/anfil_hero.png");

fs.copyFileSync(heroSrc, heroDest);
const buf = fs.readFileSync(heroDest);
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log("Hero Image copied successfully:", width, "x", height, "size:", (buf.length / 1024 / 1024).toFixed(2), "MB");
