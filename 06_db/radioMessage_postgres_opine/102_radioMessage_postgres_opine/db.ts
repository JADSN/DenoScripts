// * GENERATE SQL - https://www.mockaroo.com/

import { Pool, PoolClient } from "./deps.ts";
import { RadioMessage } from "./radioMessage.ts";

export const TABLENAME = "radios";
const POOL_CONNECTIONS = 1;
const dbPool = new Pool({
  user: "postgres",
  password: "mysecretpassword",
  database: "qso",
  hostname: "localhost",
  port: 5432,
}, POOL_CONNECTIONS);

export async function runQuery(query: string) {
  const client: PoolClient = await dbPool.connect();
  const dbResult = await client.query(query);
  client.release();
  return dbResult;
}

export async function readCount(tablename: string): Promise<number> {
  // Cannot redeclare block-scoped variable 'query'
  // const query = await runQuery(`SELECT COUNT(*) FROM todos`);
  const queryResult = await runQuery(`SELECT COUNT(*) FROM ${tablename}`);
  const count = parseInt(queryResult.rows[0][0]);
  return count;
}

export async function readAll(tablename: string): Promise<RadioMessage[]> {
  const queryResult = await runQuery(
    `SELECT * FROM ${tablename} ORDER BY id ASC;`,
  );

  const todos: RadioMessage[] = queryResult.rows.map((row) => {
    return <RadioMessage> {
      datetime: row[1],
      decibels: row[2],
      direction: row[3],
      protocol: row[4],
      signal: row[5],
      clockoffset: row[6],
      frequencyHz: row[7],
      message: row[8],
    };
  });

  return todos;
}

//  TODO: Change to enum
export async function insertOne(
  tablename: string,
  radioMessage: RadioMessage,
): Promise<boolean> {
  const query =
    `insert into public.${tablename} (datetime, decibels, direction, protocol, signal, clockoffset, frequencyhz, msg) values ('${radioMessage.datetime.toISOString()}', ${radioMessage.decibels}, '${radioMessage.direction}', '${radioMessage.protocol}', ${radioMessage.signal}, ${radioMessage.clockoffset}, ${radioMessage.frequencyHz}, '${radioMessage.message}');`;

  console.log(query);

  const queryResult = await runQuery(query);

  // TODO: If batch(multiple inserts) use >= instead of ==
  return queryResult.rowCount == 1;
}
