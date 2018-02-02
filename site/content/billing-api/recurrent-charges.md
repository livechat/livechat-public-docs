---
weight: 60
---

# Recurrent charges

The Recurrent Charges API handles periodic payments. Once the payment is set up, a customer will be charged every month.

## Statuses

There are six possible recurrent charge statuses:

| Status      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `pending`   | the charge has been created and is awaiting merchant interaction |
| `accepted`  | the charge has been accepted by the merchant                     |
| `declined`  | the charge has been declined by the merchant                     |
| `active` | the charge is being processed by a payment gateway           |
| `frozen`    | the charge could not be collected                            |
| `cancelled`   | the charge has been cancelled                                |

## Flows

There are three possible recurrent charge flows:

* `pending` -> `accepted` -> `processed` -> `active` -> `cancelled`
* `pending` -> `accepted` -> `processed` -> `active` -> `frozen`
* `pending` -> `declined`

## Recurrent charge object

Here's the structure of a recurrent charge object.

```json
  "id": "1c286f7a-aab8-4384-8e09-dc6749c550cd",
  "buyer_license_id": 100006625,
  "buyer_entity_id": "g.wyszynski+labs@livechatinc.com",

  "seller_client_id": "1e2cb91de0b15e99a7f4502b900e907e",

  "order_client_id": "e569d92213f62ec04cee2ee0f3b4f070",
  "order_license_id": "12345",
  "order_entity_id": "name@domain.com",

  "name": "sub1",
  "price": 1900,
  "trial_days": 0,
  "return_url": "http://localhost?id=1c286f7a-aab8-4384-8e09-dc6749c550cd",
  "test": false,

  "status": "pending",
  "confirmation_url": "http://localhost:8000?id=1c286f7a-aab8-4384-8e09-dc6749c550cd&type=recurrent_charge",
  "commission_percent": 20,

  "trial_ends_at": null,
  "cancelled_at": null,
  "current_charge_at": null,
  "next_charge_at": null,

  "updated_at": "2017-11-29T10:57:26Z",
  "created_at": "2017-11-29T10:57:26Z"

```

Parameters description:

* `price` - an integer defined in cents. Example: to charge $99, set the `price` to 9900
* `seller_client_id` - client id which created a given charge (in most cases it's the Marketplace id or order client id)
* `order_client_id` - client id of the application that is paid for
* `order_entity_id` - client id author (the creator of an application)
* `commission_percent` - a percentage fee deducted by LiveChat from the application price
* `current_charge_at` - the date when the current settlement period started
* `next_charge_at` - the date when the current settlement period ends

## Scope

* `billing_manage` - for creating charges for your own client
* `billing_admin` - for creating charges for other clients and for adjusting `commission_percent`

## Endpoints

All endpoints return a recurrent charge object.

* `POST /v1/recurrent_charge` - create a new charge. Required fields: `name`, `price`, `return_url`. Optional fields: `test`, `trial_days`
* `GET /v1/recurrent_charge/:ID` - get the existing charge
* `PUT /v1/recurrent_charge/:ID/accept` - accept recurrent charge. The buyer must confirm the payment before the charge is collected
* `PUT /v1/recurrent_charge/:ID/decline` - decline recurrent charge. The buyer can decline charge
* `PUT /v1/recurrent_charge/:ID/activate` - activate direct charge
* `PUT /v1/recurrent_charge/:ID/cancel` - cancel direct charge. Proportional refund is created when cancelled during the settlement period