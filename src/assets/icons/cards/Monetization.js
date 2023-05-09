export const MonetizationIcon = ({ fill, background, ...rest }) => (
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
      fill={background || "#9061CC"}
    />
    <g clipPath="url(#clip0_1606_12132)">
      <path
        d="M12.5 16.9968C12.5 18.3777 14.7383 19.4968 17.5 19.4968C20.2617 19.4968 22.5 18.3777 22.5 16.9968C22.5 15.616 20.2617 14.4968 17.5 14.4968C14.7383 14.4968 12.5 15.616 12.5 16.9968Z"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 16.9968V20.3302C12.5 21.7102 14.7383 22.8302 17.5 22.8302C20.2617 22.8302 22.5 21.7102 22.5 20.3302V16.9968"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.3301C7.5 11.2234 8.45333 12.0484 10 12.4951C11.5467 12.9417 13.4533 12.9417 15 12.4951C16.5467 12.0484 17.5 11.2234 17.5 10.3301C17.5 9.43674 16.5467 8.61174 15 8.16508C13.4533 7.71841 11.5467 7.71841 10 8.16508C8.45333 8.61174 7.5 9.43674 7.5 10.3301Z"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.3301V18.6634C7.5 19.4034 8.14333 19.8717 9.16667 20.3301"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 14.4968C7.5 15.2368 8.14333 15.7052 9.16667 16.1635"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1606_12132">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(5 5.33008)"
        />
      </clipPath>
    </defs>
  </svg>
);
