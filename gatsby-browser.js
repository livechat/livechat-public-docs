import "docsearch.js/dist/cdn/docsearch.min.css";
import docsearch from "docsearch.js/dist/cdn/docsearch.min.js";
import { setupAmplitude } from "./src/utils";
import { SCROLL_OFFSET } from "./src/constant";

window.docsearch = docsearch;

if (typeof window !== "undefined") {
  // use #open-chat when adding openChatWindow to links, otherwise it'll scroll up upon click
  require("smooth-scroll")('a[href*="#"]:not([href="#open-chat"])', {
    speed: 160,
    speedAsDuration: true,
    offset: SCROLL_OFFSET
  });
  setupAmplitude();
}
