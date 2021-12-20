import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";

const defaultSiteMetadata = {
  siteUrl: "https://developers.livechat.com",
  title: "LiveChat Platform Docs & API Reference",
  description:
    "The LiveChat Platform offers much more than just a messaging tool. There's a number of possibilities that help you grow a business, which brings customer satisfaction.",
  author: "@livechat",
};

function SEO({ desc, keywords, title }) {
  const router = useRouter();
  const metaDescription = desc || defaultSiteMetadata.description;
  const canonicalUrl = `${defaultSiteMetadata.siteUrl}${router.basePath}${router.pathname}/`;

  return (
    <Head>
      <title>{`${title} | ${defaultSiteMetadata.title}`}</title>
      <link rel="canonical" href={canonicalUrl}></link>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://developers.livechat.com/docs/images/livechat-docs-og.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={defaultSiteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content="https://developers.livechat.com/docs/images/livechat-docs-og.png"
      />
      {keywords.length > 0 && (
        <meta name="keywords" content={metaDescription} />
      )}
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window.__lc = window.__lc || {};
     window.__lc.license = 1520;
     ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/staging/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
        `,
        }}
      />

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          (function(window, document, dataLayerName, id) {
window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
tags.async=!0,tags.src="//livechat.containers.piwik.pro/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
!function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
})(window, document, 'dataLayer', '${process.env.NEXT_PUBLIC_PIWIK_ID}');
        `,
        }}
      />

      <noscript>
        <iframe
          src={`//livechat.containers.piwik.pro/${process.env.NEXT_PUBLIC_PIWIK_ID}/noscript.html`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
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
};

export default SEO;
