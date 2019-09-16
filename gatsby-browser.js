import SmoothScroll from "smooth-scroll";

new SmoothScroll('a[href*="#"]', {
  speed: 160,
  speedAsDuration: true,
  offset: 120
});

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.hash) {
    return false;
  }

  return true;
};
