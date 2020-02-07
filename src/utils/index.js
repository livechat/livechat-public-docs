import amplitude from "amplitude-js";

export const setupAmplitude = () => {
  if (typeof window === "undefined") {
    return;
  }

  amplitude.getInstance().init("656f6573a88e63d3dc2ce32e33ef8284");
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
    apiKey: "f53a424573adab20d04faa2db150c349",
    indexName: "livechatinc",
    inputSelector: "#search",
    debug: false,
    handleSelected: function (input, event, suggestion, datasetNumber, context) {
      if (
        context.selectionMethod === "click" ||
        context.selectionMethod === "enterKey"
      ) {
        logAmplitudeEvent("User selected suggestion and input", {
          url: suggestion.url,
          input: input.getVal()
        });

        window.location.href = suggestion.url;
        // console.log("input", input.getVal());
        // console.log("suggestion", suggestion);
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
