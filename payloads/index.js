import * as v3_2_payloads from "./v3.2";
import * as v3_3_payloads from "./v3.3";

const v3_2 = {
  ...v3_2_payloads,
};

const v3_3 = {
  ...v3_3_payloads,
};

const payloads = {
  "v3.2": v3_2,
  "v3.3": v3_3,
};

export default payloads;
