const path = require("path");
const fs = require("fs");

const candidates = [
  path.resolve(process.cwd(), "node_modules", "@netlify", "plugin-nextjs"),
  path.resolve(
    process.cwd(),
    ".netlify",
    "plugins",
    "node_modules",
    "@netlify",
    "plugin-nextjs",
  ),
  path.resolve(__dirname, "node_modules", "@netlify", "plugin-nextjs"),
];

let pluginPath = candidates.find((p) =>
  fs.existsSync(path.join(p, "index.js")),
);
if (!pluginPath) {
  try {
    pluginPath = require.resolve("@netlify/plugin-nextjs");
  } catch (_) {
    throw new Error(
      "Cannot find @netlify/plugin-nextjs. Tried: " + candidates.join(", "),
    );
  }
}

module.exports = require(pluginPath);
