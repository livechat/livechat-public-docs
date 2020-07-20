const shell = require("shelljs");
const argv = require("yargs").argv;

if (argv.type) {
  switch (argv.type) {
    case "make-stable": {
      if (argv.fromVersion && argv.toVersion) {
        const silentState = shell.config.silent; // save old silent state
        shell.config.silent = true;
        const fromVersion = argv.fromVersion;
        const toVersion = argv.toVersion;

        // configuration-api
        process.stdout.write("Moving configuration-api...");

        shell.mkdir(`./content/management/configuration-api/v${fromVersion}`);
        shell.exec(
          `git mv ./content/management/configuration-api/index.mdx ./content/management/configuration-api/v${fromVersion}`
        );
        shell.exec(
          `git mv ./content/management/configuration-api/v${toVersion}/index.mdx ./content/management/configuration-api/`
        );

        process.stdout.write("Done\n");

        // agent-chat-api
        process.stdout.write("Moving agent-chat-api...");
        shell.mkdir(`./content/messaging/agent-chat-api/v${fromVersion}`);
        shell.mkdir(
          `./content/messaging/agent-chat-api/v${fromVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ./content/messaging/agent-chat-api/index.mdx ./content/messaging/agent-chat-api/v${fromVersion}`
        );
        shell.exec(
          `git mv ./content/messaging/agent-chat-api/v${toVersion}/index.mdx ./content/messaging/agent-chat-api/`
        );
        shell.exec(
          `git mv ./content/messaging/agent-chat-api/rtm-reference/index.mdx ./content/messaging/agent-chat-api/v${fromVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ./content/messaging/agent-chat-api/v${toVersion}/rtm-reference/index.mdx ./content/messaging/agent-chat-api/rtm-reference`
        );
        shell.rm("-R", `./content/messaging/agent-chat-api/v${toVersion}`);
        process.stdout.write("Done\n");

        // customer-chat-api
        process.stdout.write("Moving customer-chat-api...");
        shell.mkdir(`./content/messaging/customer-chat-api/v${fromVersion}`);
        shell.mkdir(
          `./content/messaging/customer-chat-api/v${fromVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ./content/messaging/customer-chat-api/index.mdx ./content/messaging/customer-chat-api/v${fromVersion}`
        );
        shell.exec(
          `git mv ./content/messaging/customer-chat-api/v${toVersion}/index.mdx ./content/messaging/customer-chat-api/`
        );
        shell.exec(
          `git mv ./content/messaging/customer-chat-api/rtm-reference/index.mdx ./content/messaging/customer-chat-api/v${fromVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ./content/messaging/customer-chat-api/v${toVersion}/rtm-reference/index.mdx ./content/messaging/customer-chat-api/rtm-reference`
        );
        shell.rm("-R", `./content/messaging/customer-chat-api/v${toVersion}`);
        process.stdout.write("Done\n");

        console.log(
          "Remember to update STABLE_VERSION and LEGACY_VERSIONS in constants"
        );

        shell.config.silent = silentState;
      } else {
        console.log("--fromVersion and --toVersion are required");
        shell.exit(1);
      }
      break;
    }

    case "new": {
      if (argv.newVersion) {
        const silentState = shell.config.silent; // save old silent state
        shell.config.silent = true;

        const newVersion = argv.newVersion;
        const fromVersion = argv.fromVersion
          ? argv.fromVersion
          : parseFloat(argv.newVersion) - 0.1;

        if (fromVersion) {
          console.log(
            `Creating new version v${newVersion} from v${fromVersion}`
          );

          // configuration-api
          process.stdout.write(
            `Creaging configuration-api for v${newVersion}...`
          );

          shell.mkdir(`./content/management/configuration-api/v${newVersion}`);
          shell.cp(
            "-R",
            `./content/management/configuration-api/v${fromVersion}/.`,
            `./content/management/configuration-api/v${newVersion}`
          );

          process.stdout.write("Done\n");

          // agent-chat-api
          process.stdout.write(`Creaging agent-chat-api for v${newVersion}...`);
          shell.mkdir(`./content/messaging/agent-chat-api/v${newVersion}`);
          shell.mkdir(
            `./content/messaging/agent-chat-api/v${newVersion}/rtm-reference`
          );
          shell.cp(
            "-R",
            `./content/messaging/agent-chat-api/v${fromVersion}/.`,
            `./content/messaging/agent-chat-api/v${newVersion}/`
          );

          process.stdout.write("Done\n");

          // customer-chat-api
          process.stdout.write(
            `Creaging customer-chat-api for v${newVersion}...`
          );
          shell.mkdir(`./content/messaging/customer-chat-api/v${newVersion}`);
          shell.mkdir(
            `./content/messaging/customer-chat-api/v${newVersion}/rtm-reference`
          );
          shell.cp(
            "-R",
            `./content/messaging/customer-chat-api/v${fromVersion}/.`,
            `./content/messaging/customer-chat-api/v${newVersion}/`
          );

          process.stdout.write("Done\n");
        } else {
          console.log("--fromVersion is required");
        }

        shell.config.silent = silentState;
      } else {
        console.log("--newVersion is required");
        shell.exit(1);
      }

      break;
    }
  }
} else {
  console.log("--type is required");
  shell.exit(1);
}
