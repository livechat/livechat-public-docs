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
  const [active, setActive] = useState("");

  let options = {
    rootMargin: "-60px 0px 0px",
    threshold: 0
  };

  const observerCb = data => {
    console.log(
      "fired!",
      data.filter(item => item && item.isIntersecting)
      //   .map(item => {
      //     setActive(item.target.id);
      //     callback(item.target.id);
      //   }),
      // data
    );
    setActive();
  };

  let observer = new IntersectionObserver(observerCb, options);

  useEffect(() => {
    document
      .querySelectorAll(selector)
      .forEach(element => observer.observe(element));
    // eslint-disable-next-line
  }, []);

  return active;
};
