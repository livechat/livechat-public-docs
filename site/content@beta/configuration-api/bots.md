---
weight : 20
---

# Bot Agent

- Bot Agent enables writing integrations using agent-api to communicate in chats
  as a regular Agent.

- Logged in Bot Agent is connected to agent SSO access token that
  creates/updates the Bot and is being logged out when the access token is
  revoked.

- Each Bot Agent is a resource owned by an application in developers platform
  identified by `client_id`. By "My Bot Agents" the Bots owned by application
  with given `client_id` is meant.

## Differences from regular Agent

- you can not log in using Bot Agent account
- you can not set password for Bot Agent account
- Bot Agent does not have an email - agent_id is a random hash

## Test property namespace

For each license there are added some test properties.

| Namespace | Property                    | Type               | Access                     |
| --------- | --------------------------- | ------------------ | -------------------------- |
| `test`    | `bool_property`             | `bool`             | rw for everyone everywhere |
| `test`    | `int_property`              | `int`              | rw for everyone everywhere |
| `test`    | `string_property`           | `string`           | rw for everyone everywhere |
| `test`    | `tokenized_string_property` | `tokenized_string` | rw for everyone everywhere |

Note: `tokenized_string` is similar to `string` type, except values of it are splitted into tokens to enable search of each word.

## Methods

#### Create Bot Agent

**Endpoint**: `/agents/create_bot_agent`

**Permissions**:

- `agents-bot--my:rw` - to create my bot agents

| Request object                       | Type       | Required | Notes                                                                |
| ------------------------------------ | ---------- | -------- | -------------------------------------------------------------------- |
| `name`                               | `string`   | Yes      | display name                                                         |
| `avatar`                             | `string`   | No       | avatar URL                                                           |
| `status`                             | `string`   | Yes      | agent status                                                         |
| `max_chats_count`                    | `int`      | No       | maximum incoming chats that can be routed to the agent, by default 6 |
| `groups`                             | `object[]` | No       | groups the agent belongs to                                          |
| `groups[].id`                        | `uint`     | Yes      | group ID                                                             |
| `groups[].priority`                  | `string`   | Yes      | agent priority in group                                              |
| `webhooks`                           | `object`   | No       | webhooks sent to the agent                                           |
| `webhooks.url`                       | `string`   | Yes      | destination URL for webhooks                                         |
| `webhooks.secret_key`                | `string`   | Yes      | secret sent in webhooks to verify webhook source                     |
| `webhooks.actions`                   | `object[]` | Yes      | triggering actions                                                   |
| `webhooks.actions[].name`            | `string`   | Yes      | triggering action name                                               |
| `webhooks.actions[].filters`         | `object`   | No       | filters to check if webhook should be triggered                      |
| `webhooks.actions[].additional_data` | `string[]` | No       | Additional data that will arrive with webhook                        |

#### Example request payload

```js
{
    "name": "John Doe",
    "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
    "status": "accepting chats",
    "max_chats_count": 6,
    "groups": [{
        "id": 0,
        "priority": "normal"
    }, {
        "id": 1,
        "priority": "normal"
    }, {
        "id": 2,
        "priority": "first"
    }],
    "webhooks": {
      "url": "http://myservice.com/webhooks",
      "secret_key": "JSauw0Aks8l-asAa",
      "actions": [{
        "name": "incoming_chat_thread"
      },{
        "name": "incoming_event",
        "additional_data": ["chat_properties"]
      }]
    }
}
```

- `status` possible values:
  - `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  - `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  - `offline` - agent is not logged in
