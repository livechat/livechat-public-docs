"use client";
import dynamic from "next/dynamic";
import "@asyncapi/react-component/styles/default.min.css";
import specs from "../../configs/asyncapi/specs";
import { useLayoutEffect, useState } from "react";

const AsyncApiComponent = dynamic(
  () => import("@asyncapi/react-component/browser"),
  { ssr: false }
);

export default function AsyncApi({ name }) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useLayoutEffect(() => {
    setShowPlaceholder(false);
  }, []);

  return (
    <>
      <AsyncApiComponent
        schema={specs[name]}
        config={{
          show: {
            sidebar: false,
            info: true,
            operations: true,
            servers: true,
            messages: true,
            schemas: true,
            errors: true
          },
          expand: {
            messageExamples: false
          },
          sidebar: {
            showServers: "byDefault",
            showOperations: "byDefault"
          }
        }}
      />
      {showPlaceholder && <div>%%ASYNC_API_SSR%%</div>}
    </>
  );
}
