import { runQuery } from "../../utils.ts";
import { QueryResult } from "../../../deps.ts";
import { App } from "../../../types.ts";

export async function readFirst(tablename: string): Promise<App> {
  const queryResult: QueryResult = await runQuery(
    `SELECT name, version FROM public.app WHERE id = 1;`,
  );

  const data: App[] = queryResult.rows.map((row) => {
    return <App> {
      // id: parseInt(row[0]),
      name: row[0],
      version: row[1],
    };
  });

  const firstDataApp: App = data[0];

  return firstDataApp;
}
