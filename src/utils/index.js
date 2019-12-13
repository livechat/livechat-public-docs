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
    debug: false
  });
};

export const versionToString = number =>
  Number.isInteger(number) ? `${number}.0` : `${number}`;
