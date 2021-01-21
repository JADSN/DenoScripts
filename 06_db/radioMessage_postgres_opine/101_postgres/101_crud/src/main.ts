interface Todo {
  id: number;
  description: string;
  done: boolean;
}

enum StatusDb {
  CREATED,
  UPDATED,
  DELETED,
}

import { Pool } from "https://deno.land/x/postgres@v0.4.6/mod.ts";
import { PoolClient } from "https://deno.land/x/postgres@v0.4.6/client.ts";
// import { QueryResult } from "https://deno.land/x/postgres@v0.4.6/client.ts";

const TABLENAME = "todos";
const POOL_CONNECTIONS = 1;
const dbPool = new Pool({
  user: "postgres",
  password: "mysecretpassword",
  database: "tasker",
  hostname: "localhost",
  port: 5432,
}, POOL_CONNECTIONS);

async function runQuery(query: string) {
  const client: PoolClient = await dbPool.connect();
  const dbResult = await client.query(query);
  console.log(typeof (dbResult));

  client.release();
  return dbResult;
}

async function readCount(tablename: string): Promise<number> {
  // Cannot redeclare block-scoped variable 'query'
  // const query = await runQuery(`SELECT COUNT(*) FROM todos`);
  // TODO: Define type to compile-type-check
  const queryResult = await runQuery(`SELECT COUNT(*) FROM todos`);
  const count = parseInt(queryResult.rows[0][0]);
  return count;
}

async function readAll(tablename: string): Promise<Todo[]> {
  const queryResult = await runQuery(
    `SELECT * FROM ${tablename} ORDER BY id ASC;`,
  );

  const todos: Todo[] = queryResult.rows.map((row) => {
    return <Todo> {
      id: parseInt(row[0]),
      description: row[1],
      done: row[2],
    };
  });

  return todos;
}

//  TODO: Change to enum
async function insertOne(tablename: string): Promise<boolean> {
  const queryResult = await runQuery(
    `insert into public.${tablename} (description, done) values ('INSERTED', false);`,
  );

  // TODO: If batch(multiple inserts) use >= instead of ==
  return queryResult.rowCount == 1;
}

async function updateOne(
  tablename: string,
  newValue: Todo,
  id: number,
): Promise<boolean> {
  const queryResult = await runQuery(
    `UPDATE ${tablename} SET description = '${newValue.description}', done = ${newValue.done} WHERE id = ${id}`,
  );

  // TODO: If batch(multiple inserts) use >= instead of ==
  return queryResult.rowCount == 1;
}

async function deleteOne(tablename: string, id: number): Promise<boolean> {
  const queryResult = await runQuery(
    `DELETE FROM ${tablename} WHERE id = ${id}`,
  );

  // TODO: If batch(multiple inserts) use >= instead of ==
  return queryResult.rowCount == 1;
}

async function main() {
  console.log(await readCount(TABLENAME));
  console.log(await insertOne(TABLENAME));

  console.log(
    await updateOne(
      "todos",
      { id: 2, description: "asdf", done: false },
      13,
    ),
  );

  console.log(await deleteOne(TABLENAME, 4));

  console.log(await readAll(TABLENAME));
}

main();
