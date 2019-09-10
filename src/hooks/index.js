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

export const useScrollSpy = (selector = ".heading", callback) => {
  const [active, setActive] = useState([]);

  useEffect(() => {
    callback(active[0]);
  }, [active]);

  useEffect(() => {
    if (!!(typeof window !== "undefined") && "IntersectionObserver" in window) {
      let options = {
        rootMargin: "0px",
        threshold: 0
      };

      const onObserve = data => {
        const intersecting = data.filter(item => item && item.isIntersecting);

        if (intersecting.length > 0) {
          setActive(intersecting.map(item => `#${item.target.id}`));
        }
      };

      let observer = {};

      observer = new IntersectionObserver(onObserve, options);

      const elements = document.querySelectorAll(selector);

      elements.forEach(
        element => observer.observe && observer.observe(element)
      );
    }
    // eslint-disable-next-line
  }, []);

  return active;
};
