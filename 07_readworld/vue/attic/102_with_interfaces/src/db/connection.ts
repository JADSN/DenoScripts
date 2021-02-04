import { debug, Pool, PoolClient, QueryResult } from "../deps.ts";

// const TABLENAME = "todos";
const POOL_CONNECTIONS = 1;
export const dbPool = new Pool({
  user: "postgres",
  password: "1234",
  database: "conduit",
  hostname: "localhost",
  port: 5432,
}, POOL_CONNECTIONS);
