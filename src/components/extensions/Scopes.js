import React from "react";
import { SCOPES } from "../../constant";
import Table from "./Table";

const Scopes = ({ scopes }) => {
  const allScopes = scopes.split(",");
  const formattedScopes = allScopes.map((scope) => {
    const newScope = SCOPES.find((item) => item.id === scope);
    return newScope;

  }).map((scope) => {
    const scopeArray = [];
    scopeArray.push(<code className="language-text">{scope.id}</code>)
    scopeArray.push(scope.role)
    scopeArray.push(scope.description)
    return scopeArray;
  })
  return <Table headings={["Scope", "Role", "Description"]} bodyItems={formattedScopes} />
};

export default Scopes;
