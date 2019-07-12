const shell = require("shelljs");
let baseURL = "/docs";

function isFeatureBranch(name) {
  let regexp = /feature\/(.+)/;
  return regexp.test(name);
}

function branchName() {
  try {
    const name = shell
      .exec("git rev-parse --abbrev-ref HEAD", { silent: true })
      .stdout.trim();

    // Ignore master branches
    return name === "master" ? "" : name;
  } catch (e) {
    return "";
  }
}

const branch = branchName();

if (isFeatureBranch(branch)) {
  baseURL = `${baseURL}/${branch}`;
}

const buildDocs = `(export HUGO_VERSION=0.31.1 NODE_ENV=production; webpack --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js && node_modules/hugo-bin/vendor/hugo version && node_modules/hugo-bin/vendor/hugo --baseURL=${baseURL} -d ../dist/docs -s site)`;
const buildBetaDocs = `(export HUGO_VERSION=0.31.1 NODE_ENV=production; webpack --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js && node_modules/hugo-bin/vendor/hugo version && node_modules/hugo-bin/vendor/hugo --baseURL=${baseURL} --contentDir=content@beta -d ../dist/beta-docs -s site)`;
const command = `${buildDocs} && ${buildBetaDocs}`;

shell.exit(shell.exec(command).code);
