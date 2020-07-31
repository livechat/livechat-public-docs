import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = ({ headings, bodyItems }) => {
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={`heading-${index}`}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyItems.map((row, index) => (
            <tr key={`row-${index}`}>{row.map((item, index) => (
              <td key={`item-${index}`}>{item}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}

Table.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  bodyItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
}

export default Table;
