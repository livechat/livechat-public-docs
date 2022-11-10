import AccountsClient from "./accounts";
import LiveChatClient from "./livechat";
import DevProgramClient from "./dps";

let clients = {
  accounts: null,
  livechat: null,
  dps: null,
  isInitialized: false,
};

const api = {
  initialize(token) {
    clients = {
      accounts: new AccountsClient(token),
      livechat: new LiveChatClient(token),
      dps: new DevProgramClient(token),
      isInitialized: true,
    };
  },

  getAccounts() {
    return clients.accounts;
  },

  getLiveChat() {
    return clients.livechat;
  },

  getDPS() {
    return clients.dps;
  },
};

export default api;
