import { useEffect } from "react";
import TagManager from "react-gtm-module";
import "docsearch.js/dist/cdn/docsearch.min.css";
import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../components/core/fonts.css";
import "../components/core/layout.css";
import "../components/core/prism.css";
import "../components/core/algolia.css";
import "../components/core/redoc.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({
      gtmId:
        process.env.NODE_ENV === "production" ? "GTM-M58RLCQ" : "GTM-5DVQQC",
    });
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
