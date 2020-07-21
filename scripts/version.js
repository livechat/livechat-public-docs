const shell = require("shelljs");
const argv = require("yargs").argv;

const CONF_API_BASE_URL = "./content/management/configuration-api";
const AGENT_CHAT_API_BASE_URL = "./content/messaging/agent-chat-api";
const CUSTOMER_CHAT_API_BASE_URL = "./content/messaging/customer-chat-api";
const CUSTOMER_SDK_BASE_URL = "./content/extending-chat-widget/customer-sdk";
const JS_API_BASE_URL = "./content/extending-chat-widget/javascript-api";

const createNewVersion = (newVersion, baseVersion, group) => {
  switch (group) {
    case "default":
      console.log(`Creating new version v${newVersion} from v${baseVersion}`);

      // configuration-api
      process.stdout.write(`Creating configuration-api for v${newVersion}...`);

      shell.mkdir(`${CONF_API_BASE_URL}/v${newVersion}`);
      shell.cp(
        "-Rn",
        `${CONF_API_BASE_URL}/v${baseVersion}/.`,
        `${CONF_API_BASE_URL}/v${newVersion}`
      );

      process.stdout.write("Done\n");

      // agent-chat-api
      process.stdout.write(`Creating agent-chat-api for v${newVersion}...`);
      shell.mkdir(`${AGENT_CHAT_API_BASE_URL}/v${newVersion}`);
      shell.mkdir(`${AGENT_CHAT_API_BASE_URL}/v${newVersion}/rtm-reference`);
      shell.cp(
        "-Rn",
        `${AGENT_CHAT_API_BASE_URL}/v${baseVersion}/.`,
        `${AGENT_CHAT_API_BASE_URL}/v${newVersion}/`
      );

      process.stdout.write("Done\n");

      // customer-chat-api
      process.stdout.write(`Creating customer-chat-api for v${newVersion}...`);
      shell.mkdir(`${CUSTOMER_CHAT_API_BASE_URL}/v${newVersion}`);
      shell.mkdir(`${CUSTOMER_CHAT_API_BASE_URL}/v${newVersion}/rtm-reference`);
      shell.cp(
        "-Rn",
        `${CUSTOMER_CHAT_API_BASE_URL}/v${baseVersion}/.`,
        `${CUSTOMER_CHAT_API_BASE_URL}/v${newVersion}/`
      );

      process.stdout.write("Done\n");
      break;

    case "chat-widget":
      console.log(`Creating new version v${newVersion} from v${baseVersion}`);

      // customer-sdk
      process.stdout.write(`Creating customer-sdk for v${newVersion}...`);

      shell.mkdir(`${CUSTOMER_SDK_BASE_URL}/v${newVersion}`);
      shell.cp(
        "-Rn",
        `${CUSTOMER_SDK_BASE_URL}/v${baseVersion}/.`,
        `${CUSTOMER_SDK_BASE_URL}/v${newVersion}`
      );

      process.stdout.write("Done\n");

      // javascript-api
      process.stdout.write(`Creating javascript-api for v${newVersion}...`);

      shell.mkdir(`${JS_API_BASE_URL}/v${newVersion}`);
      shell.cp(
        "-Rn",
        `${JS_API_BASE_URL}/v${baseVersion}/.`,
        `${JS_API_BASE_URL}/v${newVersion}`
      );

      process.stdout.write("Done\n");
      break;
  }
};

