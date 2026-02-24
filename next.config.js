const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withYaml = require("next-plugin-yaml");

const nextConfig = {
  target: "serverless",
  basePath: process.env.CONTEXT === "deploy-preview" ? "" : "/docs",
  webpack: (config, { dev }) => {
    if (!dev) {
      config.devtool = false;
      const setSourceMapFalse = (rules) => {
        if (!rules) return;
        for (const rule of rules) {
          if (rule.oneOf) setSourceMapFalse(rule.oneOf);
          else if (rule.use) {
            const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
            for (const u of uses) {
              const loader = typeof u === "string" ? u : u && u.loader;
              if (
                loader &&
                (loader.includes("css-loader") ||
                  loader.includes("postcss-loader"))
              ) {
                if (typeof u === "object" && u.options) {
                  u.options.sourceMap = false;
                  if (u.options.postcssOptions && u.options.postcssOptions.map)
                    u.options.postcssOptions.map = false;
                }
              }
            }
          } else if (
            rule.loader &&
            (rule.loader.includes("css-loader") ||
              rule.loader.includes("postcss-loader")) &&
            rule.options
          ) {
            rule.options.sourceMap = false;
          }
        }
      };
      setSourceMapFalse(config.module.rules);
      const minimizers = config.optimization && config.optimization.minimizer;
      if (Array.isArray(minimizers)) {
        for (const m of minimizers) {
          if (
            m &&
            m.constructor &&
            m.constructor.name === "CssMinimizerPlugin" &&
            m.options
          ) {
            if (!m.options.postcssOptions) m.options.postcssOptions = {};
            m.options.postcssOptions.map = false;
            break;
          }
        }
      }
    }
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
  nextConfig,
);
