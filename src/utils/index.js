import docsearch from "docsearch.js/dist/cdn/docsearch.min.js";
import "docsearch.js/dist/cdn/docsearch.min.css";

export const setupDocsearch = () => {
  if (!docsearch) {
    return;
  }
  docsearch({
    apiKey: "f53a424573adab20d04faa2db150c349",
    indexName: "livechatinc",
    inputSelector: "#search",
    debug: false
  });
};
