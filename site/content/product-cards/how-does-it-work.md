---
weight: 20
---

# How does it work?

## App flow

<div style="text-align:center">
  <img src="../assets/images/product-cards/app-flow.png" alt="App flow">
</div>

## Frontend

Product Cards frontend app is based on React, and it is prepared to connect with any backend service that responds in the expected schema.

Full frontend flow (presented in the diagram above) is based on communication between the app, your backend service and [LiveChat Accounts](../authorization/):

1. The app uses [Sign in with LiveChat](../sign-in-with-livechat/) to acquire the access token. This token will be used to [authorize requests](../authorization/#validating-the-access-token) in your backend service.
2. Then app fetches the `/stores` endpoint to get a list of available stores.
3. Next app requests the `/categories` endpoint (along with first store ID provided with the first request) to get a list of available categories.
4. Later, the app fetches the `/products` endpoint to get the first page of all available products.

Now user can use stores filter (if more than one store was returned in `/stores` endpoint response) which results with repeating steps 3. and 4. with different store ID. The user can also use categories filter or search through products (then app repeats step 4. with proper category ID or search term.) 

## Backend