- `groups[].priority` possible values:
  - `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg Bots can get chats before
    normal agents.
  - `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  - `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
- `webhooks` - go [here](#webhooks) for possible actions values and payloads.

#### Example response payloads

##### Success

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Remove Bot Agent

**Endpoint**: `agents/remove_bot_agent`

**Permissions**:

- `agents-bot--my:rw` - to remove my bot agent
- `agents-bot--all:rw` - to remove any bot agent

| Request object | Type     | Required | Notes        |
| -------------- | -------- | -------- | ------------ |
| `bot_agent_id` | `string` | Yes      | Bot agent ID |

#### Example request payload

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Example response payloads

##### Success

```js
{
}
```

### Update Bot Agent

**Endpoint**: `agents/update_bot_agent`

**Permissions**:

- `agents-bot--my:rw` - to update my bot agent

| Request object                       | Type       | Required | Notes                                                  |
| ------------------------------------ | ---------- | -------- | ------------------------------------------------------ |
| `id`                                 | `string`   | Yes      | bot agent ID                                           |
| `name`                               | `string`   | No       | display name                                           |
| `avatar`                             | `string`   | No       | avatar URL                                             |
| `status`                             | `string`   | No       | agent status                                           |
| `max_chats_count`                    | `int`      | No       | maximum incoming chats that can be routed to the agent |
| `default_group_priority`             | `string`   | No       | Default routing priority for group without defined one |
| `groups`                             | `object[]` | No       | groups the agent belongs to                            |
| `groups[].id`                        | `uint`     | Yes      | group ID                                               |
| `groups[].priority`                  | `string`   | Yes      | agent priority in group                                |
| `webhooks`                           | `object`   | No       | webhooks sent to the agent                             |
| `webhooks.url`                       | `string`   | Yes      | destination URL for webhooks                           |
| `webhooks.secret_key`                | `string`   | Yes      | secret sent in webhooks to verify webhook source       |
| `webhooks.actions`                   | `object[]` | Yes      | triggering actions                                     |
| `webhooks.actions[].name`            | `string`   | Yes      | triggering action name                                 |
| `webhooks.actions[].filters`         | `object`   | No       | filters to check if webhook should be triggered        |
| `webhooks.actions[].additional_data` | `string[]` | No       | Additional data that will arrive with webhook          |

#### Example request payload

```js
{
    "id": "5c9871d5372c824cbf22d860a707a578",
    "status": "accepting chats",
    "max_chats_count": 6,
    "webhooks": {
      "url": "http://myservice.com/webhooks",
      "secret_key": "JSauw0Aks8l-asAa",
      "actions": [{
        "name": "incoming_chat_thread",
        "filters": {
            "chat_properties": {
                "source": {
                    "type": {
                         "values": ["facebook", "twitter"]
                     }
                }
            }
        }
      },{
        "name": "incoming_event"
      }]
    }
}
```

- `status` possible values:
  - `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  - `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  - `offline` - agent is not logged in
- `groups[].priority` possible values:
  - `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg Bots can get chats before
    normal agents.
  - `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  - `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
- `default_group_priority` possible values:
  - `first` - Chats are assigned to bot before normal agents
  - `normal` - Chats are assigned with the same priority as it would for normal agents
  - `last` - If there is no agent available then, chat will be assigned to bot
  - `supervisor` - Bot works as `supervisor` so he/she will not be assigned to any chats
- `webhooks` - go [here](#webhooks) for possible actions values and payloads.

#### Example response payloads

##### Success

```js
{
}
```

### Get Bot Agents

**Endpoint**: `agents/get_bot_agents`

**Permissions**:

- `agents-bot--my:ro` - to get my bot agent
- `agents-bot--all:ro` - to get all bot agents

| Request object | Type   | Required | Notes                                                                                     |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| `all`          | `bool` | No       | Get all Bot Agents, if `false` returns only caller's Bot Agents, default value is `false` |

#### Example request payload

```js
{
    "all": false
}
```

#### Example response payloads

##### Success

```js
{
    "bot_agents": [{
        "id": "5c9871d5372c824cbf22d860a707a578",
        "name": "John Doe",
        "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
        "status": "accepting chats"
    }]
}
```

### Get Bot Agent details

**Endpoint**: `agents/get_bot_agent_details`

**Permissions**:

- `agents-bot--my:ro` - to get my bot agent details
- `agents-bot--all:ro` - to get any bot agent details

| Request object | Type     | Required | Notes        |
| -------------- | -------- | -------- | ------------ |
| `bot_agent_id` | `string` | Yes      | Bot Agent ID |

#### Example request payload

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Example response payloads

##### Success

```js
{
    "bot_agent": {
        "id": "5c9871d5372c824cbf22d860a707a578",
        "name": "John Doe",
        "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
        "status": "accepting chats",
        "application": {
            "client_id": "asXdesldiAJSq9padj"
        },
        "max_chats_count": 6,
        "groups": [{
            "id": 0,
            "priority": "normal"
        }, {
            "id": 1,
            "priority": "normal"
        }, {
            "id": 2,
            "priority": "first"
        }],
        "webhooks": {
            "url": "http://myservice.com/webhooks",
            "secret_key": "JSauw0Aks8l-asAa",
            "actions": [{
                "name": "incoming_chat_thread",
                "filters": {
                  "chat_properties": {
                     "source": {
                        "type": {
                           "values": ["facebook", "twitter"]
                        }
                      }
                  }
                }
            },{
                "name": "incoming_event",
                "additional_data": ["chat_properties"]
            }]
        }
    }
}
```