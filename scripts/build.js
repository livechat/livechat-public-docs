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

      // Ignore master branches
      return name === "master" ? "" : name;
    } catch (e) {
      return "";
    }
  };

  const branch = branchName();

  if (isFeatureBranch(branch)) {
    baseURL = `${baseURL}/${branch}`;
  }

  const buildCommand = `npm run build && mkdir -p ${argv.output} && cp -r public/. ${argv.output}`;

  console.log(`> ${buildCommand}`);
  shell.exit(shell.exec(buildCommand).code);
} else {
  console.log("--baseURL and --output are required");
  shell.exit(1);
}
