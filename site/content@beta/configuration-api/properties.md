---
weight : 30
---

# Properties

### Create properties

**Endpoint**: `properties/create_properties`

**Permissions**:

- `properties--my:rw` - to create my properties (in my namespace)

| Request object                                             | Type       | Required              | Notes                                                                        |
| ---------------------------------------------------------- | ---------- | --------------------- | ---------------------------------------------------------------------------- |
| `<property_name>.type`                                     | `string`   | Yes                   | values allowed: `int`, `string`, `bool` and `tokenized_string`               |
| `<property_name>.description`                              | `string`   | No                    | property description                                                         |
| `<property_name>.locations`                                | `object`   | Yes                   |                                                                              |
| `<property_name>.locations.<location>`                     | `object`   | at least one location | `<location>` is one of these values: `chat`, `thread`, `event`               |
| `<property_name>.locations.<location>.access.<user>`       | `object`   | at least one user     | `<user>` is one of these values: `agent`, `customer`                         |
| `<property_name>.locations.<location>.access.<user>.read`  | `bool`     | Yes                   | if true, then `<user>` can read this property                                |
| `<property_name>.locations.<location>.access.<user>.write` | `bool`     | Yes                   | if true, then `<user>` can write to this property                            |
| `<property_name>.domain`                                   | `[<type>]` | No                    | this is array of values that properties can be set to                        |
| `<property_name>.range`                                    | `object`   | No                    | this is range of values that properties can be set to                        |
| `<property_name>.range.from`                               | `int`      | No                    | only values equal or greater than this parameter can be set to this property |
| `<property_name>.range.to`                                 | `int`      | No                    | only values equal or lower than this parameter can be set to this property   |

Note: only one of `domain` and `range` can be set in single property
Note: for more information about properties see [Properties Guide](https://developers.livechatinc.com/beta-docs/platform-overview/#properties)

#### Example request payload

```js
{
  "greeting":{
    "type":"string",
    "locations":{
      "chat":{
        "access":{
          "agent":{
            "read":true,
            "write":false
          },
          "customer":{
            "read":true,
            "write":true
          }
        }
      }
    }
    "domain": ["hello", "hi"]
  },
  "scoring":{
    "type":"int",
    "locations":{
      "event":{
        "access":{
          "agent":{
            "read":true,
            "write":true
          }
        }
      }
    },
    "range": {
      "from": 0,
      "to": 10
    }
  }
}
```

#### Example response payloads

##### Success

```js
{
}
```

### Get property configs

**Endpoint**: `properties/get_property_configs`

**Permissions**:

- `properties--my:ro` - to get my properties configs (my namespace)
- `properties--all:ro` - to get all properties configs (all namespaces)

| Request object | Type   | Required | Notes                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| `all`          | `bool` | No       | if true returns all properties on license (default false) |

Note: for more information about properties see [Properties Guide](https://developers.livechatinc.com/beta-docs/platform-overview/#properties)

#### Example request payload

```js
{
  "all": true
}
```

#### Example response

##### Success

```js
{
  "58737b5829e65621a45d598aa6f2ed8e":{
    "greeting":{
    "type":"string",
    "locations":{
      "chat":{
        "access":{
          "agent":{
            "read":true,
            "write":false
          },
          "customer":{
            "read":true,
            "write":true
          }
        }
      }
    }
    "domain": ["hello", "hi"]
  },
  "scoring":{
    "type":"int",
    "locations":{
      "event":{
        "access":{
          "agent":{
            "read":true,
            "write":true
          }
        }
      }
    },
    "range": {
      "from": 0,
      "to": 10
    }
    //...
  },
  "other_namespace": {
    //
  }
  ...
}
```