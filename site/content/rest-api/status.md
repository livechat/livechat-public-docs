# Status

You can use this method to check whether your LiveChat is **online** or **offline**.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET` | `/status` |


## Get status

> Path

```
GET https://api.livechatinc.com/status
```

> Sample request

```shell
curl "https://api.livechatinc.com/status/1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Sample response

```json-doc
{
  "status":"online"
}
```

Returns the current LiveChat status. Available return values: `online`, `offline`.

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `group` | defaults to 0 |

