---
title: "Customer API Guide"
weight: 1
---

# Introduction

## Overview

LiveChat Customer API allows you to join a chat as **a customer** (visitor). It has a different set of methods than the [Agent API](/beta-docs/agent-api). The main reason to have separate APIs for both Customer and Agent are their specific use cases.

## Use cases

With LiveChat Customer API you can do the following:

- build a custom chat widget
- interact with a chat as a customer (join a chat, post messages)

## Important notes

To use this tool you need to have basic knowledge of REST or websocket APIs, OAuth 2.0 protocol and your technology of choice. We've got examples ready in JavaScript, Go and Python.

If you want to perform a chat from the customer perspective, you should use [Agent API](/beta-docs/agent-api).

<div class="callout type-warning">This API is under <strong>heavy development</strong>. We introduce changes every month. If you want to stay updated, follow the changelog below.</div>

# Getting started

## Prerequisites

To start off with LiveChat Customer API, follow these steps:

1. Sign up or sign in to the [Developers Console](https://developers.livechatinc.com/console/).
2. Create a new app ("Backend" type).
3. Copy the Client Secret and Client ID.
