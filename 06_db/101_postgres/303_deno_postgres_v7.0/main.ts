import { Pool } from "https://deno.land/x/postgres@v0.7.0/mod.ts";
import { PoolClient } from "https://deno.land/x/postgres@v0.7.0/client.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.7.0/query.ts";

const POOL_CONNECTIONS = 1;
const dbPool = new Pool({
    user: "postgres",
    password: "1234",
    database: "pos",
    hostname: "localhost",
    port: 5432,
}, POOL_CONNECTIONS);

interface Tag {
    id: number,
    description: string,
}

async function readAllTags(): Promise<Tag[]> {
    const client: PoolClient = await dbPool.connect();

    const query = "SELECT* FROM tags;";
    const dbResult: QueryObjectResult<Record<string, unknown>> = await client.queryObject(query);
    const rows: Record<string, unknown>[] = dbResult.rows;

    const tags: Tag[] = rows.map(tag => {
        return <Tag>{
            id: tag['id'],
            description: tag['description']
        };
    })

    client.release();
    return tags;
}

async function run() {
    const tags: Tag[] = await readAllTags();
    console.log(tags);
}

await run();