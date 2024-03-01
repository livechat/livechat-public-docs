import storeMetrics from "@livechat/store-metrics";
import "@docsearch/css";
import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../styles/fonts.css";
import "../styles/layout.css";
import "../styles/prism.css";
import "../styles/algolia.css";
import "../styles/redoc.css";
import Page from "components/Page";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { canUseWindow } from "../utils/canUseWindow";

function MyApp({ Component, pageProps, data }) {
  const router = useRouter();

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

  return (
    <Page data={data}>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.getInitialProps = async appContext => {
  const App = (await import("next/app")).default;
  const appProps = await App.getInitialProps(appContext);
  const fs = require("fs");
  const path = require("path");
  const matter = require("gray-matter");

  if (appContext.router.pathname === "/") {
    return { ...appProps };
  }

  const fileName = appContext.router.pathname + "/index.mdx";
  const articlesDirectory = path.join(process.cwd(), "src/pages/");

  try {
    const fileContents = fs.readFileSync(articlesDirectory + fileName, "utf-8");
    const { data } = matter(fileContents);
    appContext.Component.data = data;
    return { ...appProps, data };
  } catch (e) {
    console.log(e);
  }
  return { ...appProps };
};

export default MyApp;
