import React from "react";
import styled from "@emotion/styled";
import { string } from "prop-types";

import Rating from "../Rating";

import SecondGrader from "components/SecondGrader";
import { useAuth } from "contexts/auth";

import { RATING_POSITION } from "../../../constant";
import useMediaQuery from "hooks/useMediaQuery";

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

const PageHeader = ({ title }) => {
  const { isAuthorized } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const showSecondGrader = isAuthorized && !isMobile;

  return (
    <PageHeaderWrapper>
      <PageTitle>
        <span>{title}</span>
        <StyledRating position={RATING_POSITION.TOP} />
      </PageTitle>
      {showSecondGrader && <SecondGrader />}
    </PageHeaderWrapper>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
};

export default PageHeader;
