import axios from "axios";
import { getRegion } from "../utils/region";

class LiveChatClient {
  constructor(token) {
    const region = getRegion(token);

    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_LC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Region": region,
      },
    });
  }

  async getMe(id) {
    try {
      const response = await this.instance.post(
        `/v3.5/configuration/action/get_agent`,
        {
          id,
        }
      );

      return response.data;
    } catch (error) {
      if (error.response.data.error === "unauthorized")
        throw new Error(`Unauthorized`);
      console.error(error);
    }
  }
}

export default LiveChatClient;
