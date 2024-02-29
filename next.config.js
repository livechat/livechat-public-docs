const withPlugins = require("next-compose-plugins");
const withYaml = require("next-plugin-yaml");
const { default: dynamic } = require("next/dynamic");
const withMDX = require("@next/mdx");

const remarkMdxFrontmatter = dynamic(() => import("remark-mdx-frontmatter"), {
  ssr: false
});
const remarkFrontmatter = dynamic(() => import("remark-frontmatter"), {
  ssr: false
});
const remarkGfm = dynamic(() => import("remark-gfm"), {
  ssr: false
});

const nextConfig = {
  target: "serverless",
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
    config.experiments = { topLevelAwait: true };
    return config;
  },
  compiler: {
    removeConsole: false
  }
};

module.exports = withPlugins(
  [
    [withYaml],
    [
      withMDX({
        extension: /\.mdx?$/,
        options: {
          remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
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
