# Usage

## 1. Authorization

The Billing API is based on the [LiveChat OAuth](https://docs.livechatinc.com/authorization/) authorization flow. All endpoints require access tokens, and some endpoints are limited by scope or client ID.

The Billing API itself is also a Livechat OAuth application registered with the following client IDs:

### LiveChat

* `labs` - 0c23eb669259d865755d222b586a587e - API - `billing.labs.livecahtinc.com`
* `staging` - coming soon
* `production` - coming soon

## 2. APIs

This is an overview of all the APIs available within the Billing API. Click the names for more details.

### 2.1. [Direct Charges](#direct-charges)

The Direct Charges API allows you to collect one-time fees.

#### Use cases:

* Collecting a single charge for an application in the Marketplace
* Collecting in-app micropayments
* Charging for additional features in the apps

### 2.2. [Ledger](#ledger)

The Ledger API is designed for sellers to manage the financial activity and balance.

#### Use cases:

* Checking the balance
* Checking the billing history

### 2.3. [Subscription](#subscription)

The Subscription API handles subscription management.

#### Use cases:

* Obtaining the subscriptions
* Updating the subscriptions

# Direct charges

The Direct Charges API is a tool to collect one-time fees (also called "direct charges").

## Statuses

There are six possible direct charge statuses:

| Status      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `pending`   | the charge has been created and is awaiting user interaction |
| `accepted`  | the charge has been accepted by the user                     |
| `declined`  | the charge has been declined by the user                     |
| `processed` | the charge is being processed by a payment gateway           |
| `failed`    | the charge could not be collected                            |
| `success`   | the charge has been collected                                |

## Flows

There are three possible direct charge flows:

* `pending` -> `accepted` -> `processed` -> `failed`
* `pending` -> `accepted` -> `processed` -> `success`
* `pending` -> `declined`

## Best practices

You should create a charge for a user and redirect them to the confirmation URL. After the charge has been confirmed or declined, the control over the process goes to the return URL. This allows you to check the charge status. If the status is `accepted`, activate the charge.

Your payment gateway will automatically change the charge status to `success` or `failed`.

## Direct charge object

This is the structure of a single direct charge object:

```
{
	"id": "5deab95d-c0c9-4397-9593-436f533e83e5"`

	"buyer_license_id": 100008664,
	"buyer_entity_id": "name@email.com",
	"order_client_id": "1e2cb91de0b15e99a7f4502b900e907e",
	"seller_client_id": "1e2cb91de0b15e99a7f4502b900e907e",

	"name": "Extension",
	"price": 100,
	"quantity": 2,
	"return_url": "http://application.com/path?id=5deab95d-c0c9-4397-9593-436f533e83e5&type=direct_charge",
	"test": false,

	"status": "pending",
	"confirmation_url": "http://billing.livechatinc.com/?id=5deab95d-c0c9-4397-9593-436f533e83e5",
	"commission_percent": 20,

	"created_at": "2017-10-20T13:31:27Z",
	"updated_at": "2017-10-23T13:27:45Z"
}
```

## Glossary

* `price` - an integer defined in cents
* `seller_client_id` - an application which has created a given charge
* `order_client_id` - an application which is being paid for
* `commission_percent` - a percentage fee deducted by LiveChat from the application price

## Scopes

Scopes is a list of permissions your app will get. To learn more about scopes, go to [Authorization docs](https://docs.livechatinc.com/authorization/).

### Possible scopes:

* `billing_manage` - for creating charges for your own client
* `billing_admin` - for creating charges for other clients. It can also adjust the `commission_percent`

## Endpoints

All endpoints return a direct charge object.

These endpoints can only be used in the application where the charge has been created:

| Endpoint                             | Description                                                                                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /v1/direct_charge`             | creates a new charge. Required fields: `name`, `price`, `quantity`, `return_url`. Optional field: `test`                                                                                    |
| `GET /v1/direct_charge/:ID`          | gets the existing charge                                                                                                                                                                    |
| `GET /v1/direct_charge`              | creates a paginated charges list (20 items per page) ordered by creation date. Pptional fields: `page`, `status` (for filtering by status, returns `{"result:[OBJECT_1, ... , OBJECT_N]"}`) |
| `PUT /v1/direct_charge/:ID/activate` | activates the charge (the payment gateway starts processing it)                                                                                                                             |

These endpoints are allowed only in billing applications:

| Endpoint                            | Description              |
| ----------------------------------- | ------------------------ |
| `GET /v1/direct_charge/:ID`         | gets the existing charge |
| `PUT /v1/direct_charge/:ID/accept`  | accepts the charge       |
| `PUT /v1/direct_charge/:ID/decline` | declines the charge      |
