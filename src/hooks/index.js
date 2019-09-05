import { useEffect, useState } from "react";
import useAllArticlesInCategory from "./useAllArticlesInCategory";
import useCategoryMeta from "./useCategoryMeta";
import useAllCategoriesMeta from "./useAllCategoriesMeta";
import useAllArticlesGroupedByCategory from "./useAllArticlesGroupedByCategory";
import useAllArticlesGroupedBySubcategory from "./useAllArticlesGroupedBySubcategory";

export {
  useAllArticlesInCategory,
  useCategoryMeta,
  useAllCategoriesMeta,
  useAllArticlesGroupedByCategory,
  useAllArticlesGroupedBySubcategory
};

export const useHeadingsOffsetMap = selector => {
  const [offsetMap, setOffsetMap] = useState([]);

  useEffect(() => {
    const headings = [...document.querySelectorAll(selector)].map(
      ({ id, nodeName, offsetTop }) => ({
        id,
        nodeName,
        offsetTop
      })
    );
    setOffsetMap(headings);
    // eslint-disable-next-line
  }, []);
  return offsetMap;
};

export const useScrollSpy = selector => {};
