---
weight: 30
---

# Store API

## Security

```
Access-Control-Allow-Origin: https://productcards.livechatinc.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

To avoid CORS-related conflicts, you should set proper `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers.

```
Product Cards Client ID: 9e63f93f6782051e6a43549c132a1f7a
```

The app uses **LiveChat OAuth token** to authorize requests sent to your backend service. To confirm that the user is authorized, you should [validate given token](../authorization/#validating-the-access-token) and check if it matches Product Cards client ID and/or your license number.

## Stores

```bash
curl -X GET \
  'https://store.com/api/stores' \
  -H 'Authorization: Bearer <livechat-oauth-token>'
```

The very first request (that will be sent to your backend from our app) fetches basic info about stores available for Product Cards app. It means that it's possible to have more than one store connected to Product Cards. Widget calls your backend for a list of stores as follows:

*__Note__: Even if you want to connect only one store, you need to create this endpoint and provide us the `storeId` - it's required for other requests.*

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

Next Product Cards will fetch information about categories available in the store. The **Categories filter** is based on this endpoint data. 

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

Last but not least, the app will fetch a list of products which show up in the form of tiles.

```bash
curl -X GET \
  'https://store.com/api/products?storeId=10001&page=1&term=Harry+Potter&sort=name&direction=asc&categories=5001%2C5010' \
  -H 'Authorization: Bearer <livechat-oauth-token>'
```

Parameters:

- **storeId**: is an internal ID provided by `/stores` endpoint
- **page** *(optional):* allows to paginate products (default: `1`)
- **term** *(optional):* allows to filter products by name
- **sort** *(optional):* allows to sort by field (supported values: `id`, `name`)
- **direction** *(optional):* allows to determine sort's direction (supported values: `asc`, `desc`)
- **categories** *(optional):* allows too filter products by a list of categories (list of IDs separated by comma)

Expected response:

```json
{
  "products": [
    {
      "id": "2001",
      "name": "Harry Potter",
      "description": "New adventures of a young wizard.",
      "productUrl": "https://store.com/item/2001/harry+potter",
      "imageUrl": "https://cdn.store.com/item_2001.jpg"
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

Product Cards supports pagination, based on <a href ="https://github.com/NationalBankBelgium/REST-API-Design-Guide/wiki/Pagination-Example" target="_blank">*NationalBankBelgium* REST API Design Guide</a>.

