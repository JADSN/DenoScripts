# Codes

## Current file_name
```ts

import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __filename = path.fromFileUrl(import.meta.url);
// Without trailing slash
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

```

## Decode cmd text
```ts

console.log(await proc.status());
const data = await proc.stderrOutput();
const output = new TextDecoder().decode(data);
console.log(output);

```  