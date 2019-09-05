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
              tableOfContents
              frontmatter {
                slug
                title
                weight
                category
                subcategory
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
