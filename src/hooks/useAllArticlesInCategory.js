import { useAllArticlesGroupedByCategory } from "./";
import useCategoryMeta from "./useCategoryMeta";

export default category => {
  const byCategory = useAllArticlesGroupedByCategory().filter(item => {
    if (category) {
      return item.fieldValue === category;
    }
    return item;
  })[0];

  let result = byCategory.edges
    .map(({ node }) => ({
      id: node.id,
      url: node.frontmatter.slug || node.fields.slug,
      title: node.frontmatter.title,
      weight: node.frontmatter.weight || 999,
      items: node.tableOfContents.items,
      category: node.frontmatter.category,
      subcategory: node.frontmatter.subcategory,
      article: true
    }))
    .sort(({ title: titleA }, { title: titleB }) =>
      titleA.localeCompare(titleB)
    )
    .sort(({ weight: weightA }, { weight: weightB }) => weightA - weightB);

  // this parts kind of tricky;
  // if you have an idea on how to
  // make it simple, fire away!
  result = result.reduce((acc, cur) => {
    const rest = acc[cur.subcategory] ? acc[cur.subcategory].items : [];

    const subcategoryMeta = useCategoryMeta(cur.category).items.filter(
      item => item.slug === cur.subcategory
    )[0];

    return {
      ...acc,
      [cur.subcategory]: {
        ...subcategoryMeta,
        url: "/docs/" + category + "/" + cur.subcategory + "/",
        article: true,
        isSubcategory: true,
        items: [...rest, cur]
      }
    };
  }, {});

  // squeezing the reduced object into array
  result = Object.entries(result)
    .map(item => {
      return { ...item[1] };
    })
    .reduce((acc, item) => {
      if (item.title) {
        return [...acc, item];
      }
      return [...acc, ...item.items];
    }, []);

  return result;
};
