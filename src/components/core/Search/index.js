import React, { useEffect } from "react";
import styled from "@emotion/styled";

import { Input } from "@livechat/design-system";
import { setupDocsearch } from "../../../utils";

export const SearchWrapper = styled.div`
  position: relative;

  &:before {
    content: "";
    width: 22px;
    height: 22px;
    display: block;
    position: absolute;
    color: #424d57;
    left: 8px;
    top: 7px;
    z-index: 100;
    background-image: url("data:image/svg+xml,%3Csvg height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' fill='%23879098'/%3E%3Cpath d='M0 0h24v24H0z' fill='none' /%3E%3C/svg%3E");
  }
`;

const StyledInput = styled(Input)`
  padding-left: 32px;
  width: 100%;
`;

export const Search = () => {
  useEffect(setupDocsearch, []);

  return (
    <SearchWrapper>
      <StyledInput type="text" id="search" placeholder="Search the docs..." />
    </SearchWrapper>
  );
};
