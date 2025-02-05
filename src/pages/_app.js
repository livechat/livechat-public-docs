import { useEffect } from "react";
import { useRouter } from "next/router";
import TagManager from "react-gtm-module";
import "@docsearch/css";
import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../styles/fonts.css";
import "../styles/layout.css";
import "../styles/prism.css";
import "../styles/algolia.css";
import "../styles/redoc.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({
      gtmId:
        process.env.NODE_ENV === "production" ? "GTM-MTQ5WQNP" : "GTM-5DVQQC",
    });
  }, []);

  useEffect(() => {
    window.dataLayer.push({ event: "next-route-change" });
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
