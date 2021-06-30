const livechatAccountsApiConfig = require("./livechat-accounts-api/config");
const customerAccountsApiConfig = require("./customer-accounts-api/config");

const configs = {
  "livechat-accounts-api": livechatAccountsApiConfig,
  "customer-accounts-api": customerAccountsApiConfig,
};

module.exports = configs;
