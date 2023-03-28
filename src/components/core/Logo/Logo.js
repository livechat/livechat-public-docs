/** @jsx jsx */ import { jsx, css } from "@emotion/core";

const wrapperCss = css`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 0.8em;
  height: 40px;

  .logo {
    margin: 0;
    font-size: 2.5em;
    font-weight: 600;
    height: 40px;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .adjacent {
    margin: 0;
    margin-top: 4px;
    font-size: 1.8em;
    font-weight: 600;
    line-height: 34px;

    display: flex;
    align-items: center;
    letter-spacing: -0.5px;
  }

  .carrier {
    overflow: hidden;
    margin-top: 8px;
    height: 40px;
    font-weight: 700;
    animation-name: blink;
    animation-duration: 0.9s;
    animation-iteration-count: infinite;
  }

  @keyframes blink {
    0% {
      opacity: 100;
    }
    50% {
      opacity: 100;
    }
    51% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Logo = ({ adjacent, style }) => (
  <header css={wrapperCss} style={style}>
    <span className="logo">
      text<span className="carrier">&#124;</span>
    </span>
    {adjacent && <span className="adjacent">{adjacent}</span>}
  </header>
);

export default Logo;
