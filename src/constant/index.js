export const VERSIONS_GROUPS = {
  DEFAULT: {
    STABLE_VERSION: "3.2",
    LEGACY_VERSIONS: ["2.0", "3.1"],
    DEV_PREVIEW_VERSION: "3.3",
    ALL_VERSIONS: ["3.3", "3.2", "3.1", "2.0"],
  },
  "chat-widget": {
    STABLE_VERSION: "1.0",
    DEV_PREVIEW_VERSION: "2.0",
    ALL_VERSIONS: ["1.0", "2.0"],
  },
};

export const RATES = [
  "It's unsuable",
  "Rather poor",
  "It's OK",
  "Great",
  "Excellent",
];

export const SCROLL_OFFSET = 130;

export const SCOPES = [
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
    description: "Permission for creating, but not managing, new accounts in LiveChat Accounts",
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
    role: "administrator",
  },
  {
    id: "agents-bot--all:rw",
    description:
      "Read/write permission for bot agents configuration (all in license, delete only)",
    role: "administrator",
  },
  {
    id: "groups--my:rw",
    description:
      "Write/read permission for groups I'm a member of",
    role: "administrator",
  },
  {
    id: "groups--my:ro",
    description:
      "Read permission for groups I'm a member of",
    role: "normal",
  },
  {
    id: "groups--all:rw",
    description:
      "Write/read permission for all groups within a license",
    role: "administrator",
  },
  {
    id: "groups--all:ro",
    description:
      "Read permission for all groups within a license",
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
