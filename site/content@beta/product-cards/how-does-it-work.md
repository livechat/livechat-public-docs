---
weight: 20
---

# How does it work?

Product Cards is React-based frontend app, and it is prepared to connect with any backend service that responds in the expected schema.

To make Product Cards work with your store, you need to prepare own backend service, which implements [Store API](#store-api).

## App flow

<div style="text-align:center">
  <img src="../assets/images/product-cards/app-flow.png" alt="App flow">
</div>

## Frontend

The frontend flow (presented in the diagram above) is based on communication between the app, your backend service, and [LiveChat Accounts](../authorization/):

1. The app uses [Sign in with LiveChat](../sign-in-with-livechat/) to acquire the access token. This token will be used to [authorize requests](../authorization/#validating-the-access-token) in your backend service for requests below (via `Authorization` header).
2. Then app fetches the `/stores` endpoint to get a list of available stores.
3. Next app requests the `/categories` endpoint (along with first store ID provided with the first request) to get a list of available categories.
4. Later, the app fetches the `/products` endpoint to get the first page of all available products.

Now user can use stores filter (if more than one store was returned in `/stores` endpoint response) which results in repeating steps 3. and 4. (with different store ID). The user can also use categories filter or search through products (then app repeats step 4. with proper category ID or search term.) 

## Backend

The Product Cards app can work with any backend service that supports communication based on HTTP requests.

Your backend service should be accessible for your users from the browser. You should check the [Security](#security) section below to learn how to secure your backend.

The frontend app expects a response to be in the strict format, which is described in the [Store API](#store-api) section below. You need to implement all endpoints mentioned there (`/stores`, `/categories` and `/products`).