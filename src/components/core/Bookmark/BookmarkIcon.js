import React from "react";
import styled from "@emotion/styled";
import { func } from "prop-types";

import { BookmarkHollowIcon } from "assets/icons/BookmarkHollow";
import { BookmarkFilledIcon } from "assets/icons/BookmarkFilled";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  margin-left: 20px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  :hover {
    background-color: #f6f6f7;
  }
`;

const BookmarkIcon = ({ isBookmarked, handleClick }) => {
  return (
    <Container onClick={handleClick}>
      {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkHollowIcon />}
    </Container>
  );
};

BookmarkIcon.propTypes = {
  handleClick: func.isRequired,
};

export default BookmarkIcon;
