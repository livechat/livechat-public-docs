import React from "react";
import { SCOPES } from "../../constant";
import Table from "./Table";

const Scopes = ({ scopes }) => {
  const allScopes = scopes.split(",");
  const formattedScopes = allScopes.map((scope) => {
    const newScope = SCOPES.find((item) => item.id === scope);

    return [
      <code className="language-text">{newScope.id}</code>,
      newScope.product,
      newScope.role,
      newScope.role_type,
      newScope.description
    ];
  })
  return <Table headings={["Scope", "Product", "Role", "Role Type", "Description"]} bodyItems={formattedScopes} />
};

export default Scopes;
