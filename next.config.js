const withPlugins = require("next-compose-plugins");
const withYaml = require("next-plugin-yaml");
const { default: dynamic } = require("next/dynamic");
const withMDX = require("@next/mdx");

const nextConfig = {
  basePath: process.env.CONTEXT === "deploy-preview" ? "" : "/docs",
  future: {
    webpack5: true,
    mdxRs: false
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  }
};

module.exports = withPlugins(
  [
    [withYaml],
    [
      withMDX({
        extension: /\.mdx?$/,
        options: {
          remarkPlugins: [
            require("remark-gfm"),
            require("remark-frontmatter"),
            require("remark-mdx-frontmatter")
          ],
          rehypePlugins: [
            require("rehype-slug"),
            require("rehype-autolink-headings"),
            require("@mapbox/rehype-prism")
          ]
        }
      })
    ]
  ],
  nextConfig
);
