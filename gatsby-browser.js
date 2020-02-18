import "docsearch.js/dist/cdn/docsearch.min.css";
import docsearch from "docsearch.js/dist/cdn/docsearch.min.js";
import { setupAmplitude } from "./src/utils";

window.docsearch = docsearch;

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]', {
    speed: 160,
    speedAsDuration: true,
    offset: 100
  });
  setupAmplitude();
}
