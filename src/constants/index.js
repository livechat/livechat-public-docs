const VERSIONS_GROUPS = {
  DEFAULT: {
    STABLE_VERSION: "3.5",
    LEGACY_VERSIONS: ["3.4"],
    DEV_PREVIEW_VERSION: "3.6",
    DEPRECATED_VERSIONS: ["3.3"],
    ALL_VERSIONS: ["3.6", "3.5", "3.4", "3.3"],
  },
  "chat-widget": {
    STABLE_VERSION: "4.0",
    LEGACY_VERSIONS: ["1.0", "2.0", "3.0"],
    DEV_PREVIEW_VERSION: "",
    DEPRECATED_VERSIONS: [""],
    ALL_VERSIONS: ["1.0", "2.0", "3.0", "4.0"],
  },
  "data-reporting": {
    STABLE_VERSION: "3.5",
    LEGACY_VERSIONS: ["2.0", "3.4"],
    DEV_PREVIEW_VERSION: "3.6",
    DEPRECATED_VERSIONS: ["3.3"],
    ALL_VERSIONS: ["3.6", "3.5", "3.4", "3.3", "2.0"],
  },
  "customer-accounts-api": {
    STABLE_VERSION: "2.0",
    LEGACY_VERSIONS: ["1.0"],
    DEV_PREVIEW_VERSION: "",
    DEPRECATED_VERSIONS: [],
    ALL_VERSIONS: ["1.0", "2.0"],
  },
};

const AUTH_TYPE = {
  iframe: "iframe",
  popup: "popup",
  redirect: "redirect",
};

const REGION = {
  FRA: "fra",
  DAL: "dal",
  FRA_A: "fra-a",
  FRA_B: "fra-b",
};

