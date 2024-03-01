import "@asyncapi/react-component/styles/default.min.css";
import specs from "../../configs/asyncapi/specs";
import AsyncApiComponent from "@asyncapi/react-component";

export default function AsyncApi({ name }) {
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
    </>
  );
}
