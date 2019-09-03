---
weight : 10
---

# Introduction

Configuration API is a service for storing configuration of license. You can set up here different types of features such as properties or webhooks.

## Versioning

This documentation describes **the version 3.1** of the **Configuration API**.

## Authentication

Authentication for Confiugration API is handled by access tokens. Find out how to get an access token from [Agent authorization flows](https://developers.livechatinc.com/beta-docs/authorization/#agent-authorization-flows)<sup>[![LiveChat Link](link.svg)](https://developers.livechatinc.com/beta-docs/authorization/#agent-authorization-flows)</sup>. If a method requires particular authorization scopes, you’ll find them included in the method description. Each request should contain the `Authorization: Bearer <your_access_token>` header.


## Data centers

LiveChat system operates in two data centers: `dal` and `fra`. The default data center is `dal`.

All the LiveChat OAuth2.0 access tokens have a prefix: `dal-` or `fra-`. This prefix indicates the data center they belong to. If you need to specify the data center while making an API call, simply add the `X-Region: <token_prefix>` optional header.

Summing up, if the user token starts with `fra-`, you should add the `X-Region: fra header`. If the token starts with `dal-` you don’t have to specify the header.

## Propagation delay

All configurations set by this API will have action in system after max 2 minutes. This delay will be removed in the future.





