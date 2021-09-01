import { useEffect, useState, useContext } from "react";
import { setUrlParams } from "../utils";
import throttle from "lodash.throttle";
import { SCROLL_OFFSET } from "../constant";
import { PromotionContext } from "../contexts";

const getHeadingsOffsetMap = (selector) =>
  [...document.querySelectorAll(selector)].map(
    ({ id, nodeName, offsetTop }) => ({
      id,
      nodeName,
      offsetTop,
    })
  );

export const useScrollSpy = (
  selector = ".heading",
  callback,
  updateDataLayer
) => {
  const [active, setActive] = useState("");
  const { isActive } = useContext(PromotionContext);

  useEffect(() => {
    callback(active);
    updateDataLayer();
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    const map = getHeadingsOffsetMap(selector);
    if (!!(typeof window !== "undefined")) {
      const onScroll = throttle(
        (e) => {
          const currentPosition =
            window.scrollY || document.documentElement.scrollTop;

          const elem = map
            .filter(
              ({ offsetTop }) =>
                offsetTop <
                currentPosition + SCROLL_OFFSET + 100 + (isActive ? 40 : 0)
            )
            .slice(-1)[0];

          // dirty hack
          if (elem && elem?.nodeName !== "H5" && elem?.nodeName !== "H6") {
            setActive(`${elem?.id ? "#" + elem?.id : ""}`);
            setUrlParams(elem?.id || "");
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
