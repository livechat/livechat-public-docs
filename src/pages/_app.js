import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import storeMetrics from "@livechat/store-metrics";
import TagManager from "react-gtm-module";
import "@docsearch/css";
import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../styles/fonts.css";
import "../styles/layout.css";
import "../styles/prism.css";
import "../styles/algolia.css";
import "../styles/redoc.css";
import { canUseWindow } from "../utils/canUseWindow";
import Page from "components/Page";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    TagManager.initialize({
      gtmId:
        process.env.NODE_ENV === "production" ? "GTM-M58RLCQ" : "GTM-5DVQQC"
    });

    if (canUseWindow) {
      storeMetrics();
    }
  }, []);

  useEffect(() => {
    window.dataLayer.push({ event: "next-route-change" });
  }, [router.pathname]);
  console.log(process.env);
  useEffect(() => {
    const fetchMdx = async () => {
      const basePath = process.env.CONTEXT === "deploy-preview" ? "" : "/docs";

      await fetch(basePath + "/api/page", {
        method: "POST",
        body: JSON.stringify({
          url: router.pathname
        })
      })
        .then(res => res.json())
        .then(res => {
          setData(res);
        });
    };
    if (router.pathname !== "/") {
      fetchMdx();
    } else {
      setData(null);
    }
  }, [router.pathname]);

  if (!data && router.pathname !== "/") {
    return null;
  }

  return (
    <Page data={data}>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
