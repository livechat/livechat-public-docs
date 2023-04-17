/** @jsx jsx */ import { jsx, css } from "@emotion/core";

const wrapperCss = css`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 0.8em;
  height: 40px;

  .logo {
    margin: 0;
    font-size: 2em;
    font-weight: 500;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
  }

  .adjacent {
    margin: 0;
    font-size: 1.8em;
    font-weight: 500;
    line-height: 34px;

    display: flex;
    align-items: center;
    letter-spacing: -0.5px;
  }

  .carrier {
    font-weight: 500;
    animation-name: blink;
    animation-duration: 0.9s;
    animation-iteration-count: infinite;
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
