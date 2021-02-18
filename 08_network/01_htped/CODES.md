# Codes

## Merge keys and values
  ```js
  // deno-lint-ignore no-explicit-any
  // const kvs: any = a.reduce(function (result, field, index) {
  //   result[b[index]] = field;
  //   return result;
  // }, {})

  ```

## Obtain keys and values of a response header
  ```ts
   const headerKeys: string[] = Array.from(headers.keys())
  const headerValues: string[] = Array.from(headers.values())
  // const headersResult: string[] = [];
  const headersResult: string[] = headerKeys.map((headeKey, idx) => {
    return headeKey.concat(": ", headerValues[idx]);
  })

  debug(headersResult);
  ```

## Response class
```ts
  const request: Request = new Request(TARGET, requestInit);
  const response = fetch(request)
    .then((async resp => {
      if (resp.redirected) {
        debug("ENTROU")
        debug(resp.status)
        const redirectToAnotherUrl = Response.redirect(resp.url, 301)
        const redirectToAnotherUrl2 = Response.redirect(redirectToAnotherUrl.headers.get("location")!, 307)
        // debug(redirectToAnotherUrl.headers.get("location"))
        debug(await redirectToAnotherUrl.text());
        debug(await redirectToAnotherUrl2.text());
      }
    }))

```

## Obtain body


```ts
* METHOD 1 - BODY TEXT
.then(async (response) => {
  console.log(response.headers);
  console.log("=== [BODY] ===")
  console.log(await response.text());
});
const responseHeaders = response.headers;
console.log(response.headers);
console.log(response.redirected);

* METHOD 2 -  STREAM
await response.body!.getReader().read().then((value) => {
  const valueString: ArrayBuffer = value.value?.buffer!;
  const text = new TextDecoder("utf-8").decode(valueString);
  console.log(text)
});

* METHOD 2
const a = await response.body!.getReader()['closed'];
console.log(a);
```