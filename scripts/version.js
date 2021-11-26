const shell = require("shelljs");
const argv = require("yargs").argv;
const { VERSIONS_GROUPS } = require("../src/constant");

const CONF_API_BASE_URL = "./src/pages/management/configuration-api";
const WEBHOOKS_BASE_URL = "./src/pages/management/webhooks";
const AGENT_CHAT_API_BASE_URL = "./src/pages/messaging/agent-chat-api";
const CUSTOMER_CHAT_API_BASE_URL = "./src/pages/messaging/customer-chat-api";
const CUSTOMER_SDK_BASE_URL = "./src/pages/extending-chat-widget/customer-sdk";
const JS_API_BASE_URL = "./src/pages/extending-chat-widget/javascript-api";
const REPORTS_API_BASE_URL = "./src/pages/data-reporting/reports-api";

const createNewVersion = (newVersion, baseVersion, group, exclude = []) => {
  const stableVersion = VERSIONS_GROUPS[group].STABLE_VERSION;

  switch (group) {
    case "DEFAULT": {
      let source;
      let destination;

      // configuration-api
      if (!exclude.includes("configuration-api")) {
        process.stdout.write(`Creating ${newVersion} of Configuration API...`);

        destination = `${CONF_API_BASE_URL}/${newVersion}`;
        shell.mkdir(`${destination}`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${CONF_API_BASE_URL}/index.mdx`;
        } else {
          source = `${CONF_API_BASE_URL}/${baseVersion}/.`;
        }

        shell.cp("-Rn", `${source}`, `${destination}`);

        shell.exec(`git add ${destination}`);

        process.stdout.write("Done\n");
      }

      // management > webhooks
      if (!exclude.includes("webhooks")) {
        process.stdout.write(`Creating ${newVersion} of Webhooks...`);

        destination = `${WEBHOOKS_BASE_URL}/${newVersion}`;
        shell.mkdir(`${destination}`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${WEBHOOKS_BASE_URL}/index.mdx`;
        } else {
          source = `${WEBHOOKS_BASE_URL}/${baseVersion}/.`;
        }

        shell.cp("-Rn", `${source}`, `${destination}`);

        shell.exec(`git add ${destination}`);

        process.stdout.write("Done\n");
      }

      // agent-chat-api
      if (!exclude.includes("agent-chat-api")) {
        process.stdout.write(`Creating ${newVersion} of Agent Chat API...`);

        destination = `${AGENT_CHAT_API_BASE_URL}/${newVersion}`;

        shell.mkdir(`${destination}`);
        shell.mkdir(`${destination}/rtm-reference`);
        shell.mkdir(`${destination}/data-structures`);
        shell.mkdir(`${destination}/rtm-pushes`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${AGENT_CHAT_API_BASE_URL}/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}`);
          shell.exec(`git add ${destination}`);

          source = `${AGENT_CHAT_API_BASE_URL}/rtm-reference/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/rtm-reference`);
          shell.exec(`git add ${destination}`);

          source = `${AGENT_CHAT_API_BASE_URL}/data-structures/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/data-structures`);
          shell.exec(`git add ${destination}`);

          source = `${AGENT_CHAT_API_BASE_URL}/rtm-pushes/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/rtm-pushes`);
          shell.exec(`git add ${destination}`);
        } else {
          source = `${AGENT_CHAT_API_BASE_URL}/${baseVersion}/.`;
          shell.cp("-Rn", `${source}`, `${destination}`);
          shell.exec(`git add ${destination}`);
        }

        process.stdout.write("Done\n");
      }

      // customer-chat-api
      if (!exclude.includes("customer-chat-api")) {
        process.stdout.write(`Creating ${newVersion} Customer Chat API...`);
        destination = `${CUSTOMER_CHAT_API_BASE_URL}/${newVersion}`;
        source = `${CUSTOMER_CHAT_API_BASE_URL}/${baseVersion}/.`;

        shell.mkdir(`${destination}`);
        shell.mkdir(`${destination}/rtm-reference`);
        shell.mkdir(`${destination}/data-structures`);
        shell.mkdir(`${destination}/rtm-pushes`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${CUSTOMER_CHAT_API_BASE_URL}/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}`);
          shell.exec(`git add ${destination}`);

          source = `${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/rtm-reference`);
          shell.exec(`git add ${destination}`);

          source = `${CUSTOMER_CHAT_API_BASE_URL}/data-structures/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/data-structures`);
          shell.exec(`git add ${destination}`);

          source = `${CUSTOMER_CHAT_API_BASE_URL}/rtm-pushes/index.mdx`;
          shell.cp("-Rn", `${source}`, `${destination}/rtm-pushes`);
          shell.exec(`git add ${destination}`);
        } else {
          source = `${CUSTOMER_CHAT_API_BASE_URL}/${baseVersion}/.`;
          shell.cp("-Rn", `${source}`, `${destination}`);
          shell.exec(`git add ${destination}`);
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
        process.stdout.write(`Creating ${newVersion} of Customer SDK...`);

        destination = `${CUSTOMER_SDK_BASE_URL}/${newVersion}`;
        shell.mkdir(`${destination}`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${CUSTOMER_SDK_BASE_URL}/index.mdx`;
        } else {
          source = `${CUSTOMER_SDK_BASE_URL}/${baseVersion}/.`;
        }

        shell.cp("-Rn", `${source}`, `${destination}`);
        shell.exec(`git add ${destination}`);

        process.stdout.write("Done\n");
      }

      // javascript-api
      if (!exclude.includes("javascript-api")) {
        process.stdout.write(`Creating ${newVersion} of JavaScript API...`);

        destination = `${JS_API_BASE_URL}/${newVersion}`;

        shell.mkdir(`${destination}`);

        // Check if base version is a stable (without folder version)
        if (baseVersion === `v${stableVersion}`) {
          source = `${JS_API_BASE_URL}/index.mdx`;
        } else {
          source = `${JS_API_BASE_URL}/${baseVersion}/.`;
        }

        shell.cp("-Rn", `${source}`, `${destination}`);
        shell.exec(`git add ${destination}`);

        process.stdout.write("Done\n");
      }
      break;
    }

    // reports-api
    case "data-reporting": {
      let source;
      let destination;

      // reports-api
      process.stdout.write(`Creating ${newVersion} of Reports API...`);

      destination = `${REPORTS_API_BASE_URL}/${newVersion}`;

      shell.mkdir(`${destination}`);

      // Check if base version is a stable (without folder version)
      if (baseVersion === `v${stableVersion}`) {
        source = `${REPORTS_API_BASE_URL}/index.mdx`;
      } else {
        source = `${REPORTS_API_BASE_URL}/${baseVersion}/.`;
      }

      shell.cp("-Rn", `${source}`, `${destination}`);
      shell.exec(`git add ${destination}`);

      process.stdout.write("Done\n");

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
        process.stdout.write("Moving Configuration API...");

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

      // management > webhooks
      if (!exclude.includes("webhooks")) {
        process.stdout.write("Moving Webhooks...");

        shell.mkdir(`${WEBHOOKS_BASE_URL}/${stableVersion}`);
        shell.exec(
          `git mv ${WEBHOOKS_BASE_URL}/index.mdx ${WEBHOOKS_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${WEBHOOKS_BASE_URL}/${version}/index.mdx ${WEBHOOKS_BASE_URL}/`
        );
        shell.rm("-R", `${WEBHOOKS_BASE_URL}/${version}`);

        process.stdout.write("Done\n");
      }

      // agent-chat-api
      if (!exclude.includes("agent-chat-api")) {
        process.stdout.write("Moving Agent Chat API...");
        shell.mkdir(`${AGENT_CHAT_API_BASE_URL}/${stableVersion}`);
        shell.mkdir(
          `${AGENT_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.mkdir(
          `${AGENT_CHAT_API_BASE_URL}/${stableVersion}/data-structures`
        );
        shell.mkdir(`${AGENT_CHAT_API_BASE_URL}/${stableVersion}/rtm-pushes`);
        // web reference
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/index.mdx ${AGENT_CHAT_API_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/${version}/index.mdx ${AGENT_CHAT_API_BASE_URL}/`
        );
        // rtm reference
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/rtm-reference/index.mdx ${AGENT_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/${version}/rtm-reference/index.mdx ${AGENT_CHAT_API_BASE_URL}/rtm-reference`
        );
        // data structures
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/data-structures/index.mdx ${AGENT_CHAT_API_BASE_URL}/${stableVersion}/data-structures`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/${version}/data-structures/index.mdx ${AGENT_CHAT_API_BASE_URL}/data-structures`
        );
        // rtm pushes
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/rtm-pushes/index.mdx ${AGENT_CHAT_API_BASE_URL}/${stableVersion}/rtm-pushes`
        );
        shell.exec(
          `git mv ${AGENT_CHAT_API_BASE_URL}/${version}/rtm-pushes/index.mdx ${AGENT_CHAT_API_BASE_URL}/rtm-pushes`
        );
        shell.rm("-R", `${AGENT_CHAT_API_BASE_URL}/${version}`);
        process.stdout.write("Done\n");
      }

      // customer-chat-api
      if (!exclude.includes("customer-chat-api")) {
        process.stdout.write("Moving Customer Chat API...");
        shell.mkdir(`${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}`);
        shell.mkdir(
          `${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.mkdir(
          `${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/data-structures`
        );
        shell.mkdir(
          `${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/rtm-pushes`
        );
        // web reference
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/${version}/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/`
        );
        // rtm reference
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/rtm-reference`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/${version}/rtm-reference/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/rtm-reference`
        );
        // data structures
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/data-structures/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/data-structures`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/${version}/data-structures/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/data-structures`
        );
        // rtm pushes
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/rtm-pushes/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/${stableVersion}/rtm-pushes`
        );
        shell.exec(
          `git mv ${CUSTOMER_CHAT_API_BASE_URL}/${version}/rtm-pushes/index.mdx ${CUSTOMER_CHAT_API_BASE_URL}/rtm-pushes`
        );
        shell.rm("-R", `${CUSTOMER_CHAT_API_BASE_URL}/${version}`);
        process.stdout.write("Done\n");
      }
      break;

    case "chat-widget":
      // customer-sdk
      if (!exclude.includes("customer-sdk")) {
        process.stdout.write("Moving Customer SDK...");

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
        process.stdout.write("Moving JavaScript API...");

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

    // reports-api
    case "data-reporting":
      process.stdout.write("Moving Reports API...");
      shell.mkdir(`${REPORTS_API_BASE_URL}/${stableVersion}`);
      shell.exec(
        `git mv ${REPORTS_API_BASE_URL}/index.mdx ${REPORTS_API_BASE_URL}/${stableVersion}`
      );
      shell.exec(
        `git mv ${REPORTS_API_BASE_URL}/${version}/index.mdx ${REPORTS_API_BASE_URL}/`
      );
      shell.rm("-R", `${REPORTS_API_BASE_URL}/${version}`);
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
      if (argv.newVersion) {
        const silentState = shell.config.silent; // save old silent state
        shell.config.silent = true;
        const version = argv.newVersion.toFixed(1);
        const group = argv.group || "DEFAULT";
        const exclude = argv.exclude || "";
        const excludeParts = exclude.split(",");

        const groupVersions = VERSIONS_GROUPS[group];

        if (groupVersions.STABLE_VERSION.includes(version)) {
          console.log(`${version} is already stable`);
        } else if (!groupVersions.ALL_VERSIONS.includes(version)) {
          console.log(`${version} does not exists`);
        } else {
          makeStable(`v${version}`, group, excludeParts);
        }

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

        const newVersion = argv.newVersion.toFixed(1);
        const fromVersion = argv.fromVersion.toFixed(1);
        const group = argv.group || "DEFAULT";
        const exclude = argv.exclude || "";
        const excludeParts = exclude.split(",");

        const groupVersions = VERSIONS_GROUPS[group];

        if (groupVersions.ALL_VERSIONS.includes(newVersion)) {
          console.log(`${newVersion} already exists`);
        } else if (!groupVersions.ALL_VERSIONS.includes(fromVersion)) {
          console.log(`${fromVersion} does not exists`);
        } else {
          createNewVersion(
            `v${newVersion}`,
            `v${fromVersion}`,
            group,
            excludeParts
          );
        }

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
