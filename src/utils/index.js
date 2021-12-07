let amplitude;
import { VERSIONS_GROUPS } from "../constant";

if (typeof window !== "undefined") {
  amplitude = require("amplitude-js");
}

export const setupAmplitude = () => {
  if (typeof window === "undefined") {
    return;
  }

  amplitude.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY);
};

export const logAmplitudeEvent = (name, properties) => {
  if (amplitude) {
    amplitude.getInstance().logEvent(name, properties);
  }
};

export const versionToString = (number) =>
  Number.isInteger(number) ? `${number}.0` : `${number}`;

export const getVersionColor = (version, groupVersions) => {
  const isStable = version === groupVersions.STABLE_VERSION;
  const isLegacy = groupVersions.LEGACY_VERSIONS.includes(version);
  const isDevPreview = version === groupVersions.DEV_PREVIEW_VERSION;

  if (isStable) {
    return "67, 132, 245";
  }

  if (isLegacy || isDevPreview) {
    return "239, 168, 67";
  }

  return "209, 52, 91";
};

export const openChatWindow = (e) => {
  e.preventDefault();
  const LC_API = window.LC_API || {};
  LC_API.open_chat_window();
};

export const setUrlParams = (section) => {
  const params = window.location.pathname + "#" + section;

  if (window.history.replaceState) {
    window.history.replaceState(null, null, params);
  }
};

export const getCategoryTitle = (menuItems) => {
  const pathname = window.location.pathname;

  let categoryTitle = "";

  const findTitle = (item) => {
    if (item.url === pathname) {
      categoryTitle = item.title;
    }
    if (item.items && item.items.length > 0) {
      item.items.forEach((item) => {
        findTitle(item);
      });
    }
  };

  menuItems.forEach((item) => {
    findTitle(item);
  });

  window.categoryTitle = categoryTitle;
};

export const canUseWindow = !!(
  typeof window !== "undefined" && window.document
);

export const setupDocsearch = () => {
  if (!canUseWindow) {
    return;
  }

  window.docsearch({
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
    indexName: "livechatinc",
    inputSelector: "#search",
    debug: false,
    algoliaOptions: {
      hitsPerPage: 7,
    },
    handleSelected: function(input, event, suggestion, datasetNumber, context) {
      if (
        context.selectionMethod === "click" ||
        context.selectionMethod === "enterKey"
      ) {
        logAmplitudeEvent("Suggestion selected, input entered", {
          url: suggestion.url,
          input: input.getVal(),
        });
        // removes the hardcoded path from Algolia
        const path = suggestion.url.replace(
          "https://developers.livechat.com/docs/",
          ""
        );

        const newLocation = `${window.location.origin}/docs/${path}`;

        window.location.replace(newLocation);
      }
    },
  });
};

export const getStableVersion = (category) => {
  switch (category) {
    case "extending-chat-widget":
      return VERSIONS_GROUPS["chat-widget"].STABLE_VERSION;
    case "data-reporting":
      return VERSIONS_GROUPS["data-reporting"].STABLE_VERSION;
    default:
      return VERSIONS_GROUPS.DEFAULT.STABLE_VERSION;
  }
};
