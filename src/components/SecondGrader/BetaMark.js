import styled from "@emotion/styled";
import { string, bool } from "prop-types";

const BetaLabel = styled.div`
  background: linear-gradient(245deg, #8609ff, #0066ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  text-transform: uppercase;
`;

const BetaContainer = styled.div`
  background: linear-gradient(
    243.66deg,
    rgba(134, 9, 255, 0.1),
    rgba(0, 102, 255, 0.1)
  );
  border-radius: 4px;
  padding: 2px 8px;
`;

const BetaMark = ({ label, container }) => {
  if (container) {
    return (
      <BetaContainer>
        <BetaLabel>{label}</BetaLabel>
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
