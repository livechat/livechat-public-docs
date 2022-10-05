import React, { useState, useEffect } from "react";
import { RedocStandalone } from "redoc";
import specs from "../../configs/redoc/specs";
import configs from "../../configs/redoc/configs";

const Redoc = ({ name }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    setShowPlaceholder(false);
  }, []);

  return (
    <>
      <RedocStandalone spec={specs[name]} options={configs[name]} />
      {showPlaceholder && <div>%%REDOC_SSR%%</div>}
    </>
  );
};

export default Redoc;
