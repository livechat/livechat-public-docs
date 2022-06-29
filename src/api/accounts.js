import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

class AccountsClient {
  constructor(token) {
    instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export default AccountsClient;
