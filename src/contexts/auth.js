import React, { createContext, useEffect, useState } from "react";
import AccountsSDK from "@livechat/accounts-sdk";
import api from "../api";
import { useLocalStorage } from "../hooks";
import { AUTH_TYPE } from "../constant";
import { getCachedToken } from "../utils/auth";
import { removeCookie } from "../utils/cookies";

const AuthContext = createContext(null);

const initUser = {
  name: "",
  avatar_url: "",
  email: "",
};

const TOKEN_KEY = "access_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", getCachedToken());
  const [isAuthorized, setIsAuthorized] = useState(!!token);
  const [user, setUser] = useState(initUser);

  const authorize = async (type) => {
    try {
      const options = {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        server_url: process.env.NEXT_PUBLIC_SERVER_URL,
        response_type: "token",
        redirect_uri: window.location.href,
      };
      const accountsSdk = new AccountsSDK(options);

      let authorizeData;

      switch (type) {
        case AUTH_TYPE.iframe:
          authorizeData = await accountsSdk.iframe(options).authorize();
          break;

        case AUTH_TYPE.popup:
        default:
          authorizeData = await accountsSdk.popup(options).authorize();
          break;
      }

      setToken(authorizeData[TOKEN_KEY]);
    } catch (error) {
      throw error;
    }
  };

  const logout = (deleteSessions = true) => {
    try {
      if (deleteSessions) {
        api.getAccounts().deleteSessions();
      }
    } catch (error) {
      console.error(error);
    }

    setToken(null);
    setIsAuthorized(false);
    setUser(initUser);
    removeCookie(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
  };

  const fetchUserInfo = async () => {
    try {
      const data = await api.getLiveChat().getMe();
      const avatar = data?.avatar;
      const avatar_url =
        avatar.indexOf("https://") === -1 ? `//${avatar}` : avatar;

      setUser({
        name: data?.name || "",
        avatar_url: avatar_url || "",
        email: data?.email || "",
      });
    } catch (error) {
      if (error.message === "Unauthorized") {
        logout(false);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    authorize(AUTH_TYPE.iframe);
  }, []);

  useEffect(() => {
    api.initialize(token);
    setIsAuthorized(!!token);

    if (!!token) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ authorize, isAuthorized, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
