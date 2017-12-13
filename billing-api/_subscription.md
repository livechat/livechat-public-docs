# Subscription

<aside class="warning">Note: The subscription API is not public yet (even in the closed beta).</aside>

The Subscription API handles subscription management.

## Subscription object

This is the structure of a single subscription object:

```
{
	"automatic_upselling": false,
	"ends_at": "2017-11-28T23:59:59Z",
	"in_trial": false,
	"months": 1,
	"origin": "recurly",
	"pay_per_chat": false,
	"plan": "team",
	"recurrent_payment": true,
	"seats": 3,
	"subscriber": true
}
```

## Scopes

Scopes is a list of permissions your app will get. To learn more about scopes, go to [Authorization docs](https://docs.livechatinc.com/authorization/).

* `subscription_manage` - required for all endpoints

## Endpoints

All endpoints return a direct charge object.

These endpoints can only be used in the application where the charge has been created:

* `GET /v1/subscription` - returns subscription object
* `PUT /v1/subscription` - updates subscription, if license has an account in recurly, recurly subscription is updated or created if missing, required fields `plan`, `seats`, optional field `months`

| Endpoint               | Description                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET /v1/subscription` | returns subscription object                                                                                                                                                          |
| `PUT /v1/subscription` | updates the subscription. If a license has a Recurly account, its Recurly subscription is updated (if exists) or created. Required fields: `plan`, `seats`. Optional field: `months` |
