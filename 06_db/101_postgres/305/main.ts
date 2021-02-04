import { Pool } from "https://deno.land/x/postgres@v0.7.0/mod.ts";
import { PoolClient } from "https://deno.land/x/postgres@v0.7.0/client.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.7.0/query.ts";

const POOL_CONNECTIONS = 1;
const dbPool = new Pool({
    user: "postgres",
    password: "1234",
    database: "conduit",
    hostname: "localhost",
    port: 5432,
}, POOL_CONNECTIONS);

interface Tag {
    tags: string[],
}

async function readAllTags(): Promise<Tag> {
    const client: PoolClient = await dbPool.connect();

    const query = "SELECT description FROM tags;";
    const dbResult: QueryObjectResult<Record<string, unknown>> = await client.queryObject(query);
    const rows: Record<string, unknown>[] = dbResult.rows;

    console.log("[ROWS]", rows);

    let tagResult: string[] = []

    const tags = rows.forEach(tag => {
        tagResult.push(tag)
    })

    console.log("[tags]", typeof (tags));


    client.release();
    return <Tag>{
        tags: ["asdf",
            "qwer"
        ]
    }
}

async function run() {
    const tags = await readAllTags();
    console.log(tags);
}

await run();