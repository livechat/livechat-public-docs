---
weight: 150
---

# Preview upload

When you want to upload an image in some methods (e.g. agent's avatar in creating new agent), you must provide its path on s3. You can get it by using this method.

## Available paths {#preview-upload-available-paths}

| Methods      | Path        |
|--------------|-------------|
| `POST`       | `/previews` |

## Upload a preview

> Path

```
POST https://api.livechatinc.com/previews/<TYPE>
```

> Sample request

```shell
curl "https://api.livechatinc.com/previews" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -F "image=@photo.jpg" 
```

> Sample response

```json
{
  "path": "livechat-temp.s3.amazonaws.com/851e9b9c3bc5c67f5db774494c85fdc1.jpg"
}
```

Returns path to the image on s3.

#### Required properties

| Property | Description               |
|----------|---------------------------|
| `image`  | file with image to upload |


#### Additional info

`TYPE` can be one of the following: `_eye_catcher_`, `_avatar_`, `_logo_`, `_greeting_`, `_button_`
