import React from "react";
import { ERRORS } from "../../constant";
import { TableWrapper, HeadingLink } from './Scopes'

const Errors = ({ title, errors }) => {
  const allErrors = errors.split(",");
  const formattedErrors = allErrors.map((error) => {
    const newError = ERRORS.find((item) => item.id === error);
    return newError;
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
              <th>Error type</th>
              <th>Default message</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {formattedErrors.map((error, index) => (
              <tr key={`error-${titleId}-${index}`}>
                <td>
                  <code className="language-text">{error.id}</code>
                </td>
                <td>{error.message}</td>
                <td>{error.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default Errors;
