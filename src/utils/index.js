let amplitude;

if (typeof window !== "undefined") {
  amplitude = require("amplitude-js");
}

export const setupAmplitude = () => {
  if (typeof window === "undefined") {
    return;
  }

  amplitude.getInstance().init(process.env.GATSBY_APP_AMPLITUDE_KEY);
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

  return isStable ? "67, 132, 245" : isLegacy ? "209, 52, 91" : "239, 168, 67";
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

        const newLocation = `${window.location.origin}/${path}`;
        window.location.replace(newLocation);
      }
    },
  });
};
