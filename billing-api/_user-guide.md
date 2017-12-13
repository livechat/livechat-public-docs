# User guide

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
