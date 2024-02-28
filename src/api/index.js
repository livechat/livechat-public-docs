import AccountsClient from "./accounts";
import LiveChatClient from "./livechat";

let clients = {
  accounts: null,
  livechat: null,
  isInitialized: false
};

const api = {
  initialize(token) {
    clients = {
      accounts: new AccountsClient(token),
      livechat: new LiveChatClient(token),
      isInitialized: true
    };
  },

  getAccounts() {
    return clients.accounts;
  },

  getLiveChat() {
    return clients.livechat;
  }
};

export default api;
