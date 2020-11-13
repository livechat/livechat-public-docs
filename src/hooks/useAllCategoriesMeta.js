import { useStaticQuery, graphql } from "gatsby";

export default () => {
  const categoryMeta = useStaticQuery(graphql`
    query getAllCategoriesMeta {
      allContentJson {
        edges {
          node {
            categories {
              slug
              title
              color
              items {
                slug
                title
                color
              }
            }
          }
        }
      }
    }
  `).allContentJson.edges[0].node.categories;

  return categoryMeta ? categoryMeta : [];
};
