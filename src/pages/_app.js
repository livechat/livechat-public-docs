import { useEffect } from "react";
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
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps, data, content }) {
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

  if (router.pathname === "/") {
    return <Component {...pageProps} />;
  }

  return (
    <Page data={data} content={content}>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.getInitialProps = async ctx => {
  const path = await import("path");
  const fs = await import("fs");
  const serialize = (await import("next-mdx-remote/serialize")).serialize;
  const matter = (await import("gray-matter")).default;

  const remarkMdxFrontmatter = dynamic(() => import("remark-mdx-frontmatter"), {
    ssr: false
  });
  const remarkFrontmatter = dynamic(() => import("remark-frontmatter"), {
    ssr: false
  });
  const remarkGfm = dynamic(() => import("remark-gfm"), {
    ssr: false
  });

  const articlesDirectory = path.join(process.cwd(), "src/pages/");
  const fileName = ctx.router.pathname + "/index.mdx";
  const fileContents = fs.readFileSync(articlesDirectory + fileName, "utf-8");

  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        require("rehype-slug"),
        require("rehype-autolink-headings"),
        require("@mapbox/rehype-prism")
      ]
    }
  });

  return {
    data,
    content: mdxSource
  };
};

export default MyApp;
