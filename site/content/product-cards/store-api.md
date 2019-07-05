---
weight: 30
---

# Store API

## Security

```
Access-Control-Allow-Origin: https://productcards.livechatinc.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

To avoid CORS-related conflicts you should set proper `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers.

The app uses **LiveChat OAuth token** to authorize requests sent to your backend service. To confirm that user is authorized, you should [validate given token](../authorization/#validating-the-access-token) and check if it matches Product Cards client ID and/or your license number.

```
Product Cards Client ID: 9e63f93f6782051e6a43549c132a1f7a
```

## Stores

```bash
curl -X GET \
  'https://store.com/api/stores' \
  -H 'Authorization: Bearer <livechat-oauth-token>'
```

It's possible to have more than one store connected to Product Cards. Widget calls your backend for a list of stores as follows:

*Note:* Even if you have only one store, you need to create this endpoint and provide us the `storeId` - it's required for other requests.

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

- **storeId**: is an internal ID provided by `/stores` endpoint
- **page** *(optional):* allows to paginate categories (default: `1`)

Expected response:

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

## Products

```bash
curl -X GET \
  'https://store.com/api/products?storeId=10001&page=1&term=Harry+Potter&sort=name&direction=asc&categories=5001%2C5010' \
  -H 'Authorization: Bearer <livechat-oauth-token>'
```

Parameters:

- __storeId__ is an internal ID provided by _/stores_ endpoint
- __page__ (optional) parameter that allows to paginate products
- __term__ (optional) allows to filter products by name
- __sort__ (optional) sort by field (supported values: id, name)
- __direction__ (optional) sort's direction (supported values: asc, desc)
- __categories__ (optional) allows too filter products by a list of categories (list of IDs separated by comma)

Response:

```json
{
  "products": [
    {
      "id": "2001",
      "name": "Harry Potter",
      "description": "New adventures of a young wizard.",
      "productUrl": "https://store.com/item/harry+potter",
      "imageUrl": "https://cdn.store.com/item_220221.jpg"
    }
  ],
  "pagination": {
    "currentPage": 2,
    "limit": 50,
    "offset": 50,
    "previousOffset": 0,
    "pageCount": 7,
    "totalCount": 310
  }
}
```
