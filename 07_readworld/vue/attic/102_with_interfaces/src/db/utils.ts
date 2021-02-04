import { debug, PoolClient, QueryResult } from "../deps.ts";
import { dbPool } from "./connection.ts";

export async function runQuery(query: string): Promise<QueryResult> {
  const client: PoolClient = await dbPool.connect();
  const dbResult: QueryResult = await client.query(query);

  debug("[QUERY]");
  debug(query);

  client.release();
  return dbResult;
}
