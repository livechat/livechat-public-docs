const livechatAccountsApiSpec = require("./livechat-accounts-api/spec.yml");
const customerAccountsApiSpec = require("./customer-accounts-api/spec.yml");

const specs = {
  "livechat-accounts-api": livechatAccountsApiSpec,
  "customer-accounts-api": customerAccountsApiSpec,
};

module.exports = specs;
