import SmoothScroll from "smooth-scroll";
import "docsearch.js/dist/cdn/docsearch.min.css";
import docsearch from "docsearch.js/dist/cdn/docsearch.min.js";

window.docsearch = docsearch;

new SmoothScroll('a[href*="#"]', {
  speed: 160,
  speedAsDuration: true,
  offset: 50
});

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.hash) {
    return false;
  }

  return true;
};
