import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRouter } from "next/router";
import Twitter from "react-material-icon-svg/dist/Twitter";
import Github from "react-material-icon-svg/dist/Github";

import FooterBox from "./FooterBox";
import { Discord } from "../../../assets/icons/Discord";

const wrapperCss = (homePath) => css`
  background-color: #f6f6f7;
  color: #424d57;
  min-height: 248px;

  margin-bottom: 45px;
  @media (min-width: 768px) {
    margin-bottom: 0px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: start;
      flex-wrap: wrap;
      flex-basis: 50%;
    }
  }

  @media (min-width: 1024px) {
    > div {
      ${homePath && "max-width: 960px"};
      ${homePath && "margin: 0 auto"};
      ${!homePath && "margin: 0 260px"};
    }
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
    buttonIcon: <Twitter />,
    buttonCopy: "Twitter",
    buttonLink: process.env.NEXT_PUBLIC_TWITTER_LIVECHAT,
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
        <a href="mailto:developers@livechat.com">developers@livechat.com</a>
      </>
    ),
  },
];

const Footer = () => {
  const { pathname } = useRouter();
  console.log(`object`, pathname === "/");
  return (
    <div css={wrapperCss(pathname === "/")}>
      <div>
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
    </div>
  );
};

export default Footer;
