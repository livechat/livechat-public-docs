---
weight: 20
---

# How does it work?

**Product Cards** is a React-based frontend app. It was designed to connect with any backend service that responds in an expected schema.

To make Product Cards work with your store, you need to prepare own backend service, which implements [Store API](#store-api). You can use our <a href="https://productcards.livechatinc.com/#/validator/" target="_blank">Backend Validator Tool</a> to test your implementation.

## App flow

<div style="text-align:center">
  <img src="../assets/images/product-cards/app-flow.png" alt="App flow">
</div>

## Frontend

The frontend flow (presented in the diagram above) is based on communication between the app, your backend service, and [LiveChat Accounts](../authorization/):

1. The app uses [Sign in with LiveChat](../sign-in-with-livechat/) to acquire the access token. This token will be used to [authorize requests](../authorization/#validating-the-access-token) in your backend service for requests below (via `Authorization` header).
2. Then, the app fetches the `/stores` endpoint to get the list of available stores.
3. Next, the app requests the `/categories` endpoint - along with the first store ID provided with the first request - to get the list of available categories. The request contains the first store ID, which was provided in the first request.
4. Later, the app fetches the `/products` endpoint to get the first page of all available products.

If more than one store is returned in the`/stores` endpoint response, the user can use the store filter. It results in repeating steps 3. and 4. with a different store ID. The user can also use the category filter or search through products. Then, the app repeats step 4. with the proper category ID or search term). 

## Backend

The Product Cards app can work with any backend service that supports communication based on HTTP requests.

Your backend service should be accessible for your users from the browser. To learn how to secure your backend service, check out the [Security](#security) section below.

The frontend app expects a response in a specifically defined format, which is described in the [Store API](#store-api) section below. You need to implement all mentioned endpoints (`/stores`, `/categories` and `/products`).