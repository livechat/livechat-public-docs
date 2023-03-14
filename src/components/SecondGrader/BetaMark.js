import styled from "@emotion/styled";
import { string, bool } from "prop-types";

const BetaLabel = styled.div`
  background: linear-gradient(255deg, #8609ff, #0066ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${(props) => (props.container ? 12 : 16)}px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: default;
`;

const BetaContainer = styled.div`
  background: #f7f7f7;
  border-radius: 4px;
  padding: 2px 8px;
`;

const BetaMark = ({ label, container }) => {
  if (container) {
    return (
      <BetaContainer>
        <BetaLabel container>{label}</BetaLabel>
      </BetaContainer>
    );
  }
  return <BetaLabel>{label}</BetaLabel>;
};

BetaMark.propTypes = {
  label: string.isRequired,
  container: bool,
};

export default BetaMark;
