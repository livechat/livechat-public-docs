import React from "react";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
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
    margin: 0 0 5px 0;
  }
  label + div {
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

PageHeader.propTypes = {
  title: PropTypes.string
}

export default PageHeader;
