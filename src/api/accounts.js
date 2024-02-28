import axios from "axios";

class AccountsClient {
  constructor(token) {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  }

  async getInfo() {
    try {
      const response = await this.instance.get(`/info`);

      return response.data;
    } catch (error) {
      if (error.response.data.error === "unauthorized")
        throw new Error(`Unauthorized`);
      console.error(error);
    }
  }

  async deleteSessions() {
    try {
      await this.instance.delete(`/v2/sessions`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default AccountsClient;
