import React from "react";
import styled from "@emotion/styled";
import { string } from "prop-types";

import Rating from "../Rating";
import Bookmark from "../Bookmark";
import { RATING_POSITION } from "../../../constant";

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
    margin: 0 0 5px 0;
  }
  label + div {
    justify-content: flex-end;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const PageHeader = ({ title }) => (
  <PageHeaderWrapper>
    <PageTitle>
      <TitleWrapper>
        <span>{title}</span>
        <Bookmark />
      </TitleWrapper>
      <StyledRating position={RATING_POSITION.TOP} />
    </PageTitle>
  </PageHeaderWrapper>
);

PageHeader.propTypes = {
  title: string.isRequired,
};

export default PageHeader;
