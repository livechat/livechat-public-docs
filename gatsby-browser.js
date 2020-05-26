import "docsearch.js/dist/cdn/docsearch.min.css";
import docsearch from "docsearch.js/dist/cdn/docsearch.min.js";
import { navigate } from "gatsby";
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

export const onInitialClientRender = () => {
  const hash = window.location.hash;
  const redirects = [{
    from: '#public-web-apps',
    to: '#implicit-grant'
  }, {
    from: '#private-web-apps',
    to: '#implicit-grant'
  },
  {
    from: '#public-server-side-apps',
    to: '#authorization-code-grant'
  },
  {
    from: '#private-server-side-apps-coming-soon',
    to: '#authorization-code-grant'
  },
  {
    from: "#creating-new-customer",
    to: '#creating-a-new-customer'
  }]
  if (hash) {
    redirects.forEach(redirect => {
      if (redirect.from === hash) {
        navigate(window.location.pathname + redirect.to);
      }
    });
  }
}
