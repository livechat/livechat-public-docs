import { useEffect, useState } from "react";
import { setUrlParams } from "../utils";
import throttle from "lodash.throttle";

const getHeadingsOffsetMap = (selector) =>
  [...document.querySelectorAll(selector)].map(
    ({ id, nodeName, offsetTop, outerText }) => ({
      id,
      nodeName,
      offsetTop,
      outerText,
    })
  );

export const useScrollSpy = (selector = ".heading", callback) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    callback(active);
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    const map = getHeadingsOffsetMap(selector);
    if (!!(typeof window !== "undefined")) {
      const onScroll = throttle(
        (e) => {
          const currentPosition =
            window.scrollY || document.documentElement.scrollTop;

          const elem = map.filter(
            ({ offsetTop }) => offsetTop > currentPosition
          )[0];

          // dirty hack
          if (elem && elem.nodeName !== "H5" && elem.nodeName !== "H6") {
            let slug = elem.outerText;
            slug = slug.toLowerCase();
            slug = slug.replace(/\s/g, "-");
            slug = slug.replace(/[^a-zA-Z0-9-]+/g, "");
            setActive(`#${slug}`);
            setUrlParams(slug);
          }
        },
        200,
        { leading: false }
      );

      document.addEventListener("scroll", onScroll);
      return () => document.removeEventListener("scroll", onScroll);
    }

    // eslint-disable-next-line
  }, []);
  return active;
};

export default useScrollSpy;
