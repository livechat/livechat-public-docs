---
weight : 30
---

# Properties

> **The general property format** 

```js
{
    "<properties>": {
        "<namespace>": {    
            "<property_name>": "<property_value>",    
            "<property_name>": "<property_value>"      
        }
    }
}
```

Properties are key-value storages. They can be set within a chat, a thread, or an event. 

You can create properties within a license and configure them using the **Configuration API**. Properties are grouped in _namespaces_, which helps distinguishing which property belongs to a given integration. Your namespace is always named after your `application id`.

You can configure the property [type](#property-types), [location](#property-locations), and [domain](#property-domain).


### Property types

There are four property types:

- `int` (int32)
- `bool`
- `string`
- `tokenized_string`

The `tokenized_string` type is a string split to tokens before indexing in our search engine. It can be useful for longer strings, such as messages. It should not be used for keywords.

### Property locations

Properties can be set for the following locations:

- chat
- thread
- event

You can configure access to properties within those locations. For example, you could create a property visible only to agents in a chat and thread, but not in an event.

### Property domain

The **property domain** is a set of values that a property can be assigned to.

Property domain can be configured in two ways:

- by defining a set of values explicitly allowed in this property (for example `[1, 2, 3]`).
- by defining a range. All values within the range are allowed in this property. It works only for numeric types (for example a range from `1` to `3`).

#### Test properties

Each license has some test properties that you can use to play with properties.

| Namespace | Property                    | Type               | Access                     |
| --------- | --------------------------- | ------------------ | -------------------------- |
| `test`    | `bool_property`             | `bool`             | rw for everyone everywhere |
| `test`    | `int_property`              | `int`              | rw for everyone everywhere |
| `test`    | `string_property`           | `string`           | rw for everyone everywhere |
| `test`    | `tokenized_string_property` | `tokenized_string` | rw for everyone everywhere |

The `tokenized_string` property is similar to the `string` type. The values of a `tokenized_string` are split in tokens to enable searching for each word separately.

## Methods

#### The Properties API enpoint

| HTTP method  | Base URL |
|-------|--------|
| `POST`|`https://api.livechatinc.com/v3.0/configuration/action/<action>`   |

#### Required headers

| Header   |      Value      |   |
|----------|:-------------:|------:|
| `Content-Type`	 |  `application/json`  |  |

<a href="https://www.getpostman.com/collections/b4e87c243f23fa1f4240" target="_blank"><img src="https://run.pstmn.io/button.svg"></a>

------------------------------------------------------------------------------------------------------------------------------------------------------------

### `create_properties`

> **`create_properties`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/create_properties \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
        "score": {
            "type": "int",
            "locations": {
                "chat": {
                    "access": {
                        "agent": {
                            "read": true,
                            "write": true
                        },
                        "customer": {
                            "read": true,
                            "write": true
                        }
                    }
                }
            }
        },
        "comment": {
            "type": "string",
            "locations": {
                "chat": {
                    "access": {
                        "agent": {
                            "read": true,
                            "write": true
                        },
                        "customer": {
                            "read": true,
                            "write": true
                           }
                       }
                   }
               }
           }
        }'
```


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/create_properties`  |
| __Required scopes *__| `properties--my:rw`(to create my _properties_ in my _namespace_)  |


#### Response

No response payload (`200 OK`).


| Parameter                                                  | Required   | Data type              | Notes                                                                        |
| ---------------------------------------------------------- | ---------- | --------------------- | ----------------------------------------------------------------------------- |
| `<property_name>.type`                                     | Yes        | `string`              | Possible values: `int`, `string`, `bool`, and `tokenized_string`              |
| `<property_name>.locations`                                | Yes        | `object`              |                                                                               |
| `<property_name>.locations.<location>`                     | min. one `location` | `object`     | Possible values of `<location>`: `chat`, `thread`, `event`                    |
| `<property_name>.locations.<location>.access.<user>`       | min. one `user` | `object`         | Possible values of `<user>`: `agent`, `customer`                              |
| `<property_name>.locations.<location>.access.<user>.read`  | Yes         | `bool`               | If set to `true`, then `<user>` can read this property.                        |
| `<property_name>.locations.<location>.access.<user>.write` | Yes         | `bool`               | If set to `true`, then `<user>` can write to this property.                   |
| `<property_name>.description`                              | No         | `string`              | Property description                                                          |
| `<property_name>.domain` __*__                             | No          | `[<type>]`           | Array of values that properties can be set to                                 |
| `<property_name>.range` __*__                              | No          | `object`             | Range of values that properties can be set to                                 |
| `<property_name>.range.from`                               | No          | `int`                | Only values **equal** or **greater** than this parameter can be set to this property.  |
| `<property_name>.range.to`                                 | No          | `int`                | Only values **equal** or **lower** than this parameter can be set to this property.    |

__*)__ Only one `domain` and one `range` can be set for a single property.


### `get_property_configs`

> **`get_property_configs`** sample request with required params only

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/get_property_configs \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {}
	    }'
```

> **`get_property_configs`** sample response payload

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

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/get_property_configs`  |
| __Required scopes *__| `properties--my:ro` `properties--all:ro` (to create properties in all _namespaces_)  |


#### Request

| Parameter          | Required | Data type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `all`                |   No     | `bool` |  If set to `true`, it returns all properties within a given license; Default: `false`| 

