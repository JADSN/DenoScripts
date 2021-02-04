import { runQuery } from "../../utils.ts";
import { QueryResult } from "../../../deps.ts";
import { Author } from "../../../types.ts";

export async function readAll(tableName: string): Promise<Author[]> {
  const queryResult: QueryResult = await runQuery(
    `SELECT * FROM ${tableName};`,
  );

  const data: Author[] = queryResult.rows.map((row) => {
    return <Author> {
      id: parseInt(row[0]),
      username: row[1],
      bio: row[2],
      image: row[3],
      following: row[3],
    };
  });

  return data;
}
