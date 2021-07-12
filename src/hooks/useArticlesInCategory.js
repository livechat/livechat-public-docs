import useCategoryMeta from "./useCategoryMeta";

import rawArticles from "../configs/articles.json";

const appendPathsToNodes = (items, path = []) => {
  return items.map((item) => {
    return {
      ...item,
      path: [...path, item.url],
      items: item.items
        ? appendPathsToNodes(item.items, [...path, item.url])
        : undefined,
    };
  });
};

const generatePathsMap = (items, acc = {}) => {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    acc = { ...acc, [item.url]: item.path };
    if (item.items && item.url) {
      acc = {
        ...generatePathsMap(item.items, acc),
      };
    }
  }
  return acc;
};

const useArticlesInCategory = (category, currentSlug, currentApiVersion) => {
  let articles = rawArticles
    .filter((item) => item.category === category)
    // filtering out non-current api versions (dirty)
    .filter(
      ({ apiVersion }) =>
        apiVersion === currentApiVersion || apiVersion === null
    )
    // keep doc only for current article
    .map((item) => {
      if ("/docs" + item.url !== currentSlug) {
        return { ...item, items: null };
      }
      return item;
    })
    .sort(({ title: titleA }, { title: titleB }) =>
      titleA.localeCompare(titleB)
    )
    .sort(({ weight: weightA }, { weight: weightB }) => weightA - weightB);
  // this parts kind of tricky;
  // if you have an idea on how to
  // make it simple, fire away!
  articles = articles.reduce((acc, cur) => {
    const rest = acc[cur.subcategory] ? acc[cur.subcategory].items : [];

    const subcategoryMeta = useCategoryMeta(cur.category).items.filter(
      (item) => item.slug === cur.subcategory
    )[0];

    return {
      ...acc,
      [cur.subcategory]: {
        ...subcategoryMeta,
        url: "/" + category + "/" + cur.subcategory + "/",
        article: true,
        isSubcategory: true,
        apiVersion: cur.apiVersion,
        items: [...rest, cur],
      },
    };
  }, {});

  // squeezing the reduced object into array
  articles = Object.entries(articles)
    .map((item) => {
      return { ...item[1] };
    })
    .reduce((acc, item) => {
      if (item.title) {
        return [...acc, item];
      }
      return [...acc, ...item.items];
    }, []);

  // last piece of data: a flat array of url & paths,
  // plus a getter for the path
  articles = appendPathsToNodes(articles);
  const pathsMap = generatePathsMap(articles);
  const getArticlePath = (url) => pathsMap[url];

  return [articles, getArticlePath];
};

export default useArticlesInCategory;
