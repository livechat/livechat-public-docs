---
weight: 20
---

# Scopes

Scopes define the access to certain resources.

- `ro` means read only
- `rw` means read/write
- all `rw` scopes contains `ro` privileges
- all `all` scopes contains `access` privileges and `my` privileges
- all `access` scopes contains `my` privileges

For more details check [here](../services/sso/typedef.go).

## Accessing chat 

This chart shows every possible chats scenarios:

- chats without my access and without my presence (`chats -A -P`)
- chats with my access but without my presence (`chats +A -P`)
- chats with my presence but without my access (`chats -A +P`)
- chats with my access and with my presence (`chats +P +A`)

![](./chats.png)

The table shows scopes dependency of accessing chat:

|          | `chats -A -P` | `chats +A -P` | `chats -A +P` | `chats +P +A` |
| -------- | ------------- | ------------- | ------------- | ------------- |
| `all`    | ✓             | ✓             | ✓             | ✓             |
| `access` | -             | ✓             | ✓             | ✓             |
| `my`     | -             | -             | ✓             | ✓             |

## Accessing parts of chat 

The table shows scopes dependency of accessing chat parts:

|                           | meta data | conversation data |
| ------------------------- | --------- | ----------------- |
| `chats-*:rw`              | rw        | rw                |
| `chats.conversation-*:rw` | ro        | rw                |
| `chats-*:ro`              | ro        | ro                |

## Scope types

### Agents scopes

| Scope            | role          | Description                                            |
| ---------------- | ------------- | ------------------------------------------------------ |
| `agents--my:rw`  | normal        | Write permission for my profile configuration          |
| `agents--all:rw` | administrator | Write permission for all agents profiles configuration |
| `access_rules:ro` | administrator | Read permission for auto chat scopes configuration       |
| `access_rules:rw` | administrator | Read/write permission for auto chat scopes configuration |

### Bot Agents scopes

| Scope                | role          | Description                                                                      |
| -------------------- | ------------- | -------------------------------------------------------------------------------- |
| `agents-bot--my:ro`  | administrator | Read permission for bot agents configuration (only my bot agents)                |
| `agents-bot--my:rw`  | administrator | Read/write permission for bot agents configuration (only my bot agents)          |
| `agents-bot--all:ro` | administrator | Read permission for bot agents configuration (all in license)                    |
| `agents-bot--all:rw` | administrator | Read/write permission for bot agents configuration (all in license, delete only) |

### Chats scopes

| Scope                           | role          | Description                                                                                                                                                                           |
| ------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chats--all:ro`                 | normal        | Read permission for conversation and meta data of all license chats                                                                                                                   |
| `chats--access:ro`              | normal        | Read permission for conversation and meta data of chats with requester access                                                                                                         |
| `chats--my:ro`                  | normal        | Read permission for conversation and meta data of the chats with requester presence                                                                                                   |
| `chats.conversation--all:rw`    | normal        | Write permission for conversation data of all license chats and Read permission for conversation and meta data of all license chats (`chats--all:ro`)                                 |
| `chats.conversation--access:rw` | normal        | Write permission for conversation data of chats with requester access and Read permission for conversation and meta data of chats with requester access (`chats--access:ro`)          |
| `chats.conversation--my:rw`     | normal        | Read/write permission for conversation data of chats with requester presence and Read permission for conversation and meta data of the chats with requester presence (`chats--my:ro`) |
| `chats--all:rw`                 | administrator | Read/write permission for conversation and meta data of all license chats                                                                                                             |
| `chats--access:rw`              | administrator | Read/write permission for conversation and meta data of chats with requester access                                                                                                   |
| `chats--my:rw`                  | normal        | Read/write permission for conversation and meta data of chats with requester presence                                                                                                 |

- chats conversation data applies to:
  - chat events
  - chat properties
  - thread properties
- chats meta data applies to:
  - chat users

_NOTICE: currently `chats.conversation--all:rw` allows joining chats too because you have to join the chat to be able to write to it_

### Customers scopes

| Scope              | role          | Description                                  |
| ------------------ | ------------- | -------------------------------------------- |
| `customers.ban:rw` | normal        | Permission for banning customers             |
| `customers:own`    | administrator | Permission for managing customers identities |
| `customers:ro`     | normal        | Read permission for customers                |
| `customers:rw`     | normal        | Read/write permission for customers          |

### Multicast scopes

| Scope          | role   | Description                                          |
| -------------- | ------ | ---------------------------------------------------- |
| `multicast:rw` | normal | Permission for multicast data to agents or customers |


### Properties scopes

| Scope                | role          | Description                                                                                  |
| -------------------- | ------------- | -------------------------------------------------------------------------------------------- |
| `properties--my:ro`  | administrator | Read permission for chat/thread/events properties configuration (only in my namespace)       |
| `properties--my:rw`  | administrator | Read/write permission for chat/thread/events properties configuration (only in my namespace) |
| `properties--all:ro` | administrator | Read permission for chat/thread/events properties configuration (all in license)             |




