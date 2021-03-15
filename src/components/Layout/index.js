import React from "react";
import { node } from "prop-types";
import Head from "next/head";

const Layout = ({ children, meta }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
