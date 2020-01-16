import { useStaticQuery, graphql } from "gatsby";

export default () => {
  return useStaticQuery(graphql`
    query getAllArticlesGroupedByCategory {
      allMdx {
        group(field: frontmatter___category) {
          fieldValue
          edges {
            node {
              id
              tableOfContents(maxDepth: 3)
              frontmatter {
                slug
                title
                weight
                category
                subcategory
                apiVersion
              }
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `).allMdx.group;
};
