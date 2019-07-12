---
weight: 30
---

# Store API

This section describes all the endpoints you should implement in your backend service. You can use our <a href="https://productcards.livechatinc.com/#/validator/" target="_blank">Backend Validator Tool</a> to test your implementation.

## Security

```
Access-Control-Allow-Origin: https://productcards.livechatinc.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

To avoid CORS-related conflicts, you should set the proper `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers.

```
Product Cards client ID: 9e63f93f6782051e6a43549c132a1f7a
```

The app uses the **LiveChat OAuth token** to authorize requests sent to your backend service. To confirm that the user is authorized, [validate a given token](../authorization/#validating-the-access-token) and check if it matches the Product Cards client ID **and** your license number.

## Stores

> A sample request:

```bash
curl -X GET \
  'https://store.com/api/stores' \
  -H 'Authorization: Bearer <livechat-access-token>'
```

The very first request, which will be sent to your backend from our app, fetches the basic info about stores available for the Product Cards app. It means that it's possible to have more than one store connected to Product Cards. The app calls your backend for a list of stores as follows:

*__Note__: Even if you want to connect only one store, you need to create this endpoint and provide us the store ID - it's required for the next requests.*

> A sample response:

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

**Product Cards** will fetch information about categories available in the store. The **category filter** is based on this endpoint data.  

> A sample request:

```bash
curl -X GET \
  'https://store.com/api/categories?storeId=10001' \
  -H 'Authorization: Bearer <livechat-access-token>'
```

Parameters:

- **storeId**: is an internal ID provided by the `/stores` endpoint

> A sample response:

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

Last but not least, the app will fetch a list of products which will show up in the form of tiles. The response should be paginated and should support the following params:

- **currentPage**: the page that was returned with a current request
- **pageCount**: the total number of pages
- **totalCount**: the total number of products from all pages

> A sample request:

```bash
curl -X GET \
  'https://store.com/api/products?storeId=10001&page=1&categories=5001%2C5010&term=Harry+Potter&sort=name&direction=asc' \
  -H 'Authorization: Bearer <livechat-access-token>'
```

Parameters:

- **storeId**: is an internal ID provided by the `/stores` endpoint
- **page** *(optional):* allows to paginate products (default: `1`)
- **categories** *(optional):* allows to filter products by a list of categories (list of IDs separated by comma and <a href ="https://www.w3schools.com/tags/ref_urlencode.asp" target="_blank">urlencoded</a>)
- **term** *(optional):* allows to filter products by name (urlencoded)
- **sort** *(optional):* allows to sort by field (supported values: `id`, `name`)
- **direction** *(optional):* allows to determine the sorting order (supported values: `asc`, `desc`)

> A sample response:

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
    "pageCount": 2,
    "totalCount": 51
  }
}
```

