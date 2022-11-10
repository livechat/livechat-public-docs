import axios from "axios";

class DevProgramClient {
  constructor(token) {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_DEV_PLATFORM_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getAllBookmarks() {
    try {
      const res = await this.instance.get(`/v2/links`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Can't get bookmarks [${error.message}]`);
    }
  }

  async updateBookmarks(bookmarks) {
    try {
      await this.instance.put(`/v2/links`, bookmarks);
    } catch (error) {
      console.log(error);
      throw new Error(`Bookmarks couldn't be updated. [${error.message}]`);
    }
  }
}

export default DevProgramClient;
