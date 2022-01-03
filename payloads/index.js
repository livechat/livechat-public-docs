import * as v3_1_payloads_agent from "./messaging/v3.1/agent-chat-api/index";
import * as v3_2_payloads_agent from "./messaging/v3.2/agent-chat-api/index";
import * as v3_2_payloads_customer from "./messaging/v3.2/customer-chat-api/index";
import * as v3_2_payloads_configuration from "./management/v3.2/configuration-api/index";
import * as v3_2_payloads_reports from "./data-reporting/v3.2/reports-api/index";
import * as v3_3_payloads_agent from "./messaging/v3.3/agent-chat-api/index";
import * as v3_3_payloads_customer from "./messaging/v3.3/customer-chat-api/index";
import * as v3_3_payloads_configuration from "./management/v3.3/configuration-api/index";
import * as v3_3_payloads_reports from "./data-reporting/v3.3/reports-api/index";
import * as v3_4_payloads_agent from "./messaging/v3.4/agent-chat-api/index";
import * as v3_4_payloads_customer from "./messaging/v3.4/customer-chat-api/index";
import * as v3_4_payloads_configuration from "./management/v3.4/configuration-api/index";
import * as v3_4_payloads_reports from "./data-reporting/v3.4/reports-api/index";
import * as v3_5_payloads_agent from "./messaging/v3.5/agent-chat-api/index";
import * as v3_5_payloads_customer from "./messaging/v3.5/customer-chat-api/index";
import * as v3_5_payloads_configuration from "./management/v3.5/configuration-api/index";
import * as v3_5_payloads_reports from "./data-reporting/v3.5/reports-api/index";

const v3_1 = {
  agent: { ...v3_1_payloads_agent },
};

const v3_2 = {
  agent: { ...v3_2_payloads_agent },
  customer: { ...v3_2_payloads_customer },
  configuration: { ...v3_2_payloads_configuration },
  reports: { ...v3_2_payloads_reports },
};

const v3_3 = {
  agent: { ...v3_3_payloads_agent },
  customer: { ...v3_3_payloads_customer },
  configuration: { ...v3_3_payloads_configuration },
  reports: { ...v3_3_payloads_reports },
};

const v3_4 = {
  agent: { ...v3_4_payloads_agent },
  customer: { ...v3_4_payloads_customer },
  configuration: { ...v3_4_payloads_configuration },
  reports: { ...v3_4_payloads_reports },
};

const v3_5 = {
  agent: { ...v3_5_payloads_agent },
  customer: { ...v3_5_payloads_customer },
  configuration: { ...v3_5_payloads_configuration },
  reports: { ...v3_5_payloads_reports },
};

const payloads = {
  "v3.1": v3_1,
  "v3.2": v3_2,
  "v3.3": v3_3,
  "v3.4": v3_4,
  "v3.5": v3_5,
};

export default payloads;
