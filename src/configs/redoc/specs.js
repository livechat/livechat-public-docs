const globalAccountsApiSpec = require("./global-accounts-api/spec.yml");
const customerAccountsApiSpec = require("./customer-accounts-api/spec.yml");

const specs = {
  "global-accounts-api": globalAccountsApiSpec,
  "customer-accounts-api": customerAccountsApiSpec,
};

module.exports = specs;
