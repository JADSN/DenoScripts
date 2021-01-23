# Codes

## Envviroment variables for DB
```ts

// DB connection params
const config = {
  host: Deno.env.get("DB_HOST") || "localhost",
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
  user: Deno.env.get("DB_USER") || "postgres",
  database: Deno.env.get("DB_NAME") || "todo",
  password: Deno.env.get("DB_PASSWORD") || "",
};


```


## Sleep in TypeScript
```ts

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

```
