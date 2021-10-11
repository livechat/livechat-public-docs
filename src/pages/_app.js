import { useEffect } from "react";
import { useRouter } from "next/router";
import TagManager from "react-gtm-module";
import "docsearch.js/dist/cdn/docsearch.min.css";
import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../components/core/fonts.css";
import "../components/core/layout.css";
import "../components/core/prism.css";
import "../components/core/algolia.css";
import "../components/core/redoc.css";
import { setupAmplitude } from "../utils";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    // use #open-chat when adding openChatWindow to links, otherwise it'll scroll up upon click

    require("smooth-scroll")('a[href*="#"]:not([href="#open-chat"])', {
      speed: 160,
      speedAsDuration: true,
      offset: 130,
    });

    setupAmplitude();
  }

  useEffect(() => {
    TagManager.initialize({
      gtmId:
        process.env.NODE_ENV === "production" ? "GTM-M58RLCQ" : "GTM-5DVQQC",
    });
  }, []);

  useEffect(() => {
    window.dataLayer.push({ event: "next-route-change" });
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
