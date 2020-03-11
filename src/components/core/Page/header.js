import React from "react";
import styled from "@emotion/styled";

import Rating from "../Rating";

const PageTitle = styled.h1`
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PageHeaderWrapper = styled.div`
  margin: 3em 0 1em;
  padding: 2em 0 1em;
`;

const PageSubtitle = styled.div`
  font-size: 14px;
  color: gray;
  margin-bottom: 1.45rem;
`;

const StyledRating = styled(Rating)`
  margin-top: 8px;

  > label {
    margin: 6px 10px 5px 0;
  }
`;

const PageHeader = ({ title, timeToRead }) => (
  <PageHeaderWrapper>
    <PageTitle>
      <span>{title}</span>
      <StyledRating label="Rate this page" />
    </PageTitle>
    <PageSubtitle>{timeToRead} minutes reading time</PageSubtitle>
  </PageHeaderWrapper>
);

export default PageHeader;
