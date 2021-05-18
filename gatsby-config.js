const path = require("path");
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

console.log(`Using environment config: '${activeEnv}'`);
require("dotenv").config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://developers.livechat.com",
    title: "LiveChat Platform Docs & API Reference",
    description:
      "The LiveChat Platform offers much more than just a messaging tool. There's a number of possibilities that help you grow a business, which brings customer satisfaction.",
    author: "@livechat",
  },
  pathPrefix: process.env.PATH_PREFIX || "/docs",
  plugins: [
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id:
          process.env.NODE_ENV === "production" ? "GTM-M58RLCQ" : "GTM-5DVQQC",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
        defaultDataLayer: () => {
          return {
            category: window.categoryTitle,
            path: window.location.href,
            isUniquePageView:
              !window.location.hash || window.location.hash.length === 0,
          };
        },
      },
    },
    {
      resolve: `gatsby-plugin-fullstory`,
      options: {
        fs_org: process.env.GATSBY_APP_FULLSTORY_ORG,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-remark-placeholders",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { icon: false },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: require.resolve("./plugins/gatsby-remark-placeholders"),
            options: {},
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `rgb(67, 132, 245)`,
        showSpinner: false,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-default-mdx-basic",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        // icon: "src/images/gatsby-icon.png" // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`source sans pro\:400,500,600,700`],
        display: "swap",
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          payloads: `payloads/`,
        },
      },
    },
    // mutation observer doesn't really work for some reason here
    // {
    //   resolve: `gatsby-plugin-algolia-docsearch`,
    //   options: {
    //     apiKey: "f53a424573adab20d04faa2db150c349", // required
    //     indexName: "livechatinc", // required
    //     inputSelector: "#search", // required
    //     debug: false // (bool) Optional. Default `false`
    //   }
    // }
  ],
};
