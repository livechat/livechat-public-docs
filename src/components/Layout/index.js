import React from "react";
import { node } from "prop-types";

const Layout = ({ children, meta }) => {
  return (
    <div>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
