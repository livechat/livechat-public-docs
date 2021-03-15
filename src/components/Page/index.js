import React, { useState } from "react";
import { node, object } from "prop-types";

import Layout from "../Layout";

const Page = ({ frontMatter, children }) => {
  console.log("frontMatter", frontMatter);
  return <Layout>{children}</Layout>;
};

Page.propTypes = {
  children: node.isRequired,
  meta: object,
};

export default Page;
