import { useStaticQuery, graphql } from "gatsby";

export default () => {
  return useStaticQuery(graphql`
    query getAllArticlesGroupedBySubcategory {
      allMdx {
        group(field: frontmatter___subcategory) {
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
