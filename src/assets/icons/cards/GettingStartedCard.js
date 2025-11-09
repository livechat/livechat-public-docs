export const GettingStartedCardIcon = ({ fill, background, ...rest }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect width="30" height="30" rx="4" fill={background || "#FFD000"} />
    <g clipPath="url(#clip0_2989_1125)">
      <path
        d="M15 24C17.3869 24 19.6761 23.0518 21.364 21.364C23.0518 19.6761 24 17.3869 24 15C24 12.6131 23.0518 10.3239 21.364 8.63604C19.6761 6.94821 17.3869 6 15 6C12.6131 6 10.3239 6.94821 8.63604 8.63604C6.94821 10.3239 6 12.6131 6 15C6 17.3869 6.94821 19.6761 8.63604 21.364C10.3239 23.0518 12.6131 24 15 24Z"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7773 11.5182C13.4451 11.2967 13 11.5349 13 11.9343L13 18.0657C13 18.4651 13.4451 18.7033 13.7774 18.4818L18.376 15.416C18.6728 15.2181 18.6728 14.7819 18.376 14.584L13.7773 11.5182Z"
        fill={fill || "white"}
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2989_1125">
        <rect width="24" height="24" fill="white" transform="translate(3 3)" />
      </clipPath>
    </defs>
  </svg>
);
