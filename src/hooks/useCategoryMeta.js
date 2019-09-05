import { useStaticQuery, graphql } from "gatsby";

export default category => {
  const categoryMeta = useStaticQuery(graphql`
    query getCategoriesMeta {
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
  `).allDocsJson.edges[0].node.categories.filter(
    item => item.slug === category
  )[0];

  return categoryMeta ? categoryMeta : {};
};
