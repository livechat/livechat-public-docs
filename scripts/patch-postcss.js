const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");
const rootPostcssPath = path.join(
  repoRoot,
  "node_modules",
  "postcss",
  "lib",
  "postcss.js",
);
const nextPostcssDir = path.join(
  repoRoot,
  "node_modules",
  "next",
  "node_modules",
  "postcss",
);

const sourceMapPaths = [
  path.join(
    repoRoot,
    "node_modules",
    "next",
    "node_modules",
    "source-map",
    "lib",
    "source-map-generator.js",
  ),
  path.join(
    repoRoot,
    "node_modules",
    "source-map",
    "lib",
    "source-map-generator.js",
  ),
  path.join(
    repoRoot,
    "node_modules",
    "postcss",
    "node_modules",
    "source-map",
    "lib",
    "source-map-generator.js",
  ),
];
for (const p of sourceMapPaths) {
  if (fs.existsSync(p)) {
    let sm = fs.readFileSync(p, "utf8");
    let changed = false;
    if (!sm.includes("aOriginal.line >= 0")) {
      sm = sm.replace(
        "aOriginal.line > 0 && aOriginal.column >= 0",
        "aOriginal.line >= 0 && aOriginal.column >= 0",
      );
      changed = true;
    }
    if (!sm.includes("aOriginal.column==null")) {
      sm = sm.replace(
        "aName) {\n    // When aOriginal is truthy but has empty values",
        "aName) { if(aOriginal&&(aOriginal.column==null||aOriginal.column===undefined))aOriginal={line:aOriginal.line,column:0}; // When aOriginal is truthy but has empty values",
      );
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(p, sm);
      console.log(
        "patch-postcss: patched source-map:",
        path.relative(repoRoot, p),
      );
    }
  }
}

const nextSourceMapDistPaths = [
  path.join(
    repoRoot,
    "node_modules",
    "next",
    "node_modules",
    "source-map",
    "dist",
    "source-map.js",
  ),
  path.join(
    repoRoot,
    "node_modules",
    "next",
    "node_modules",
    "source-map",
    "dist",
    "source-map.debug.js",
  ),
];
for (const p of nextSourceMapDistPaths) {
  if (fs.existsSync(p)) {
    let sm = fs.readFileSync(p, "utf8");
    let changed = false;
    if (!sm.includes("aOriginal.line >= 0")) {
      sm = sm.replace(
        "aOriginal.line > 0 && aOriginal.column >= 0\n\t             && aSource",
        "aOriginal.line >= 0 && aOriginal.column >= 0\n\t             && aSource",
      );
      changed = true;
    }
    if (!sm.includes("aOriginal.column==null")) {
      sm = sm.replace(
        "aName) {\n	    // When aOriginal is truthy but has empty values",
        "aName) { if(aOriginal&&(aOriginal.column==null||aOriginal.column===undefined))aOriginal={line:aOriginal.line,column:0}; // When aOriginal is truthy but has empty values",
      );
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(p, sm);
      console.log(
        "patch-postcss: patched source-map dist:",
        path.relative(repoRoot, p),
      );
    }
  }
}

const compiledSourceMap = path.join(
  repoRoot,
  "node_modules",
  "next",
  "dist",
  "compiled",
  "source-map",
  "source-map.js",
);
if (fs.existsSync(compiledSourceMap)) {
  let sm = fs.readFileSync(compiledSourceMap, "utf8");
  const invalidThrow = "}else{throw new Error(";
  const patched = "}else{return;if(0)throw new Error(";
  if (sm.includes(invalidThrow)) {
    sm = sm.split(invalidThrow).join(patched);
    fs.writeFileSync(compiledSourceMap, sm);
    console.log(
      "patch-postcss: patched Next.js compiled source-map (accept invalid CSS mappings)",
    );
  }
}

if (fs.existsSync(nextPostcssDir)) {
  fs.rmSync(nextPostcssDir, { recursive: true });
  console.log(
    "patch-postcss: removed next/node_modules/postcss (using root postcss 7)",
  );
}

if (!fs.existsSync(rootPostcssPath)) {
  console.warn("patch-postcss: root postcss not found, skipping patch");
  process.exit(0);
}

let content = fs.readFileSync(rootPostcssPath, "utf8");

if (content.includes("postcss.Container = _container.default")) {
  console.log("patch-postcss: root postcss already patched");
  process.exit(0);
}

content = content.replace(
  'var _root = _interopRequireDefault(require("./root"));\n\nfunction _interopRequireDefault',
  `var _root = _interopRequireDefault(require("./root"));

var _container = _interopRequireDefault(require("./container"));
var _input = _interopRequireDefault(require("./input"));

function _interopRequireDefault`,
);

content = content.replace(
  "postcss.root = function (defaults) {\n  return new _root.default(defaults);\n};\n\nvar _default = postcss;",
  `postcss.root = function (defaults) {
  return new _root.default(defaults);
};

postcss.Container = _container.default;
postcss.Comment = _comment.default;
postcss.Input = _input.default;

var _default = postcss;`,
);

fs.writeFileSync(rootPostcssPath, content);
console.log("patch-postcss: patched root postcss for Next.js 10 postcss-scss");