const SCOPES = [
  {
    id: "agents--my:rw",
    description: "Write permission for my profile configuration",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "agents--my:ro",
    description: "Read permission for my profile configuration",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "agents--all:rw",
    description: "Write permission for all agents profiles configuration",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "agents--all:ro",
    description: "Read permission for all agents profiles configuration",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "access_rules:ro",
    description: "Read permission for auto chat scopes configuration",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "access_rules:rw",
    description: "Read/write permission for auto chat scopes configuration",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "agents-bot--my:ro",
    description:
      "Read permission for bot agents configuration (only my bot agents)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "agents-bot--my:rw",
    description:
      "Read/write permission for bot agents configuration (only my bot agents)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "agents-bot--all:ro",
    description:
      "Read permission for bot agents configuration (all in license)",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "agents-bot--all:rw",
    description:
      "Read/write permission for bot agents configuration (all in license, delete only)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "groups--my:rw",
    description: "Write/read permission for groups I'm a member of",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "groups--my:ro",
    description: "Read permission for groups I'm a member of",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "groups--all:rw",
    description: "Write/read permission for all groups within a license",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "groups--all:ro",
    description: "Read permission for all groups within a license",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats--all:ro",
    description:
      "Read permission for conversation and meta data of all license chats",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats--access:ro",
    description:
      "Read permission for conversation and meta data of chats with requester access",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats--my:ro",
    description:
      "Read permission for conversation and meta data of the chats with requester presence",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats.conversation--all:rw",
    description:
      "Write permission for conversation data of all license chats and Read permission for conversation and meta data of all license chats (chats--all:ro)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats.conversation--access:rw",
    description:
      "Write permission for conversation data of chats with requester access and Read permission for conversation and meta data of chats with requester access (chats--access:ro)",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats.conversation--my:rw",
    description:
      "Read/write permission for conversation data of chats with requester presence and Read permission for conversation and meta data of the chats with requester presence (chats--my:ro)",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats--all:rw",
    description:
      "Read/write permission for conversation and meta data of all license chats",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats--access:rw",
    description:
      "Read/write permission for conversation and meta data of chats with requester access",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "chats--my:rw",
    description:
      "Read/write permission for conversation and meta data of chats with requester presence",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "customers.ban:rw",
    description: "Permission for banning customers",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "customers:own",
    description:
      "Permission for owning and managing customer identities. It allows for acquiring a customer token (for both existing and new customers) and using it to call the Customer Chat API as a customer.",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "customers:ro",
    description: "Read permission for customers",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "customers:rw",
    description:
      "Read/write permission for existing customers. It also allows for creating new customers via the Agent Chat API.",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "multicast:rw",
    description: "Permission for multicast data to agents or customers",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "properties--my:ro",
    description:
      "Read permission for chat/thread/events properties configuration (only in my namespace)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "properties--my:rw",
    description:
      "Read/write permission for chat/thread/events properties configuration (only in my namespace)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "properties--all:ro",
    description:
      "Read permission for chat/thread/events properties configuration (all in license)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "properties.configuration:rw",
    description:
      "Read/write permission for license/group/chat/thread/event properties configuration (for all integrations owned by my license)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "tags--all:rw",
    description:
      "Read/write permission for tags configuration (all in license)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "tags--all:ro",
    description: "Read permission for tags configuration (all in license)",
    role: "not assigned to any role",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "tags--groups:rw",
    description: "Read/write permission for tags configuration (in my groups)",
    role: "not assigned to any role",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "tags--groups:ro",
    description: "Read permission for tags configuration (in my groups)",
    role: "normal",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "webhooks--my:ro",
    description:
      "Read permission for webhooks configuration (only my webhooks)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "webhooks--my:rw",
    description:
      "Read/write permission for webhooks configuration (only my webhooks)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "webhooks--all:ro",
    description: "Read permission for webhooks configuration (all in license)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "webhooks--all:rw",
    description:
      "Read/write permission for webhooks configuration (all in license, delete only)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "webhooks.state:ro",
    description: "Read permission for the webhook state (only my webhooks)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "webhooks.state:rw",
    description:
      "Read/write permission for enabling/disabling webhooks (only my webhooks)",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "webhooks.configuration:rw",
    description:
      "Read/write permission for adding and updating the webhook configuration",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "properties.license.value--my:rw",
    description:
      "Read/write permission for managing license properties (only my namespace)",
    role: "administrator",
    role_type: "secondary",
    product: "Livechat",
  },
  {
    id: "properties.license.value--all:rw",
    description:
      "Read/write permission for managing license properties (in all namespaces but with access only to their public properties)",
    role: "administrator",
    role_type: "secondary",
    product: "Livechat",
  },
  {
    id: "properties.group.value--my:rw",
    description:
      "Read/write permission for managing groups properties (only my namespace)",
    role: "administrator",
    role_type: "secondary",
    product: "Livechat",
  },
  {
    id: "properties.group.value--all:rw",
    description:
      "Read/write permission for managing groups properties (in all namespaces but with access only to their public properties)",
    role: "administrator",
    role_type: "secondary",
    product: "Livechat",
  },
  // ACCOUNT SCOPES
  {
    id: "accounts--my:ro",
    description: "Read permission for my account",
    role: "member",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "accounts--my:rw",
    description: "Read and modify permission for my account",
    role: "member",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "accounts--all:ro",
    description: "Read permission for all accounts in an organization",
    role: "member",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "accounts--all:rw",
    description: "Read and modify permission for all accounts",
    role: "administrator",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "accounts--all:rc",
    description: "Create and read accounts (modification is denied)",
    role: "member",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "accounts.roles--all:ro",
    description: "Read all accounts roles",
    role: "member",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "accounts.roles--all:rw",
    description: "Read and modify all accounts roles",
    role: "administrator",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "accounts.roles.lc--all:rw",
    description:
      "Read and modify all account roles within the LiveChat product",
    role: "administrator",
    role_type: "secondary",
    product: "LiveChat",
  },
  {
    id: "sessions--my:ro",
    description: "Read my sessions",
    role: "member",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "sessions--my:rw",
    description: "Read and modify my sessions",
    role: "member",
    role_type: "primary",
    product: "Accounts",
  },
  {
    id: "organization--my:rw",
    description: "Read and modify organization settings",
    role: "owner",
    role_type: "primary",
    product: "Accounts",
  },
];

