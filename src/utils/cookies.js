import find from "lodash/fp/find";
import trimStart from "lodash/fp/trimStart";
import { canUseWindow } from "./canUseWindow";

export const getCookie = (key) => {
  if (canUseWindow) {
    const cookies = document.cookie.split(";");
    const found = find((cookie) => {
      const [cookieName] = trimStart(cookie).split("=");
      return decodeURIComponent(cookieName) === key;
    }, cookies);
    return found ? decodeURIComponent(found.split("=")[1]) : null;
  }
};

export const setCookie = (key, value, options) => {
  if (canUseWindow) {
    const { days, path } = options;
    const expires = days
      ? `; expires=${new Date(
          Date.now() + days * 24 * 60 * 60 * 1000
        ).toUTCString()}`
      : "";

    const writePath = path ? `; path=${path}` : "";
    const stringifiedValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    const cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      stringifiedValue
    )}`;
    document.cookie = `${cookie}${expires}${writePath}`;
  }
};

export const removeCookie = (key) => setCookie(key, "", { days: -1 });
