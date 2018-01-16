---
weight: 40
---

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

## Usage

* Create a charge for a user (`POST /v1/direct_charge`) and redirect them to the `confirmation_url`.
* After the user confirms or declines the charge, they will be redirected to `return_url` with charge `id` passed as a URL param.
* Based on `id`, you can check charge status (`GET /v1/direct_charge/:ID`). If it is `accepted`, you must activate the charge (`PUT /v1/direct_charge/:ID/activate`).
* After a while, our payment gateway will try to charge the user and it will automatically change the charge status to `success` or `failed`.

## Direct charge object

Here's the structure of a single direct charge object.

Parameters description:


```json
{
  "id": "5deab95d-c0c9-4397-9593-436f533e83e5",

  "buyer_license_id": 100008664,
  "buyer_entity_id": "name@email.com",
  "order_client_id": "1e2cb91de0b15e99a7f4502b900e907e",
  "seller_client_id": "1e2cb91de0b15e99a7f4502b900e907e",

  "name": "Extension",
  "price": 100,
  "quantity": 2,
  "return_url":
    "https://application.com/path?id=5deab95d-c0c9-4397-9593-436f533e83e5&type=direct_charge",
  "test": false,

  "status": "pending",
  "confirmation_url":
    "https://billing.livechatinc.com/?id=5deab95d-c0c9-4397-9593-436f533e83e5",
  "commission_percent": 20,

  "created_at": "2017-10-20T13:31:27Z",
  "updated_at": "2017-10-23T13:27:45Z"
}
```

* `price` - an integer defined in cents. Example: to charge $99, set the `price` to 9900
* `commission_percent` - a percentage fee deducted by LiveChat from the application price

## Scopes {#direct-charges-scopes}

Direct Charges API requires `billing_manage` scope for all endpoints.

If you want to use this API, you must create an app in Developers Console and check **"offer in-app payments"** scope in the app settings. After successful authorization (by using Sign in with LiveChat), you will get an access token with `billing_manage` scope.

## Endpoints {#direct-charges-endpoints}

Base URL: `https://billing.livechatinc.com`

* `POST /v1/direct_charge` - creates a new charge. Required fields: `name`, `price`, `quantity`, `return_url`. Optional field: `test`
* `GET /v1/direct_charge/:ID` - gets the existing charge
* `GET /v1/direct_charge` - creates a paginated charges list (20 items per page) ordered by creation date. Optional fields: `page`, `status` (for filtering by status, returns `{"result:[OBJECT_1, ... , OBJECT_N]"}`)
* `PUT /v1/direct_charge/:ID/activate` - activates the charge (the payment gateway starts processing it)
