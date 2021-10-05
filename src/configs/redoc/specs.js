const globalAccountsApiSpec = require("./global-accounts-api/spec.yml");
const customerAccountsApiSpec = require("./customer-accounts-api/spec.yml");
const customerAccountsApiSpecv2 = require("./customer-accounts-api/specv2.yml");


const specs = {
  "global-accounts-api": globalAccountsApiSpec,
  "customer-accounts-api": customerAccountsApiSpec,
  "customer-accounts-api-v2": customerAccountsApiSpecv2
};

module.exports = specs;
