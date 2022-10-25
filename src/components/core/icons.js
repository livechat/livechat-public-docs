import React from "react";
import styled from "@emotion/styled";
import PlayCircleOutline from "react-material-icon-svg/dist/PlayCircleOutline";
import Lock from "react-material-icon-svg/dist/Lock";
import Forum from "react-material-icon-svg/dist/Forum";
import Laptop from "react-material-icon-svg/dist/Laptop";
import MessageProcessing from "react-material-icon-svg/dist/MessageProcessing";
import Cog from "react-material-icon-svg/dist/Cog";
import Poll from "react-material-icon-svg/dist/Poll";
import CurrencyUsd from "react-material-icon-svg/dist/CurrencyUsd";

export const HashtagIcon = (props) => (
  <svg
    {...props}
    width="10px"
    height="10px"
    viewBox="0 0 10 10"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M2.25416667,7.75 L2.55,6.08333333 L0.883333333,6.08333333 L1.02916667,5.25 L2.69583333,5.25 L3.1375,2.75 L1.47083333,2.75 L1.61666667,1.91666667 L3.28333333,1.91666667 L3.57916667,0.25 L4.4125,0.25 L4.11666667,1.91666667 L6.61666667,1.91666667 L6.9125,0.25 L7.74583333,0.25 L7.45,1.91666667 L9.11666667,1.91666667 L8.97083333,2.75 L7.30416667,2.75 L6.8625,5.25 L8.52916667,5.25 L8.38333333,6.08333333 L6.71666667,6.08333333 L6.42083333,7.75 L5.5875,7.75 L5.88333333,6.08333333 L3.38333333,6.08333333 L3.0875,7.75 L2.25416667,7.75 L2.25416667,7.75 Z M3.97083333,2.75 L3.52916667,5.25 L6.02916667,5.25 L6.47083333,2.75 L3.97083333,2.75 Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const HomeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const ChevronRight = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      fill="currentColor"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const ArticleIcon = (props) => (
  <svg
    {...props}
    width="12px"
    height="16px"
    viewBox="0 0 12 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M1.5,0.5 C0.675,0.5 0.0075,1.175 0.0075,2 L0,14 C0,14.825 0.6675,15.5 1.4925,15.5 L10.5,15.5 C11.325,15.5 12,14.825 12,14 L12,5 L7.5,0.5 L1.5,0.5 Z M6.75,5.75 L6.75,1.625 L10.875,5.75 L6.75,5.75 Z"
      fillRule="nonzero"
      fill="currentColor"
    />
  </svg>
);

const IconWrapper = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

export const CategoryIcon = ({ category, ...props }) => {
  switch (category) {
    case "getting-started":
      return (
        <IconWrapper>
          <PlayCircleOutline fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );
    case "authorization":
      return (
        <IconWrapper>
          <Lock fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );
    case "messaging":
      return (
        <IconWrapper>
          <Forum fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );

    case "extending-agent-app":
      return (
        <IconWrapper>
          <Laptop fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );

    case "extending-chat-widget":
      return (
        <IconWrapper>
          <MessageProcessing fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );
    case "management":
      return (
        <IconWrapper>
          <Cog fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );

    case "data-reporting":
      return (
        <IconWrapper>
          <Poll fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );

    case "monetization":
      return (
        <IconWrapper>
          <CurrencyUsd fill="#ffffff" width="18px" height="18px" />
        </IconWrapper>
      );

    default:
      return null;
  }
};

export const LiveChatLogo = (props) => (
  <svg
    {...props}
    width="123"
    height="30"
    viewBox="0 0 123 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      opacity="0.3"
      width="121.25"
      height="30"
      fill="white"
      fillOpacity="0.01"
    />
    <path
      d="M27.3285 19.5947C27.1889 21.2278 26.4364 22.7476 25.2224 23.8488C24.0083 24.9501 22.4225 25.5511 20.7835 25.5312H17.1741L10.2991 30V25.5312L17.1741 21.0625H20.7904C21.3021 21.081 21.8017 20.9046 22.1883 20.569C22.575 20.2334 22.8199 19.7636 22.8735 19.2544C23.0837 15.8195 23.0664 12.3745 22.822 8.94187C22.7806 8.48399 22.5758 8.05629 22.2451 7.73693C21.9143 7.41757 21.4797 7.22787 21.0207 7.2025C18.6763 7.05813 16.2082 6.96875 13.7366 6.96875C11.2651 6.96875 8.79695 7.05125 6.45258 7.21625C5.99353 7.24162 5.55893 7.43132 5.22821 7.75068C4.89749 8.07004 4.69272 8.49774 4.65132 8.95563C4.40684 12.3882 4.38961 15.8332 4.59976 19.2681C4.65665 19.7748 4.90293 20.2413 5.28924 20.5741C5.67555 20.9068 6.17336 21.0813 6.68289 21.0625H10.2991V25.5312H6.68976C5.0526 25.5475 3.46977 24.9445 2.25854 23.8429C1.04731 22.7413 0.297181 21.2226 0.158512 19.5913C-0.0688345 15.9275 -0.0516088 12.2527 0.210075 8.59125C0.340007 7.07289 1.00827 5.65095 2.09431 4.58193C3.18035 3.51291 4.61267 2.86719 6.13289 2.76125C8.58039 2.58594 11.1585 2.5 13.7366 2.5C16.3148 2.5 18.8929 2.58594 21.3404 2.76125C22.8652 2.86446 24.3026 3.51075 25.3917 4.58288C26.4809 5.65501 27.1497 7.08199 27.277 8.605C27.5382 12.263 27.5554 15.9344 27.3285 19.5947Z"
      fill="#FF5100"
    />
    <path
      d="M34.3616 22.1144H45.1623V19.4056H37.6341V5.75186H34.3616V22.1144Z"
      fill="#ffffff"
    />
    <path
      d="M46.7366 22.1144H49.9163V9.95937H46.7366V22.1144ZM46.4788 6.78312C46.4994 7.25936 46.703 7.70928 47.0473 8.039C47.3915 8.36872 47.8498 8.55278 48.3265 8.55278C48.8032 8.55278 49.2614 8.36872 49.6057 8.039C49.95 7.70928 50.1536 7.25936 50.1741 6.78312C50.1849 6.53378 50.1451 6.28484 50.0571 6.0513C49.9691 5.81775 49.8347 5.60444 49.6621 5.4242C49.4895 5.24396 49.2821 5.10053 49.0526 5.00254C48.8231 4.90455 48.5761 4.85403 48.3265 4.85403C48.0769 4.85403 47.8299 4.90455 47.6004 5.00254C47.3709 5.10053 47.1635 5.24396 46.9909 5.4242C46.8183 5.60444 46.6839 5.81775 46.5959 6.0513C46.5079 6.28484 46.4681 6.53378 46.4788 6.78312V6.78312Z"
      fill="#ffffff"
    />
    <path
      d="M62.3704 9.95935H59.1907L56.5748 18.8659L53.9554 9.95935H50.7757L54.9007 22.1143H58.2179L62.3704 9.95935Z"
      fill="#ffffff"
    />
    <path
      d="M68.0491 22.3963C70.7372 22.3963 72.9132 20.7841 73.3325 18.5634H70.5516C70.2457 19.4056 69.4069 20.1069 68.0491 20.1069C66.2032 20.1069 65.4779 18.8659 65.4779 17.4394V17.1369H73.4254V15.0091C73.4254 12.0872 71.6035 9.68094 68.0044 9.68094C64.4054 9.68094 62.3944 12.0184 62.3944 15.315V16.9719C62.3876 20.375 64.6116 22.3963 68.0491 22.3963ZM65.471 14.7753C65.471 13.1391 66.1585 11.9256 67.9975 11.9256C69.7163 11.9256 70.4966 13.0703 70.4966 14.5897V14.8922H65.471V14.7753Z"
      fill="#ffffff"
    />
    <path
      d="M81.8679 22.4375C85.9929 22.4375 88.5538 19.6325 88.7188 16.2878H85.6801C85.4669 18.1338 84.3051 19.7494 81.8679 19.7494C79.135 19.7494 77.9663 17.8794 77.9663 15.26V12.6028C77.9663 9.98345 79.135 8.11345 81.8679 8.11345C84.2982 8.11345 85.4669 9.72564 85.6801 11.575H88.7188C88.5538 8.23032 86.0066 5.42532 81.8679 5.42532C76.935 5.42532 74.7144 8.58095 74.7144 12.7644V15.1019C74.7144 19.2888 76.935 22.4375 81.8679 22.4375Z"
      fill="#ffffff"
    />
    <path
      d="M90.4445 22.1143H93.6241V14.9162C93.6241 13.28 94.5351 12.4378 95.9617 12.4378C97.5051 12.4378 98.1823 13.445 98.1823 14.844V22.1143H101.362V14.3318C101.362 11.4581 99.7016 9.68091 97.0616 9.68091C95.4941 9.68091 94.2566 10.3684 93.6241 11.3997V5.0506H90.4445V22.1143Z"
      fill="#ffffff"
    />
    <path
      d="M107.429 22.3963C108.832 22.3963 110.375 21.8119 110.935 20.9938V22.1144H113.998V14.3559C113.998 11.5269 111.919 9.68094 108.88 9.68094C106.26 9.68094 104.366 10.9425 103.665 13.3041H106.611C106.938 12.6475 107.615 12.1594 108.715 12.1594C110.024 12.1594 110.819 12.9981 110.819 14.1222V15.7825C109.936 15.0945 108.844 14.7304 107.725 14.7513C104.803 14.7513 102.816 15.9681 102.816 18.6081C102.823 20.9697 104.693 22.3963 107.429 22.3963ZM108.247 20.2925C106.914 20.2925 105.91 19.6394 105.91 18.5153C105.91 17.3913 106.845 16.7966 108.34 16.7966C109.767 16.7966 110.819 17.4291 110.819 18.5153C110.819 19.6016 109.643 20.2925 108.247 20.2925V20.2925Z"
      fill="#ffffff"
    />
    <path
      d="M119.955 22.1144H122.152V19.5431H120.849C120.007 19.5431 119.704 19.2166 119.704 18.4225V12.5306H122.3V9.95937H119.704V6.64218H116.518V9.95937H114.799V12.5306H116.518V18.6562C116.518 20.8081 117.601 22.1144 119.955 22.1144Z"
      fill="#ffffff"
    />
  </svg>
);

export const LinkIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
      fill="currentColor"
    />
  </svg>
);

export const WarningIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
      fill="currentColor"
    />
  </svg>
);

export const CopyIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    height="18px"
    viewBox="0 0 24 24"
    width="18px"
  >
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"
      fill="currentColor"
    ></path>
  </svg>
);
