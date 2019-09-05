import { useStaticQuery, graphql } from "gatsby";

export default () => {
  const categoryMeta = useStaticQuery(graphql`
    query getAllCategoriesMeta {
      allDocsJson {
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
  `).allDocsJson.edges[0].node.categories;

  return categoryMeta ? categoryMeta : [];
};