const makeStable = (version, previousVersion, group) => {
  switch (group) {
    case "default":
      // configuration-api
      process.stdout.write("Moving configuration-api...");

      shell.mkdir(`${CONF_API_BASE_URL}/v${previousVersion}`);
      shell.exec(
        `git mv ${CONF_API_BASE_URL}/index.mdx ${CONF_API_BASE_URL}/v${previousVersion}`
      );
      shell.exec(
        `git mv ${CONF_API_BASE_URL}/v${version}/index.mdx ${CONF_API_BASE_URL}/`
      );

      process.stdout.write("Done\n");

      // agent-chat-api
      process.stdout.write("Moving agent-chat-api...");
      shell.mkdir(`${AGENT_CHAT_API_BASE_URL}/v${previousVersion}`);
      shell.mkdir(
        `${AGENT_CHAT_API_BASE_URL}/v${previousVersion}/rtm-reference`
      );
      shell.exec(
        `git mv ${AGENT_CHAT_API_BASE_URL}/index.mdx ${AGENT_CHAT_API_BASE_URL}/v${previousVersion}`
      );
      shell.exec(
        `git mv ${AGENT_CHAT_API_BASE_URL}/v${version}/index.mdx ${AGENT_CHAT_API_BASE_URL}/`
      );
      shell.exec(
        `git mv ${AGENT_CHAT_API_BASE_URL}/rtm-reference/index.mdx ${AGENT_CHAT_API_BASE_URL}/v${previousVersion}/rtm-reference`
      );
      shell.exec(
        `git mv ${AGENT_CHAT_API_BASE_URL}/v${version}/rtm-reference/index.mdx ${AGENT_CHAT_API_BASE_URL}/rtm-reference`
      );
      shell.rm("-R", `${AGENT_CHAT_API_BASE_URL}/v${version}`);
      process.stdout.write("Done\n");

      // customer-chat-api
      process.stdout.write("Moving customer-chat-api...");
      shell.mkdir(`${CUSTOMER_CHAT_API_BASE_URL}/v${previousVersion}`);
      shell.mkdir(
        `${CUSTOMER_CHAT_API_BASE_URL}/v${previousVersion}/rtm-reference`
      );
      shell.exec(
        `git mv ${CUSTOMER_CHAT_API_BASE_URL}/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/v${previousVersion}`
      );
      shell.exec(
        `git mv ${CUSTOMER_CHAT_API_BASE_URL}/v${version}/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/`
      );
      shell.exec(
        `git mv ${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/v${previousVersion}/rtm-reference`
      );
      shell.exec(
        `git mv ${CUSTOMER_CHAT_API_BASE_URL}/v${version}/rtm-reference/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference`
      );
      shell.rm("-R", `${CUSTOMER_CHAT_API_BASE_URL}/v${version}`);
      process.stdout.write("Done\n");
      break;

    case "chat-widget":
      // customer-sdk
      process.stdout.write("Moving customer-sdk...");

      shell.mkdir(`${CUSTOMER_SDK_BASE_URL}/v${previousVersion}`);
      shell.exec(
        `git mv ${CUSTOMER_SDK_BASE_URL}/index.mdx ${CUSTOMER_SDK_BASE_URL}/v${previousVersion}`
      );
      shell.exec(
        `git mv ${CUSTOMER_SDK_BASE_URL}/v${version}/index.mdx ${CUSTOMER_SDK_BASE_URL}/`
      );

      process.stdout.write("Done\n");

      // javascript-api
      process.stdout.write("Moving javascript-api...");

      shell.mkdir(`${JS_API_BASE_URL}/v${previousVersion}`);
      shell.exec(
        `git mv ${JS_API_BASE_URL}/index.mdx ${JS_API_BASE_URL}/v${previousVersion}`
      );
      shell.exec(
        `git mv ${JS_API_BASE_URL}/v${version}/index.mdx ${JS_API_BASE_URL}/`
      );

      process.stdout.write("Done\n");
      break;
  }

  console.log(
    "Remember to update STABLE_VERSION and LEGACY_VERSIONS in constants"
  );
};

if (argv.type) {
  switch (argv.type) {
    case "make-stable": {
      if (argv.fromVersion && argv.toVersion) {
        const silentState = shell.config.silent; // save old silent state
        shell.config.silent = true;
        const fromVersion = argv.fromVersion.toFixed(1);
        const toVersion = argv.toVersion.toFixed(1);
        const group = argv.group || "default";

        makeStable(toVersion, fromVersion, group);

        shell.config.silent = silentState;
      } else {
        console.log("--fromVersion and --toVersion are required");
        shell.exit(1);
      }
      break;
    }

    case "new": {
      if (argv.newVersion && argv.fromVersion) {
        const silentState = shell.config.silent; // save old silent state
        shell.config.silent = true;

        const newVersion = argv.newVersion.toFixed(1);
        const fromVersion = argv.fromVersion.toFixed(1);
        const group = argv.group || "default";

        createNewVersion(newVersion, fromVersion, group);

        shell.config.silent = silentState;
      } else {
        console.log("--newVersion and --fromVersion are required");
        shell.exit(1);
      }

      break;
    }
  }
} else {
  console.log("--type is required");
  shell.exit(1);
}
