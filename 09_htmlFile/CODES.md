/// <reference lib="dom" />
/// <reference lib="esnext" />
/// <reference no-default-lib="true" />
/// <reference lib="deno.console" />
/// <reference lib="deno.file" />
/// <reference lib="deno.url" />
/// <reference lib="deno.web" />
/// <reference lib="deno.fetch" />
/// <reference lib="deno.websocket" />
/// <reference lib="deno.crypto" />

## settings.json
```json

"deno.config": "./tsconfig.json",
"deno.enable": true,
"deno.unstable": false,
"deno.codeLens.implementations": true,
"deno.codeLens.references": true,
"deno.codeLens.referencesAllFunctions": true,
"deno.internalDebug": true,
"deno.lint": true,
"deno.suggest.imports.hosts": {
    "https://deno.land/": true
},
"[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
},

```
## Simple MVP

```ts

import { serve } from "https://deno.land/std@0.97.0/http/server.ts";

// * Html render
const view = (model: number): string => {
  return `<h1>${model}</h1>`;
};

// * Bussiness logic
const model = (): number => {
  return 42;
};

// * Handler
const presenter = () => {
  const data = model();
  const html = view(data);
  console.log(html);

  return html;
};

presenter();

```