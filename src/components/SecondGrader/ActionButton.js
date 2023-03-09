import { func, string } from "prop-types";
import styled from "@emotion/styled";

const Button = styled.button`
  all: unset;
  font-size: 15px;
  font-weight: 400;
  color: #4284f5;
  transition: transform 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const ActionButton = ({ handleClick, label }) => (
  <Button onClick={handleClick}>{label}</Button>
);

ActionButton.propTypes = {
  handleClick: func.isRequired,
  label: string.isRequired,
};

export default ActionButton;
