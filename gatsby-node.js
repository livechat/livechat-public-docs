const path = require("path");
// const basePath = "";
// comment

const { createFilePath } = require("gatsby-source-filesystem");

// gatsby-node.js
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "content"),
        "node_modules"
      ],
      // react requires a single instance, this allows npm linking packages depending on react (by forcing local copy of react packages)
      alias: {
        react: require.resolve("react"),
        "react-dom": require.resolve("react-dom")
      }
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: "slug",
      node,
      value
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              slug
            }
            parent {
              ... on File {
                modifiedTime(formatString: "MM/DD/YYYY")
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const pages = result.data.allMdx.edges;

  pages.forEach(({ node }, index) => {
    createPage({
      // prefer custom slug over generated
      path: node.frontmatter.slug || node.fields.slug,
      component: path.resolve(`./src/templates/page.js`),
      context: { id: node.id, modifiedTime: node.parent.modifiedTime }
    });
  });
};
