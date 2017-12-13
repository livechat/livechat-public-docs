# Ledger

The Ledger API handles the financial activity and balance.

## Entry object types

* `collection` - the amount has beed added
* `refund` - the amount has been deducted
* `withdrawal` - the amount has been paid off

## Ledger entry object

This is the structure of a single Ledger entry object:

```
{
	"id":"50af517e-c5aa-4af3-93c2-e60d612c43eb",
	"name":"app1",
	"type":"collection",
	"value":160,
	"created_at":"2017-11-20T15:48:13Z"
}
```

## Scopes

Scopes is a list of permissions your app will get. To learn more about scopes, go to [Authorization docs](https://docs.livechatinc.com/authorization/).

### Possible scopes:

* `billing_manage` - for creating charges for your own client
* `billing_admin` - for creating charges for other clients. It can also adjust the `commission_percent`

**Note:** `value` is an integer defined in cents.

## Endpoints

| Endpoint                           | Description                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /v1/ledger`                   | returns the current ledger. It lists up to 20 entries, use `?page=X` for pagination. Required format: `{result: [LEDGER ENTRY 1, LEDGER ENTRY 2, ...]}`, |
| `PUT /v1/direct_charge/:ID/accept` | returns the current ledger balance in cents. Format: `{"balance": 10}`                                                                                   |
