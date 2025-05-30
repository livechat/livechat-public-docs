import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Github from "react-material-icon-svg/dist/Github";

import FooterBox from "./FooterBox";
import { Discord } from "../../../assets/icons/Discord";
import { XIcon } from "../../../assets/icons/X";

const wrapperCss = () => css`
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  flex-wrap: wrap;

  background-color: #f6f6f7;
  color: #424d57;
  min-height: 248px;

  margin-bottom: 45px;
  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const footerData = [
  {
    title: "Join the community",
    content: "Get in direct contact with us through Discord.",
    buttonIcon: <Discord />,
    buttonCopy: "Discord",
    buttonLink: process.env.NEXT_PUBLIC_DISCORD_FOOTER_URL,
  },
  {
    title: "Follow us",
    content: "Follow our insightful tweets and interact with our content.",
    buttonIcon: <XIcon />,
    buttonCopy: "X (Twitter)",
    buttonLink: process.env.NEXT_PUBLIC_X_LIVECHAT,
  },
  {
    title: "Contribute",
    content: "See something that's wrong or unclear? Submit a pull request.",
    buttonIcon: <Github />,
    buttonCopy: "GitHub",
    buttonLink: process.env.NEXT_PUBLIC_GITHUB_LIVECHAT,
  },
  {
    title: "Contact us",
    content: (
      <>
        Want to share feedback? Reach us at:{" "}
        <a href="mailto:developers@text.com">developers@text.com</a>
      </>
    ),
  },
];

const Footer = () => {
  return (
    <div css={wrapperCss}>
      {footerData.map(
        ({ title, content, buttonCopy, buttonIcon, buttonLink }) => {
          return (
            <FooterBox
              key={`${title}`}
              title={title}
              content={content}
              buttonCopy={buttonCopy}
              buttonIcon={buttonIcon}
              buttonLink={buttonLink}
            />
          );
        }
      )}
    </div>
  );
};

export default Footer;
