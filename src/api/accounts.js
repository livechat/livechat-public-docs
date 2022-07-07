import axios from "axios";

class AccountsClient {
  constructor(token) {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getMe() {
    try {
      const response = await this.instance.get(`/v2/accounts/me`);

      return response.data;
    } catch (error) {
      if (error.response.data.error === "unauthorized")
        throw new Error(`Unauthorized`);
      console.error(error);
    }
  }
}

export default AccountsClient;
