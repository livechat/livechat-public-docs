---
weight: 30
---

# Store API

## CORS

```
Access-Control-Allow-Origin: https://productcards.livechatinc.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

To avoid CORS-related conflicts you should set proper `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers.

## Stores

```bash
curl -X GET \
  'https://store.com/api/stores' \
  -H 'Authorization: Bearer <livechat-oauth-token>'
```

It's possible to have more than one store connected to Product Cards. Widget calls backend for a list of stores as follows:

Expected response:

```json
[
  {
    "id": "1001", // internal id of a store
    "name": "MyStore"
  },
  {
    "id": "1002",
    "name": "MyStore2"
  }
]
```
