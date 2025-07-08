import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";

const defaultSiteMetadata = {
  siteUrl: "https://platform.text.com",
  title: "Text Platform Docs & API Reference",
  description:
    "The Text Platform offers much more than just a messaging tool. There's a number of possibilities that help you grow a business, which brings customer satisfaction.",
  author: "@textplatform",
};

function SEO({ desc, keywords, title, subtitle, robots }) {
  const router = useRouter();
  const metaDescription = desc || defaultSiteMetadata.description;
  let canonicalUrl = `${defaultSiteMetadata.siteUrl}${router.basePath}${router.pathname}`;

  if (canonicalUrl.endsWith("/")) {
    canonicalUrl = canonicalUrl.slice(0, -1);
  }

  return (
    <Head>
      <title>{`${title} | ${subtitle || defaultSiteMetadata.title}`}</title>
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="preconnect"
        href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net`}
        crossOrigin="true"
      />
      <meta name="description" content={metaDescription} />
      {robots && <meta name="robots" content={robots} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://platform.text.com/docs/images/text-docs-og.png"
      />
      <link rel="icon" href="/docs/images/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={defaultSiteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content="https://platform.text.com/docs/images/livechat-docs-og.png"
      />
      {keywords.length > 0 && (
        <meta name="keywords" content={metaDescription} />
      )}

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window.__lc = window.__lc || {};
     window.__lc.license = 19196658;
     ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
        `,
        }}
      />
    </Head>
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  robots: PropTypes.string,
};

export default SEO;
