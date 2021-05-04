import articles from "../configs/articles.json";
import { canUseWindow } from "../utils";

const generatePathsMap = (items = [], acc = {}) => {
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

const appendPathsToNodes = (items = [], path = []) => {
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

const useAllArticlesInCategory = (category, headings) => {
  //Find the currently displayed category
  const path = canUseWindow ? window.location.pathname + "/" : "";
  const articlesGroupedByCategory = articles.find(
    (item) => item[0].category === category
  );

  const formattedHeadings = [];

  headings &&
    headings.forEach((heading) => {
      //build heading object
      const headingObj = {};
      headingObj["title"] = heading
        .substring(heading.indexOf(" "))
        .substring(1);
      headingObj["url"] =
        "#" + headingObj["title"].replace(/\s+/g, "-").toLowerCase();
      headingObj["path"] = [path, headingObj["url"]];
      headingObj["isSubcategory"] = false;
      headingObj["items"] = undefined;

      if (heading.startsWith("# ")) {
        formattedHeadings.push(headingObj);
      } else if (heading.startsWith("## ")) {
        headingObj["isSubcategory"] = true;
        if (headings.length === 1) {
          formattedHeadings.push(headingObj);
        } else {
          if (
            formattedHeadings[formattedHeadings.length - 1] &&
            formattedHeadings[formattedHeadings.length - 1].items === undefined
          ) {
            formattedHeadings[formattedHeadings.length - 1].items = [];
            formattedHeadings[formattedHeadings.length - 1].items.push(
              headingObj
            );
          } else if (formattedHeadings[formattedHeadings.length - 1]) {
            formattedHeadings[formattedHeadings.length - 1].items.push(
              headingObj
            );
          }
        }
      } else if (heading.startsWith("### ")) {
        headingObj["isSubcategory"] = true;
        if (headings.length === 1) {
          formattedHeadings.push(headingObj);
        } else {
          if (
            formattedHeadings[formattedHeadings.length - 1] &&
            formattedHeadings[formattedHeadings.length - 1].items === undefined
          ) {
            formattedHeadings[formattedHeadings.length - 1].items = [];
            formattedHeadings[formattedHeadings.length - 1].items.push(
              headingObj
            );
          } else if (
            formattedHeadings[formattedHeadings.length - 1] &&
            formattedHeadings[formattedHeadings.length - 1].items[
              formattedHeadings[formattedHeadings.length - 1].items.length - 1
            ].items === undefined
          ) {
            formattedHeadings[formattedHeadings.length - 1].items[
              formattedHeadings[formattedHeadings.length - 1].items.length - 1
            ].items = [];
            formattedHeadings[formattedHeadings.length - 1].items[
              formattedHeadings[formattedHeadings.length - 1].items.length - 1
            ].items.push(headingObj);
          } else if (
            formattedHeadings[formattedHeadings.length - 1] &&
            formattedHeadings[formattedHeadings.length - 1].items[
              formattedHeadings[formattedHeadings.length - 1].items.length - 1
            ].items.length > 0
          ) {
            formattedHeadings[formattedHeadings.length - 1].items[
              formattedHeadings[formattedHeadings.length - 1].items.length - 1
            ].items.push(headingObj);
          }
        }
      }
    });

  //add headings to related base item
  articlesGroupedByCategory &&
    articlesGroupedByCategory.forEach((article) => {
      if (article.url === path && article.items.length === 0) {
        article.items = formattedHeadings;
      } else {
        article.items.forEach((subArticle) => {
          if (subArticle.url === path) {
            subArticle.items = formattedHeadings;
          }
        });
      }
    });

  const a = appendPathsToNodes(articlesGroupedByCategory);
  const pathsMap = generatePathsMap(articlesGroupedByCategory);
  const getArticlePath = (url) => pathsMap[url];
  return [a, getArticlePath];
};

export default useAllArticlesInCategory;
