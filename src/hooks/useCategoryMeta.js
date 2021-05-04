import categories from "../configs/categories.json";

const useCategoryMeta = (category) => {
  const categoryMeta = category
    ? categories.filter((item) => item.slug === category)[0]
    : undefined;

  return categoryMeta ? categoryMeta : {};
};

export default useCategoryMeta;
