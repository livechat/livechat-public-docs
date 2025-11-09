export const ChangelogIcon = ({ fill, background, ...rest }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect width="30" height="30" rx="4" fill={background || "#003288"} />
    <g clipPath="url(#clip0_2989_1156)">
      <path
        d="M12 7V25M9 7H20C20.5304 7 21.0391 7.21071 21.4142 7.58579C21.7893 7.96086 22 8.46957 22 9V21C22 21.5304 21.7893 22.0391 21.4142 22.4142C21.0391 22.7893 20.5304 23 20 23H9C8.73478 23 8.48043 22.8946 8.29289 22.7071C8.10536 22.5196 8 22.2652 8 22V8C8 7.73478 8.10536 7.48043 8.29289 7.29289C8.48043 7.10536 8.73478 7 9 7V7Z"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11H18"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15H18"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2989_1156">
        <rect width="24" height="24" fill="white" transform="translate(3 3)" />
      </clipPath>
    </defs>
  </svg>
);
