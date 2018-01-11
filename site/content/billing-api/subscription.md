---
weight: 60
---

# Subscription

The Subscription API handles subscription management. This API is **not yet ready** and will be available soon.

## Subscription object

This is the structure of a single subscription object:

```json
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

## Scopes {#subscription-scopes}

Direct Charges API requires `subscription_manage` scope for all endpoints.

## Endpoints {#subscription-endpoints}

All endpoints return a direct charge object.

These endpoints can only be used in the application where the charge has been created:

Base URL: `https://billing.livechatinc.com`

* `GET /v1/subscription` - returns the subscription object
* `PUT /v1/subscription` - updates the subscription. If a license has a Recurly account, its Recurly subscription is updated or created (if missing). Required fields: `plan`, `seats`. Optional field: `months`
