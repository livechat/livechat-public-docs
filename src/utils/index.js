import { navigate } from "gatsby";

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

export const setupDocsearch = () => {
  if (
    typeof window === "undefined" ||
    typeof window.docsearch === "undefined"
  ) {
    return;
  }
  window.docsearch({
    apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
    indexName: "livechatinc",
    inputSelector: "#search",
    debug: false,
    handleSelected: function (input, event, suggestion, datasetNumber, context) {
      if (
        context.selectionMethod === "click" ||
        context.selectionMethod === "enterKey"
      ) {
        logAmplitudeEvent("Suggestion selected, input entered", {
          url: suggestion.url,
          input: input.getVal()
        });

        // removes the hardcoded path from Algolia
        navigate(
          suggestion.url.replace("https://developers.livechat.com/docs/", "")
        );
      }
    }
  });
};

export const versionToString = number =>
  Number.isInteger(number) ? `${number}.0` : `${number}`;

export const getVersionColor = (version, groupVersions) => {
  const isStable = version === groupVersions.STABLE_VERSION;
  const isLegacy = version === groupVersions.LEGACY_VERSION;

  return isStable ? "67, 132, 245" : isLegacy ? "209, 52, 91" : "239, 168, 67";
};

export const openChatWindow = (e) => {
  e.preventDefault()
  const LC_API = window.LC_API || {}
  LC_API.open_chat_window()
};