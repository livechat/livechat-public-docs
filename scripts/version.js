const shell = require("shelljs");
const argv = require("yargs").argv;
const { VERSIONS_GROUPS } = require("../src/constant");

const CONF_API_BASE_URL = "./content/management/configuration-api";
const AGENT_CHAT_API_BASE_URL = "./content/messaging/agent-chat-api";
const CUSTOMER_CHAT_API_BASE_URL = "./content/messaging/customer-chat-api";
const CUSTOMER_SDK_BASE_URL = "./content/extending-chat-widget/customer-sdk";
const JS_API_BASE_URL = "./content/extending-chat-widget/javascript-api";

const createNewVersion = (newVersion, baseVersion, group, exclude = []) => {
  const stableVersion = VERSIONS_GROUPS[group].STABLE_VERSION;

  switch (group) {
    case "DEFAULT": {
      let source;
      let destination;

      // configuration-api
      if (!exclude.includes("configuration-api")) {
        process.stdout.write(`Creating configuration-api for ${newVersion}...`);

        destination = `${CONF_API_BASE_URL}/${newVersion}`;
        shell.mkdir(`${destination}`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${CONF_API_BASE_URL}/index.mdx`;
        } else {
          source = `${CONF_API_BASE_URL}/${baseVersion}/.`;
        }

        shell.cp("-Rn", `${source}`, `${destination}`);

        process.stdout.write("Done\n");
      }

      // agent-chat-api
      if (!exclude.includes("agent-chat-api")) {
        process.stdout.write(`Creating agent-chat-api for ${newVersion}...`);

        destination = `${AGENT_CHAT_API_BASE_URL}/${newVersion}`;

        shell.mkdir(`${destination}`);
        shell.mkdir(`${destination}/rtm-reference`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${AGENT_CHAT_API_BASE_URL}/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}`);

          source = `${AGENT_CHAT_API_BASE_URL}/rtm-reference/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/rtm-reference`);
        } else {
          source = `${AGENT_CHAT_API_BASE_URL}/${baseVersion}/.`;
          shell.cp("-Rn", `${source}`, `${destination}`);
        }

        process.stdout.write("Done\n");
      }

      // customer-chat-api
      if (!exclude.includes("customer-chat-api")) {
        process.stdout.write(`Creating customer-chat-api for ${newVersion}...`);
        destination = `${CUSTOMER_CHAT_API_BASE_URL}/${newVersion}`;
        source = `${CUSTOMER_CHAT_API_BASE_URL}/${baseVersion}/.`;

        shell.mkdir(`${destination}`);
        shell.mkdir(`${destination}/rtm-reference`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${CUSTOMER_CHAT_API_BASE_URL}/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}`);

          source = `${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/rtm-reference`);
        } else {
          source = `${CUSTOMER_CHAT_API_BASE_URL}/${baseVersion}/.`;
          shell.cp("-Rn", `${source}`, `${destination}`);
        }

        process.stdout.write("Done\n");
      }
      break;
    }

    case "chat-widget": {
      let source;
      let destination;

      // customer-sdk
      if (!exclude.includes("customer-sdk")) {
        process.stdout.write(`Creating customer-sdk for ${newVersion}...`);

        destination = `${CUSTOMER_SDK_BASE_URL}/${newVersion}`;
        shell.mkdir(`${destination}`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${CUSTOMER_SDK_BASE_URL}/index.mdx`;
        } else {
          source = `${CUSTOMER_SDK_BASE_URL}/${baseVersion}/.`;
        }

        shell.cp("-Rn", `${source}`, `${destination}`);

        process.stdout.write("Done\n");
      }

      // javascript-api
      if (!exclude.includes("javascript-api")) {
        process.stdout.write(`Creating javascript-api for ${newVersion}...`);

        destination = `${JS_API_BASE_URL}/${newVersion}`;

        shell.mkdir(`${destination}`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${JS_API_BASE_URL}/index.mdx`;
        } else {
          source = `${JS_API_BASE_URL}/${baseVersion}/.`;
        }

        shell.cp("-Rn", `${source}`, `${destination}`);

        process.stdout.write("Done\n");
      }
      break;
    }
  }

  console.log("Remember to update apiVersion in the documents' metadata");
  console.log("Remember to update ALL_VERSIONS in constants");
};

const makeStable = (version, group, exclude = []) => {
  const stableVersion = `v${VERSIONS_GROUPS[group].STABLE_VERSION}`;

  switch (group) {
    case "DEFAULT":
      // configuration-api
      if (!exclude.includes("configuration-api")) {
        process.stdout.write("Moving configuration-api...");

        shell.mkdir(`${CONF_API_BASE_URL}/${stableVersion}`);
        shell.exec(
          `git mv ${CONF_API_BASE_URL}/index.mdx ${CONF_API_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${CONF_API_BASE_URL}/${version}/index.mdx ${CONF_API_BASE_URL}/`
        );
        shell.rm("-R", `${CONF_API_BASE_URL}/${version}`);

        process.stdout.write("Done\n");
      }

      // agent-chat-api
      if (!exclude.includes("agent-chat-api")) {
        process.stdout.write("Moving agent-chat-api...");
        shell.mkdir(`${AGENT_CHAT_API_BASE_URL}/${stableVersion}`);
        shell.mkdir(
          `${AGENT_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/index.mdx ${AGENT_CHAT_API_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/${version}/index.mdx ${AGENT_CHAT_API_BASE_URL}/`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/rtm-reference/index.mdx ${AGENT_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/${version}/rtm-reference/index.mdx ${AGENT_CHAT_API_BASE_URL}/rtm-reference`
        );
        shell.rm("-R", `${AGENT_CHAT_API_BASE_URL}/${version}`);
        process.stdout.write("Done\n");
      }

      // customer-chat-api
      if (!exclude.includes("customer-chat-api")) {
        process.stdout.write("Moving customer-chat-api...");
        shell.mkdir(`${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}`);
        shell.mkdir(
          `${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/${version}/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/${version}/rtm-reference/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference`
        );
        shell.rm("-R", `${CUSTOMER_CHAT_API_BASE_URL}/${version}`);
        process.stdout.write("Done\n");
      }
      break;

    case "chat-widget":
      // customer-sdk
      if (!exclude.includes("customer-sdk")) {
        process.stdout.write("Moving customer-sdk...");

        shell.mkdir(`${CUSTOMER_SDK_BASE_URL}/${stableVersion}`);
        shell.exec(
          `git mv ${CUSTOMER_SDK_BASE_URL}/index.mdx ${CUSTOMER_SDK_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${CUSTOMER_SDK_BASE_URL}/${version}/index.mdx ${CUSTOMER_SDK_BASE_URL}/`
        );
        shell.rm("-R", `${CUSTOMER_SDK_BASE_URL}/${version}`);

        process.stdout.write("Done\n");
      }

      // javascript-api
      if (!exclude.includes("javascript-api")) {
        process.stdout.write("Moving javascript-api...");

        shell.mkdir(`${JS_API_BASE_URL}/${stableVersion}`);
        shell.exec(
          `git mv ${JS_API_BASE_URL}/index.mdx ${JS_API_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${JS_API_BASE_URL}/${version}/index.mdx ${JS_API_BASE_URL}/`
        );
        shell.rm("-R", `${JS_API_BASE_URL}/${version}`);

        process.stdout.write("Done\n");
      }
      break;
  }

  console.log(
    "Remember to update STABLE_VERSION and LEGACY_VERSIONS in constants"
  );
};

if (argv.type) {
  switch (argv.type) {
    case "make-stable": {
      if (argv.newVersion) {
        const silentState = shell.config.silent; // save old silent state
        shell.config.silent = true;
        const version = `v${argv.newVersion.toFixed(1)}`;
        const group = argv.group || "DEFAULT";
        const exclude = argv.exclude || "";
        const excludeParts = exclude.split(",");

        makeStable(version, group, excludeParts);

        shell.config.silent = silentState;
      } else {
        console.log("--newVersion is required");
        shell.exit(1);
      }
      break;
    }

    case "new": {
      if (argv.newVersion && argv.fromVersion) {
        const silentState = shell.config.silent; // save old silent state
        shell.config.silent = true;

        const newVersion = `v${argv.newVersion.toFixed(1)}`;
        const fromVersion = `v${argv.fromVersion.toFixed(1)}`;
        const group = argv.group || "DEFAULT";
        const exclude = argv.exclude || "";
        const excludeParts = exclude.split(",");

        createNewVersion(newVersion, fromVersion, group, excludeParts);

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
