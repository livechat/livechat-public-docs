import "docsearch.js/dist/cdn/docsearch.min.css";
import docsearch from "docsearch.js/dist/cdn/docsearch.min.js";

window.docsearch = docsearch;

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]', {
    speed: 160,
    speedAsDuration: true,
    offset: 100
  });
}
