import { init, track } from "@amplitude/analytics-browser";
import { VERSIONS_GROUPS } from "../constant";

export const logAmplitudeEvent = (name, payload, user) => {
  init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY, user);
  track(name, payload);
};

export const versionToString = (number) =>
  Number.isInteger(number) ? `${number}.0` : `${number}`;

export const getVersionColor = (version, groupVersions) => {
  const isLegacy = groupVersions.LEGACY_VERSIONS.includes(version);
  const isDevPreview = version === groupVersions.DEV_PREVIEW_VERSION;

  if (isLegacy || isDevPreview) {
    return "#efa843";
  }

  // deprecated version color
  return "#C1002B";
};

export const openChatWindow = (e) => {
  e.preventDefault();
  const LC_API = window.LC_API || {};
  LC_API.open_chat_window();
};

export const setUrlParams = (section) => {
  const params = window.location.pathname + "#" + section;

  if (window.history.replaceState) {
    window.history.replaceState(null, null, params);
  }
};

export const getCategoryTitle = (menuItems) => {
  const pathname = window.location.pathname;

  let categoryTitle = "";

  const findTitle = (item) => {
    if (item.url === pathname) {
      categoryTitle = item.title;
    }
    if (item.items && item.items.length > 0) {
      item.items.forEach((item) => {
        findTitle(item);
      });
    }
  };

  menuItems.forEach((item) => {
    findTitle(item);
  });

  window.categoryTitle = categoryTitle;
};

export const canUseWindow = !!(
  typeof window !== "undefined" && window.document
);

export const getStableVersion = (category) => {
  // FIXME: this is temp solution to have single version group in a category
  // We need a solution so if we have e.g. category `authorization` and multiple sets of versions
  // for customer and global api.
  switch (category) {
    case "extending-chat-widget":
      return VERSIONS_GROUPS["chat-widget"].STABLE_VERSION;
    case "data-reporting":
      return VERSIONS_GROUPS["data-reporting"].STABLE_VERSION;
    case "authorization":
      return VERSIONS_GROUPS["customer-accounts-api"].STABLE_VERSION;
    default:
      return VERSIONS_GROUPS.DEFAULT.STABLE_VERSION;
  }
};
