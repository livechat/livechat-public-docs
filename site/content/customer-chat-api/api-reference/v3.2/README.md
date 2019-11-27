<div class="hide">

# Customer Chat API

* [Introduction](#introduction)
* [Methods](#methods)
  * [Get license properties](#get_license_properties)
  * [Get group properties](#get_group_properties)
</div>

# Introduction

This documentation describes version **v3.2** of customer-api.

# Methods

## Get license properties

| Action                   | RTM API | Web API | Push message |
| ------------------------ |:-------:|:-------:|:------------:|
| `get_license_properties` |    -    |    ✓    |      -       |

**API endpoint**

| HTTP method | Endpoint                                                                  |
| ----------- | ------------------------------------------------------------------------- |
| `GET`       | `https://api.livechatinc.com/v3.2/customer/public/get_license_properties` |

**Authorization**

This endpoint is public, i.e. it doesn't require the requester to pass the `Authorization` header.

**Request querystring**

| Request object | Required | Type     | Notes                                              |
| -------------- | -------- | -------- | -------------------------------------------------- |
| `license_id`   | Yes      | `number` |                                                    |
| `namespace`    | No       | `string` | Property namespace to retrieve                     |
| `name`         | No       | `string` | Property name                                      |


**Sample request querystring**
```js
?license_id=123&namespace=58737b5829e65621a45d598aa6f2ed81&name=some_property_name
```

**Sample response payload**
Since this endpoint is public, it only returns those properties which are configured as readable by customer (Locations.License.Access.Customer.Read)
```js
{
    "namespace": "58737b5829e65621a45d598aa6f2ed81",
    "properties": {
        "my_integer_property_name": 123,
        "my_string_property_name": "string value",
        "my_boolean_property_name": true,
        "another_boolean_property_name": false
    }
}
```

## Get group properties

| Action                 | RTM API | Web API | Push message |
| ---------------------- |:-------:|:-------:|:------------:|
| `get_group_properties` |    -    |    ✓    |      -       |

**API endpoint**

| HTTP method | Endpoint                                                                |
| ----------- | ----------------------------------------------------------------------- |
| `GET`       | `https://api.livechatinc.com/v3.2/customer/public/get_group_properties` |

**Authorization**

This endpoint is public, i.e. it doesn't require the requester to pass the `Authorization` header.

**Request querystring**

| Request object | Required | Type     | Notes                                              |
| -------------- | -------- | -------- | -------------------------------------------------- |
| `license_id`   | Yes      | `number` |                                                    |
| `group_id`     | Yes      | `number` |                                                    |
| `namespace`    | No       | `string` | Property namespace to retrieve                     |
| `name`         | No       | `string` | Property name                                      |


**Sample request querystring**
```js
?license_id=123&group=10&namespace=58737b5829e65621a45d598aa6f2ed81&name=some_property_name
```

**Sample response payload**
Since this endpoint is public, it only returns those properties which are configured as readable by customer (Locations.Group.Access.Customer.Read)
```js
{
    "namespace": "58737b5829e65621a45d598aa6f2ed81",
    "properties": {
        "my_integer_property_name": 123,
        "my_string_property_name": "string value",
        "my_boolean_property_name": true,
        "another_boolean_property_name": false
    }
}
```
