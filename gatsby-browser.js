import SmoothScroll from "smooth-scroll";

new SmoothScroll('a[href*="#"]', {
  speed: 160,
  speedAsDuration: true,
  offset: 120
});
