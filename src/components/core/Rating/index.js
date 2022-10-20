import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import ThumbIcon from "./ThumbIcon";
import FeedbackModal from "./modal";
import { RATES } from "../../../constant";
import { RatingContext } from "../../../contexts";

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
  color: #424D57;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
    & #rating-1 path {
      transform: rotate(180deg);
    }
`;

const Rating = ({ label, className, position }) => {
  const { selectedRating, saveRating } = useContext(RatingContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRateClick = (index) => {
    saveRating(index, position);
    if (RATES[index] === "It's not OK") {
      setModalOpen(true);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Wrapper className={className}>
      <Label>{label}</Label>
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
  label: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.string
}

export default Rating;
