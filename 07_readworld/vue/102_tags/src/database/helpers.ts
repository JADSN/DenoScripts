import { PoolClient, QueryResult } from "../deps.ts";
import { dbPool } from "../connection.ts"
import { debug } from "../utils.ts";

export async function runQuery(query: string): Promise<QueryResult> {
    const client: PoolClient = await dbPool.connect();
    const dbResult: QueryResult = await client.queryObject(query);

    debug("[QUERY]");
    debug(query);

    client.release();
    return dbResult;
}