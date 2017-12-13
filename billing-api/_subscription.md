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

To get access to Subscriptions API, you must ask the user for a `subscription_manage` scope. During the BETA period of this API, this scope can be requested only by the apps that are manually configured by LiveChat team.

Chat with us to get access to the `subscription_manage` scope.

## Endpoints

All endpoints return a direct charge object.

These endpoints can only be used in the application where the charge has been created:

* `GET /v1/subscription` - returns the subscription object
* `PUT /v1/subscription` - updates the subscription. If a license has a Recurly account, its Recurly subscription is updated or created (if missing). Required fields: `plan`, `seats`. Optional field: `months`
