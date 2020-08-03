import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from 'uuid';

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
            {headings.map((heading) => (
              <th key={`heading-${uuidv4()}`}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyItems.map((row) => (
            <tr key={`row-${uuidv4()}`}>{row.map((item) => (
              <td key={`item-${uuidv4()}`}>{item}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}

Table.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  bodyItems: PropTypes.array.isRequired
}

export default Table;
