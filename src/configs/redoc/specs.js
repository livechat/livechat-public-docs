const globalAccountsApiSpec = require("./global-accounts-api/spec.yml");
const customerAccountsApiSpec = require("./customer-accounts-api/spec.yml");
const customerAccountsApiSpecv2 = require("./customer-accounts-api/specv2.yml");
const textApiSpec = require("./text-api/spec.yml");
const customerDataPlatformSpec = require("./customer-data-platform-api/spec.yml");

const specs = {
  "global-accounts-api": globalAccountsApiSpec,
  "customer-accounts-api": customerAccountsApiSpec,
  "customer-accounts-api-v2": customerAccountsApiSpecv2,
  "text-api": textApiSpec,
  "customer-data-platform-api": customerDataPlatformSpec,
};

module.exports = specs;
