import SmoothScroll from "smooth-scroll";
import { slugger } from "./src/components/core/slugger";

new SmoothScroll('a[href*="#"]', {
  speed: 300,
  speedAsDuration: true,
  offset: 120
});

export const onRouteUpdate = () => {
  slugger.reset();
};
