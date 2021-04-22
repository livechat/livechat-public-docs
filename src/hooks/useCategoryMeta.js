import categories from "../configs/categories.json";

export default (category) => {
  const categoryMeta = category
    ? categories.filter((item) => item.slug === category.slice(1))[0]
    : undefined;

  return categoryMeta ? categoryMeta : {};
};
