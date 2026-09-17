const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/media/intro.jpg");
const content = fs.readFileSync(file, "utf8");
console.log("Start of intro.jpg:", content.slice(0, 60));
