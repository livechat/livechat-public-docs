const VERSIONS_GROUPS = {
  DEFAULT: {
    STABLE_VERSION: "3.2",
    LEGACY_VERSIONS: ["2.0", "3.1"],
    DEV_PREVIEW_VERSION: "3.3",
    ALL_VERSIONS: ["3.3", "3.2", "3.1", "2.0"],
  },
  "chat-widget": {
    STABLE_VERSION: "2.0",
    LEGACY_VERSIONS: ["1.0"],
    DEV_PREVIEW_VERSION: "",
    ALL_VERSIONS: ["1.0", "2.0"],
  },
};

const RATES = ["It's unsuable", "Rather poor", "It's OK", "Great", "Excellent"];

const SCROLL_OFFSET = 170;

const SCOPES = [
  {
    id: "agents--my:rw",
    description: "Write permission for my profile configuration",
    role: "normal",
  },
  {
    id: "agents--my:ro",
    description: "Read permission for my profile configuration",
    role: "normal",
  },
  {
    id: "agents--all:rw",
    description: "Write permission for all agents profiles configuration",
    role: "administrator",
  },
  {
    id: "agents--all:ro",
    description: "Read permission for all agents profiles configuration",
    role: "administrator",
  },
  {
    id: "access_rules:ro",
    description: "Read permission for auto chat scopes configuration",
    role: "administrator",
  },
  {
    id: "access_rules:rw",
    description: "Read/write permission for auto chat scopes configuration",
    role: "administrator",
  },
  {
    id: "accounts--all:rc",
    description:
      "Permission for creating, but not managing, new accounts in LiveChat Accounts",
    role: "normal",
  },
  {
    id: "agents-bot--my:ro",
    description:
      "Read permission for bot agents configuration (only my bot agents)",
    role: "administrator",
  },
  {
    id: "agents-bot--my:rw",
    description:
      "Read/write permission for bot agents configuration (only my bot agents)",
    role: "administrator",
  },
  {
    id: "agents-bot--all:ro",
    description:
      "Read permission for bot agents configuration (all in license)",
    role: "normal",
  },
  {
    id: "agents-bot--all:rw",
    description:
      "Read/write permission for bot agents configuration (all in license, delete only)",
    role: "administrator",
  },
  {
    id: "groups--my:rw",
    description: "Write/read permission for groups I'm a member of",
    role: "administrator",
  },
  {
    id: "groups--my:ro",
    description: "Read permission for groups I'm a member of",
    role: "normal",
  },
  {
    id: "groups--all:rw",
    description: "Write/read permission for all groups within a license",
    role: "administrator",
  },
  {
    id: "groups--all:ro",
    description: "Read permission for all groups within a license",
    role: "normal",
  },
  {
    id: "chats--all:ro",
    description:
      "Read permission for conversation and meta data of all license chats",
    role: "administrator",
  },
  {
    id: "chats--access:ro",
    description:
      "Read permission for conversation and meta data of chats with requester access",
    role: "normal",
  },
  {
    id: "chats--my:ro",
    description:
      "Read permission for conversation and meta data of the chats with requester presence",
    role: "normal",
  },
  {
    id: "chats.conversation--all:rw",
    description:
      "Write permission for conversation data of all license chats and Read permission for conversation and meta data of all license chats (chats--all:ro)",
    role: "administrator",
  },
  {
    id: "chats.conversation--access:rw",
    description:
      "Write permission for conversation data of chats with requester access and Read permission for conversation and meta data of chats with requester access (chats--access:ro)",
    role: "normal",
  },
  {
    id: "chats.conversation--my:rw",
    description:
      "Read/write permission for conversation data of chats with requester presence and Read permission for conversation and meta data of the chats with requester presence (chats--my:ro)",
    role: "normal",
  },
  {
    id: "chats--all:rw",
    description:
      "Read/write permission for conversation and meta data of all license chats",
    role: "administrator",
  },
  {
    id: "chats--access:rw",
    description:
      "Read/write permission for conversation and meta data of chats with requester access",
    role: "normal",
  },
  {
    id: "chats--my:rw",
    description:
      "Read/write permission for conversation and meta data of chats with requester presence",
    role: "normal",
  },
  {
    id: "customers.ban:rw",
    description: "Permission for banning customers",
    role: "normal",
  },
  {
    id: "customers:own",
    description: "Permission for managing customers identities",
    role: "administrator",
  },
  {
    id: "customers:ro",
    description: "Read permission for customers",
    role: "normal",
  },
  {
    id: "customers:rw",
    description: "Read/write permission for customers",
    role: "normal",
  },
  {
    id: "multicast:rw",
    description: "Permission for multicast data to agents or customers",
    role: "normal",
  },
  {
    id: "properties--my:ro",
    description:
      "Read permission for chat/thread/events properties configuration (only in my namespace)",
    role: "administrator",
  },
  {
    id: "properties--my:rw",
    description:
      "Read/write permission for chat/thread/events properties configuration (only in my namespace)",
    role: "administrator",
  },
  {
    id: "properties--all:ro",
    description:
      "Read permission for chat/thread/events properties configuration (all in license)",
    role: "administrator",
  },
  {
    id: "webhooks--my:ro",
    description:
      "Read permission for webhooks configuration (only my webhooks)",
    role: "administrator",
  },
  {
    id: "webhooks--my:rw",
    description:
      "Read/write permission for webhooks configuration (only my webhooks)",
    role: "administrator",
  },
  {
    id: "webhooks--all:ro",
    description: "Read permission for webhooks configuration (all in license)",
    role: "administrator",
  },
  {
    id: "webhooks--all:rw",
    description:
      "Read/write permission for webhooks configuration (all in license, delete only)",
    role: "administrator",
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
    id: "misdirected_request",
    message: "Wrong region",
    description:
      "Client's request should be performed to another region. The correct region is returned in the optional data object. It helps to figure out where the client should be connected.",
  },
  {
    id: "request_timeout",
    message: "Request timed out",
    description: "Timeout threshold is 15 seconds.",
  },
  {
    id: "unsupported_version",
    message: "Unsupported version",
    description: "Unsupported protocol version.",
  },
  {
    id: "users_limit_reached",
    message: "Users limit reached	",
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
    message: "No active chat thread",
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
    message: "Requester offline",
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
];

const constants = {
  VERSIONS_GROUPS,
  RATES,
  SCROLL_OFFSET,
  SCOPES,
  ERRORS,
};

module.exports = constants;
