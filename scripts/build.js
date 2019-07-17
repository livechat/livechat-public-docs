const shell = require("shelljs");
const argv = require("yargs").argv;

if (argv.baseURL && argv.output) {
  let baseURL = argv.baseURL;

  const isFeatureBranch = name => {
    let regexp = /feature\/(.+)/;
    return regexp.test(name);
  };

  const branchName = () => {
    try {
      const name = shell
        .exec("git rev-parse --abbrev-ref HEAD", { silent: true })
        .stdout.trim();

      return name === "master" ? "" : name;
    } catch (e) {
      return "";
    }
  };

  const branch = branchName();

  if (isFeatureBranch(branch)) {
    baseURL = `${baseURL}/${branch}`;
  }

  const buildCommand = `(export HUGO_VERSION=0.31.1 NODE_ENV=production; webpack --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js && node_modules/hugo-bin/vendor/hugo version && node_modules/hugo-bin/vendor/hugo --baseURL=${baseURL} ${
    argv.contentDir ? `--contentDir=${argv.contentDir}` : ""
  } -d ${argv.output} -s site)`;

  console.log(`> ${buildCommand}`);
  shell.exit(shell.exec(buildCommand).code);
} else {
  console.log("--baseURL and --output are required");
  shell.exit(1);
}
