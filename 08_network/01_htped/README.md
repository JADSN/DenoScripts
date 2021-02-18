# htped

Fetch to follow redirects

## Fetch

```ts
const resp = await fetch("http:google.com", { method: 'GET', redirect: 'follow', mode: "no-cors" })
```

## Redirect

Redirect
```txt
response.headers.location

if(res.statusCode === 301 || res.statusCode === 302) {
      return get(res.headers.location, resolve, reject)
    }
```


## REFERENCES
[Deno CheatSheet](https://droces.github.io/Deno-Cheat-Sheet/)
[Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#cors)
[](https://blog.logrocket.com/understanding-denos-file-system/)