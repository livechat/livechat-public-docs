import React from "react";
import styled from "@emotion/styled";
import { RATING_POSITION } from "../../../constant";
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

const StyledRating = styled(Rating)`
  margin-top: 8px;

  > label {
    margin: 6px 0 5px 0;
  }
  > div {
    justify-content: flex-end;
  }
`;

const PageHeader = ({ title }) => (
  <PageHeaderWrapper>
    <PageTitle>
      <span>{title}</span>
      <StyledRating position={RATING_POSITION.TOP}/>
    </PageTitle>
  </PageHeaderWrapper>
);

export default PageHeader;
