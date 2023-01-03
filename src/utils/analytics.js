import { canUseWindow } from "./canUseWindow";

export default class Analytics {
  static track({ category, action, label, value }) {
    if (canUseWindow) {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "generic",
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue: value,
      });
    }
  }
}
