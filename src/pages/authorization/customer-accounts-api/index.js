import React from "react";
import fs from "fs";
import path from "path";
import PageRedoc from "../../../components/Page/PageRedoc";
import useCategoryMeta from "../../../hooks/useCategoryMeta";

const category = "authorization";
const slug = "customer-accounts-api";

const Page = ({ content }) => {
  const subcategoryMeta = useCategoryMeta(category).items.filter(
    (item) => item.slug === slug
  )[0];

  return (
    <PageRedoc
      name="customer-accounts-api"
      content={content}
      category={category}
      desc={subcategoryMeta.desc}
      title={subcategoryMeta.title}
    />
  );
};

export async function getStaticProps() {
  const basePath = path.join(process.cwd(), "tmp");
  const filePath = path.join(basePath, "redoc-customer-accounts-api.html");
  const content = fs.readFileSync(filePath, "utf8");

  return {
    props: {
      content,
    },
  };
}

export default Page;
