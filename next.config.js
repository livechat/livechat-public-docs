const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withYaml = require("next-plugin-yaml");
const path = require("path");

const nextConfig = {
  target: "serverless",
  basePath: process.env.CONTEXT === "deploy-preview" ? "" : "/docs",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    // config.module.rules.push({
    //   test: /\.js$/,
    //   use: [
    //     { 
    //       loader:'./loaders/remove-hashbag-loader.js'
    //     },
    // ],
    //   include: /node_modules\/nimma/,
    // });
    
    config.resolve = {
      ...config.resolve,
      ...{
        alias: {
          ...config.resolve.alias,
          'nimma/legacy$': path.resolve(
            __dirname,
            './node_modules/nimma/dist/legacy/cjs/index.js',
          ),
          'nimma/fallbacks$': path.resolve(
            __dirname,
            './node_modules/nimma/dist/cjs/fallbacks/index.js',
          ),
        },
      },
    };

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withMdxEnhanced({
        layoutPath: "src/components/Page",
        defaultLayout: true,
        fileExtensions: ["mdx"],
        remarkPlugins: [],
        rehypePlugins: [
          require("rehype-slug"),
          require("rehype-autolink-headings"),
          require("@mapbox/rehype-prism"),
        ],
        usesSrc: false,
        extendFrontMatter: {},
        reExportDataFetching: false,
      }),
    ],
    [withYaml],
  ],
  nextConfig
);
