import React, { useState, useEffect } from "react";
import { string } from "prop-types";
import { RedocStandalone } from "redoc";
import specs from "../../configs/redoc/specs";
import configs from "../../configs/redoc/configs";

const Redoc = ({ content, name }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    setShowPlaceholder(false);
  }, []);

  return (
    <>
      <RedocStandalone spec={specs[name]} options={configs[name]} />

      {process.env.NODE_ENV !== "development" && showPlaceholder && (
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      )}
    </>
  );
};

Redoc.propTypes = {
  content: string,
  name: string,
};

export default Redoc;
