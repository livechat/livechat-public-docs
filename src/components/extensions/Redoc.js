import React from "react";
import { RedocStandalone } from "redoc";
import authorizationSpec from "../../configs/openapi/authorization.yml";

const Redoc = () => {
  return (
    <RedocStandalone
      spec={authorizationSpec}
      options={{
        scrollYOffset: "220",
        disableSearch: true,
        hideLoading: true,
        theme: {
          colors: {
            primary: {
              main: "#424d57",
            },
          },
          typography: {
            fontSize: "16px",
            fontFamily:
              "Source Sans Pro,Helvetica Neue,Helvetica,Roboto,sans-serif",
            headings: {
              fontFamily:
                "Source Sans Pro,Helvetica Neue,Helvetica,Roboto,sans-serif",
            },
          },
          sidebar: {
            width: "250px",
            backgroundColor: "#f6f6f7",
            textColor: "#424d57",
            activeTextColor: "#4384f5",
            arrow: {
              size: "1.2em",
            },
          },
        },
      }}
    />
  );
};

export default Redoc;
