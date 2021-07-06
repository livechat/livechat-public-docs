const globalAccountsApiConfig = require("./global-accounts-api/config");
const customerAccountsApiConfig = require("./customer-accounts-api/config");

const configs = {
  "global-accounts-api": globalAccountsApiConfig,
  "customer-accounts-api": customerAccountsApiConfig,
};

module.exports = configs;