const ERRORS = [
  {
    id: "authentication",
    message: "Authentication error",
    description: "An invalid or expired access token.",
  },
  {
    id: "authorization",
    message: "Authorization error",
    description: "User is not allowed to perform the action.",
  },
  {
    id: "customer_banned",
    message: "Customer is banned",
    description: "The customer had been banned.",
  },
  {
    id: "entity_too_large",
    message: "Upload limit exceeded (10MB).",
    description: "Client's request is too large.",
  },
  {
    id: "greeting_not_found",
    message: "Greeting not found",
    description: "",
  },
  {
    id: "group_not_found",
    message: "Group not found",
    description: "",
  },
  {
    id: "group_offline",
    message: "Group is offline",
    description: "Thrown in response to Get Predicted Agent.",
  },
  {
    id: "group_unavailable",
    message: "No agent available for group",
    description:
      "Thrown in response to Get Predicted Agent. The group is online, but there are no available Agents.",
  },
  {
    id: "groups_offline",
    message: "Groups offline",
    description: "",
  },
  {
    id: "internal",
    message: "Internal server error",
    description: "",
  },
  {
    id: "license_expired",
    message: "License expired",
    description: "The end of license trial or subcription.",
  },
  {
    id: "license_not_found",
    message: "License not found",
    description: "License with the specified ID doesn't exist.",
  },
  {
    id: "limit_reached",
    message: "Limit reached",
    description:
      "Resource cannot be created/modified because the change would exceed the limit",
  },
  {
    id: "misdirected_request",
    message: "Wrong region",
    description:
      "Client's request should be performed to another region. The correct region is returned in the optional data object – this is where the client should be connected.",
  },
  {
    id: "request_timeout",
    message: "Request timed out",
    description: "Timeout threshold is 15 seconds.",
  },
  {
    id: "service_unavailable",
    message: "Service unavailable",
    description: "New requests are temporarily not being accepted.",
  },
  {
    id: "unsupported_version",
    message: "Cannot call unsupported API versions.",
    description: "Unsupported protocol version.",
  },
  {
    id: "users_limit_reached",
    message: "Users limit reached",
    description:
      "Displayed on the attempt of logging in. The limit of online Customers for a given license has been reached.",
  },
  {
    id: "validation",
    message: "Wrong format of request",
    description: "",
  },
  {
    id: "wrong_product_version",
    message: "Wrong product version",
    description: "License is not LiveChat 3 (probably still LiveChat 2).",
  },
  {
    id: "chat_inactive",
    message: "Chat is inactive",
    description:
      "An action that requires an active thread performed on a chat with no active threads.",
  },
  {
    id: "too_many_requests",
    message: "Too many requests",
    description:
      "The request's rate limit was exceeded. It'll be unblocked automatically after some time.",
  },
  {
    id: "pending_requests_limit_reached",
    message: "Requests limit reached",
    description:
      "The limit of pending requests within one websocket connection has been reached. The limit is 10.",
  },
  {
    id: "requester_already_offline",
    message: "Requester is already offline",
    description:
      "The method is only allowed for the logged in Agents (via RTM API).",
  },
  {
    id: "requester_awaiting_approval",
    message: "Requester awaiting approval",
    description: "A new Agent hasn't been approved by the license owner yet.",
  },
  {
    id: "requester_suspended",
    message: "Requester suspended",
    description:
      "The rights of a given Agent have been withdrawn by the license owner.",
  },
  {
    id: "seats_limit_exceeded",
    message: "Seats limit exceeded",
    description:
      "Displayed on the attempt of logging in. All seats within a given license are already taken.",
  },
  {
    id: "agent_offline",
    message: "Agent offline",
    description:
      "The server couldn't process the request because the agent was offline.",
  },
  {
    id: "not_allowed",
    message: "Not allowed",
    description: "The action is not allowed.",
  },
  {
    id: "chat_anonymized",
    message: "Chat anonymized",
    description: "The request couldn't be performed on an anonymized chat.",
  },
  {
    id: "already_exists",
    message: "Already exists",
    description: "It's impossible to create the resource as it already exists.",
  },
  {
    id: "not_found",
    message: "Not found",
    description: "The requested resource wasn't found.",
  },
  {
    id: "transfer_ownership",
    message: "Invalid transfer ownership request",
    description:
      "Ownership cannot be transfered to this account (bot, suspended agent).",
  },
  {
    id: "ownership_transfer",
    message: "Invalid transfer ownership request",
    description:
      "Ownership cannot be transfered to this account (bot, suspended agent).",
  },
  {
    id: "missing_access",
    message: "Missing access",
    description: "The requester doesn't have access to a given resource.",
  },
];

const RATING_TEXT = {
  BAD: "BAD",
  GOOD: "GOOD",
};

const RATING_POSITION = {
  TOP: "top",
  BOTTOM: "bottom",
};

const RATES = [RATING_TEXT.GOOD, RATING_TEXT.BAD];

// Hidden pages. They are not displayed in the search results.
const EXCLUDED_SEARCH_RESULTS = [
  "/messaging/apple-messages-for-business",
  "/management/configuration-api/v2.0",
  "/management/limits",
];

// Some search results are unclear. Sometimes there's missing information
// about which API the result is related to.
const UNCLEAR_SEARCH_MATCHES = [
  {
    regex: /customer-chat-api/g,
    content: "Customer Chat API",
  },
  {
    regex: /agent-chat-api/g,
    content: "Agent Chat API",
  },
  {
    regex: /management/g,
    content: "Configuration API",
  },
  { regex: /data-reporting/g, content: "Reports API" },
  { regex: /customer-sdk/g, content: "Customer SDK" },
];

const constants = {
  VERSIONS_GROUPS,
  SCOPES,
  ERRORS,
  AUTH_TYPE,
  REGION,
  RATING_TEXT,
  RATING_POSITION,
  RATES,
  EXCLUDED_SEARCH_RESULTS,
  UNCLEAR_SEARCH_MATCHES,
};

module.exports = constants;
