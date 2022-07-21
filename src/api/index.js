import AccountsClient from "./accounts";

let clients = {
  accounts: null,
  isInitialized: false,
};

const api = {
  initialize(token) {
    clients = {
      accounts: new AccountsClient(token),
      isInitialized: true,
    };
  },

  getAccounts() {
    return clients.accounts;
  },
};

export default api;
