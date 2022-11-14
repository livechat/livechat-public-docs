import styled from "@emotion/styled";
import { bool, func, string } from 'prop-types';

import { ThumbFilledIcon as ThumbFilled } from "assets/icons/ThumbFilled";
import { ThumbHollowIcon } from "assets/icons/ThumbHollow";

const Container = styled.div`
  cursor: pointer;
  display: flex;
`;

const ThumbHollow = styled(ThumbHollowIcon)`
  :hover {
    > path {
      fill: #4379D6;
    }
  }
`;

const ThumbIcon = ({ id, isSelected, handleClick }) => {
  return (
    <Container id={id} onClick={handleClick}>
      {isSelected ? <ThumbFilled /> : <ThumbHollow />}
    </Container>
  );
};

ThumbIcon.propTypes = {
  id: string.isRequired,
  isSelected: bool.isRequired,
  handleClick: func.isRequired
}

export default ThumbIcon;
