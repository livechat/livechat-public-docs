import React from "react";
import styled from "@emotion/styled";
import { string } from "prop-types";

import Rating from "../Rating";

import { RATING_POSITION } from "../../../constants";
import { convertToSlug } from "../../../utils";

const PageTitle = styled.h2`
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-weight: 500;
  text-rendering: optimizeLegibility;
  font-size: 2.25rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
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

const PageHeader = ({ title }) => (
  <PageHeaderWrapper>
    <PageTitle id={convertToSlug(title)}>
      <span>{title}</span>
      <StyledRating position={RATING_POSITION.TOP} />
    </PageTitle>
  </PageHeaderWrapper>
);

PageHeader.propTypes = {
  title: string.isRequired,
};

export default PageHeader;
