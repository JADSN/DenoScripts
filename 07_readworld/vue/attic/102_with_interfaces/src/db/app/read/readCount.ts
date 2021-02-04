import { runQuery } from "../../utils.ts";
import { QueryResult } from "../../../deps.ts";

export async function readCount(tableName: string): Promise<number> {
  const queryResult: QueryResult = await runQuery(
    `SELECT COUNT(*) FROM ${tableName}`,
  );
  const count: number = parseInt(queryResult.rows[0][0]);
  return count;
}
