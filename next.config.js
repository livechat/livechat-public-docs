const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withYaml = require("next-plugin-yaml");

const nextConfig = {
  basePath: process.env.CONTEXT === "deploy-preview" ? "" : "/docs",
  trailingSlash: true,
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
