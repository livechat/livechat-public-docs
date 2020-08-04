import React from "react";
import { ERRORS } from "../../constant";
import Table from "./Table";

const Errors = ({ errors }) => {
  const allErrors = errors.split(",");
  const formattedErrors = allErrors.map((error) => {
    const newError = ERRORS.find((item) => item.id === error);

    return [
      <code className="language-text">{newError.id}</code>,
      newError.message,
      newError.description
    ];
  })
  return <Table headings={["Error type", "Default message", "Description"]} bodyItems={formattedErrors} />
};

export default Errors;
