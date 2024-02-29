const globalAccountsApiConfig = require("./global-accounts-api/config");
const customerAccountsApiConfig = require("./customer-accounts-api/config");
const textApiConfig = require("./text-api/config");
const chatApiConfig = require("./chat-api/config");

const configs = {
  "global-accounts-api": globalAccountsApiConfig,
  "customer-accounts-api": customerAccountsApiConfig,
  "customer-accounts-api-v2": customerAccountsApiConfig,
  "text-api": textApiConfig,
  "chat-api": chatApiConfig
};

module.exports = configs;
