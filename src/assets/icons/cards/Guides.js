export const GuidesIcon = ({ fill, background, ...rest }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect width="30" height="30" rx="4" fill={background || "#328DFF"} />
    <g clipPath="url(#clip0_4028_587)">
      <path
        d="M25 12L15 8L5 12L15 16L25 12ZM25 12V18"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13.6V19C9 19.7957 9.63214 20.5587 10.7574 21.1213C11.8826 21.6839 13.4087 22 15 22C16.5913 22 18.1174 21.6839 19.2426 21.1213C20.3679 20.5587 21 19.7957 21 19V13.6"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4028_587">
        <rect width="24" height="24" fill="white" transform="translate(3 3)" />
      </clipPath>
    </defs>
  </svg>
);
