import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import ThumbIcon from "./ThumbIcon";
import FeedbackModal from "./modal";
import { RATES, RATING_TEXT } from "../../../constant";
import { RatingContext } from "../../../contexts";
import { useAuth } from "contexts/auth";

const Wrapper = styled.div`
  height: 25px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Label = styled.label`
  font-family: "Source Sans Pro";
  font-size: 14px;
  letter-spacing: 0;
  color: #424D57;
`;

const Container = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
    & #rating-1 path {
      transform: rotate(180deg);
    }
`;

const Rating = ({ className, position }) => {
  const { selectedRating, saveRating } = useContext(RatingContext);
  const { user: { email } } = useAuth()
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRateClick = (index) => {
    saveRating(index, position, email);
    if (RATES[index] === RATING_TEXT.BAD) {
      setModalOpen(true);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Wrapper className={className}>
      <Label>Was this page helpful?</Label>
      <Container>
      {RATES.map((rate, index) => {
        const isSelected = selectedRating === index;
        return (
          <ThumbIcon
            key={rate}
            handleClick={() => handleRateClick(index)}
            isSelected={isSelected}
            id={`rating-${index}`}
          />
        );
      })} 
      </Container>
      {isModalOpen && (
        <FeedbackModal
          isOpen={isModalOpen}
          handleModalClose={() => setModalOpen(false)}
        />
      )}
    </Wrapper>
  );
};

Rating.propTypes = {
  className: PropTypes.string,
  position: PropTypes.string
}

export default Rating;
