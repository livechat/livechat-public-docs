import { canUseWindow } from "./canUseWindow";
import { getCookie } from "./cookies";
const TOKEN_KEY = "access_token";

export const getCachedToken = () => {
  if (canUseWindow) {
    return getCookie(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  }

  if (canUseWindow && window.sessionStorage) {
    const sessionToken = window.sessionStorage.getItem(TOKEN_KEY);

    if (sessionToken) {
      return sessionToken;
    }
  }

  return getCookie(TOKEN_KEY);
};
