import React from "react";
import styled from "@emotion/styled";
import { SCOPES } from "../../constant";

export const HeadingLink = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  &:hover {
    color: inherit;
    text-decoration: none;
    &:before {
      content: "#";
      position: absolute;
      font-weight: 300;
      left: -1em;
      top: 1px;
      opacity: 0.3;
    }
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Scopes = ({ title, scopes }) => {
  const allScopes = scopes.split(",");
  const formattedScopes = allScopes.map((scope) => {
    const newScope = SCOPES.find((item) => item.id === scope);
    return newScope;
  });
  const titleId = title && title.toLowerCase().replace(" ", "-");
  return (
    <>
      {title && (
        <h4 id={titleId} className="heading">
          <HeadingLink href={`#${titleId}`}>{title}</HeadingLink>
        </h4>
      )}
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Scope</th>
              <th>role</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {formattedScopes.map((scope, index) => (
              <tr key={`scope-${titleId}-${index}`}>
                <td>
                  <code className="language-text">{scope.id}</code>
                </td>
                <td>{scope.role}</td>
                <td>{scope.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default Scopes;
