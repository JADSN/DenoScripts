import { Pool, PoolClient, QueryResult } from "./deps.ts";

const POOL_CONNECTIONS = 1;
export const dbPool: Pool = new Pool({
  user: "postgres",
  password: "1234",
  database: "conduit",
  hostname: "localhost",
  port: 5432,
}, POOL_CONNECTIONS);
