import React from "react";
import { ERRORS } from "../../constant";
import Table from "./Table";

const Errors = ({ errors }) => {
  const allErrors = errors.split(",");
  const formattedErrors = allErrors.map((error) => {
    const newError = ERRORS.find((item) => item.id === error);
    return newError;
  }).map((error) => {
    const errorArray = [];
    errorArray.push(<code className="language-text">{error.id}</code>)
    errorArray.push(error.message)
    errorArray.push(error.description)
    return errorArray;
  })
  return <Table headings={["Error type", "Default message", "Description"]} bodyItems={formattedErrors} />
};

export default Errors;
