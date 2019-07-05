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

## Categories

```bash
curl -X GET \
  'https://store.com/api/categories?storeId=10001&page=1' \
  -H 'Authorization: Bearer <livechat-oauth-token>'
```

Parameters:

- __storeId__ is an internal ID provided by _/stores_ endpoint
- __page__ is optional parameter that allows to paginate categories (by default 1)

Response:

```json
{
  "categories": [
    {
      "id": "5001", // internal id of a category
      "name": "Books"
    },
    {
      "id": "5010",
      "name": "Games"
    }
  ]
}
```
