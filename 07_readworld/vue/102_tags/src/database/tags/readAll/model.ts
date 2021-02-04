
import { QueryResult, PoolClient, QueryObjectResult } from "../../../deps.ts";
import { Tag } from "../../../types.ts";
import { runQuery } from "../../helpers.ts";

import { debug } from "../../../utils.ts";

import { dbPool } from "../../../connection.ts"

// export async function model(): Promise<Tag[]> {
//     const client: PoolClient = await dbPool.connect();

//     const query = "SELECT descriptions FROM tags;";
//     const dbResult: QueryObjectResult<Record<string, unknown>> = await client.queryObject(query);
//     const rows: Record<string, unknown>[] = dbResult.rows;

//     const tags: Tag[] = rows.map(tag => {
//         return <Tag>{
//             id: tag['id'],
//             description: tag['description']
//         };
//     })

//     client.release();
//     return tags;
// }

export async function model(): Promise<Tag[]> {
    const client: PoolClient = await dbPool.connect();

    const query = "SELECT description FROM tags;";
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