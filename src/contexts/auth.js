import React, { createContext } from "react";
import AccountsSDK from "@livechat/accounts-sdk";
import api from "../api";

export const options = {
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  redirect_uri: "http://localhost:3000/docs",
};

export const accountsSdk = new AccountsSDK(options);
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const authorize = async () => {
    try {
      const authorizeData = await accountsSdk.popup(options).authorize();

      api.initialize(authorizeData["access_token"]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authorize }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
