import React, { createContext, useEffect, useState } from "react";
import AccountsSDK from "@livechat/accounts-sdk";
import api from "../api";
import { useLocalStorage } from "../hooks";

const AuthContext = createContext(null);

const initUser = {
  name: "",
  avatar_url: "",
  email: "",
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [isAuthorized, setIsAuthorized] = useState(!!token);
  const [user, setUser] = useState(initUser);

  const authorize = async () => {
    try {
      const options = {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        server_url: process.env.NEXT_PUBLIC_SERVER_URL,
        response_type: "token",
        redirect_uri: window.location.href,
      };
      const accountsSdk = new AccountsSDK(options);

      const authorizeData = await accountsSdk.popup(options).authorize();

      setToken(authorizeData["access_token"]);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthorized(false);
    setUser(initUser);
  };

  const fetchUserInfo = async () => {
    try {
      const data = await api.getAccounts().getMe();
      setUser({
        name: data?.name || "",
        avatar_url: data?.avatar_url || "",
        email: data?.email || "",
      });
    } catch (error) {
      if (error.message === "Unauthorized") {
        logout();
      }
      console.error(error);
    }
  };

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
