---
weight: 30
---

# Customer authorization flow

To authorize [Customer API](/docs/customer-api/) you will need different access token than for the [Agent API](/docs/agent-api/) or [Configuration API](/docs/configuration-api).

### Creating new customer along with customer access token

You can create a new customer on licence or use an existing identity. The `<ACCESS_TOKEN>` mentioned below is the one that you get from the app authorization flow. Required scope: `customers.identity--manage`.

```
POST https://accounts.livechatinc.com/customer/ -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Required parameters**

* `client_id` - identifies the client application that is making the request 
* `response_type` - oauth2 standard, should use `token`
* `redirect_uri`  - the value of this parameter must exactly match one of the values listed in application 

**Optional partametres**

* `customer_id` - ID of existing customer, if empty new `customer_id` is created
* `valid_for` - Optional for overriding default token expiration time

**Example response**
```
{
    "access_token": "dev-J7ssSZhSSbShcZxrv580FA",
    "client_id": "238ac4c3c3628880aca289c6d700d2c5",
    "entity_id": "bf18d1a8-1afe-4a3e-4cc0-a3148f1143db",
    "expires_id": 3600
}
```

### Customer chat url

It's possible to create customer direct chat url using `license_id` and `access_token`.

**Example URL**
```
https://accounts.livechatinc.com/customer?
  access_token=ae19bb31-803a-46f3-53ac-3b7d2564fe7e&
  redirect_uri=https://lc.chat/now/1520/"
```