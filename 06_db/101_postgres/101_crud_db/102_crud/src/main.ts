// TODO: Criar uma função debug (utils)

import { debug } from "./utils.ts";

// ? Como utiliza os recursos do TypesScript
// https://github.com/denodrivers/postgres/blob/master/query.ts

interface Xpto extends Todo {
  xpto: string;
}

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
import { QueryResult } from "https://deno.land/x/postgres@v0.4.6/query.ts";

const TABLENAME = "todos";
const POOL_CONNECTIONS = 1;
const dbPool = new Pool({
  user: "postgres",
  password: "mysecretpassword",
  database: "tasker",
  hostname: "localhost",
  port: 5432,
}, POOL_CONNECTIONS);

async function runQuery(query: string): Promise<QueryResult> {
  // async function runQuery(query: string) {
  debug("runQuery()");
  const client: PoolClient = await dbPool.connect();
  const dbResult: QueryResult = await client.query(query);

  debug("typeof (dbResult)");
  debug(typeof (dbResult));
  // console.log("[DEBUG - runQuery]: ", typeof (dbResult), dbResult);

  client.release();
  return dbResult;

  // return true;
}

async function readCount(tablename: string): Promise<number> {
  // Cannot redeclare block-scoped variable 'query'
  // const query = await runQuery(`SELECT COUNT(*) FROM todos`);
  // TODO: Define type to compile-type-check
  const queryResult: QueryResult = await runQuery(`SELECT COUNT(*) FROM todos`);
  const count: number = parseInt(queryResult.rows[0][0]);
  return count;
}

async function readAll(tablename: string): Promise<Todo[]> {
  const queryResult: QueryResult = await runQuery(
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
  const queryResult: QueryResult = await runQuery(
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
  const queryResult: QueryResult = await runQuery(
    `UPDATE ${tablename} SET description = '${newValue.description}', done = ${newValue.done} WHERE id = ${id}`,
  );

  // TODO: If batch(multiple inserts) use >= instead of ==
  return queryResult.rowCount == 1;
}

async function deleteOne(tablename: string, id: number): Promise<boolean> {
  const queryResult: QueryResult = await runQuery(
    `DELETE FROM ${tablename} WHERE id = ${id}`,
  );

  // TODO: If batch(multiple inserts) use >= instead of ==
  return queryResult.rowCount == 1;
}

async function main() {
  const count: number = await readCount(TABLENAME);
  debug(count);

  const isInserted: boolean = await insertOne(TABLENAME);
  debug(isInserted);

  const isUpdated: boolean = await updateOne(
    "todos",
    { id: 2, description: "asdf", done: false },
    13,
  );

  debug(isUpdated);

  const isDeleted: boolean = await deleteOne(TABLENAME, 4);
  debug(isDeleted);

  const x: Xpto = {
    id: 0,
    description: "",
    done: false,
    xpto: "",
  };

  debug(x);

  const all: Todo[] = await readAll(TABLENAME);

  debug(all);
}

main();
