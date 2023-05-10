export const TextApiIcon = ({ fill, background, ...rest }) => (
  <svg
    width="30"
    height="31"
    viewBox="0 0 30 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect
      y="0.330078"
      width="30"
      height="30"
      rx="4"
      fill={background || "#29292E"}
    />
    <path
      d="M13.6526 22.1722H15.6316V19.8564H14.4737C13.7158 19.8564 13.4421 19.5617 13.4421 18.8459V13.5406H15.7789V11.2248H13.4421V8.23534H10.5579V11.2248H9V13.5406H10.5579V19.0564C10.5579 20.9932 11.5474 22.1722 13.6526 22.1722Z"
      fill={fill || "white"}
    />
    <path
      d="M18.6866 25.3301H21.1287V5.33008H18.6866V25.3301Z"
      fill={fill || "white"}
    />
  </svg>
);
