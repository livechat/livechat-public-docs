---
weight: 30
---

# User guide

## 1. Authorization

The Billing API is based on the [LiveChat OAuth](https://docs.livechatinc.com/authorization/) authorization flow. All endpoints require access tokens, and some endpoints are limited by scope or client ID.

## 2. APIS

### 2.1. [Direct Charges](#direct-charges)

The Direct Charges API allows you to collect one-time fees.

#### Use cases:

* Collecting a single charge for an application in the Marketplace
* Collecting in-app micropayments
* Charging for additional features in the apps

### 2.2. [Ledger](#ledger)

The Ledger API lets you manage the financial activity and balance. In other words, it will show you the purchase history and your earnings.

#### Use cases:

* Checking the balance
* Checking the billing history

### 2.3. [Recurrent Charges](#recurrent-charges)

The Recurrent Charges API handles periodic payments. For example, you can offer an app that costs $10 per month.

#### Use cases:

* Viewing the subscriptions
* Updating the subscriptions
