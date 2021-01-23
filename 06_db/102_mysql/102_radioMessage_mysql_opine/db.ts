// * GENERATE SQL - https://www.mockaroo.com/

import { Client, ExecuteResult } from "./deps.ts";
import { RadioMessage } from "./radioMessage.ts";

export const TABLENAME = "radios";
const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "radio_db",
  poolSize: 1, // connection limit
  password: "my-secret-pw",
});

export async function readCount(tableName: string): Promise<number> {
  // debug("READ COUNT");
  const queryResult: ExecuteResult = await client.execute(
    `SELECT COUNT(*) FROM ${tableName};`,
  );

  if (queryResult.rows !== undefined && queryResult.rows.length > 0) {
    const dataRetrevied: Record<string, number> = queryResult.rows.pop();
    const dataRetreviedArray: Array<number> = Object.values(dataRetrevied);
    const count: number = dataRetreviedArray.pop()!;
    // trace(count);

    return count;
  }

  return 0;
}

export async function readAll(tableName: string): Promise<RadioMessage[]> {
  const queryResult: ExecuteResult = await client.execute(
    `SELECT * FROM ${tableName};`,
  );

  if (queryResult.rows !== undefined && queryResult.rows.length > 0) {
    return queryResult.rows.map((item) => {
      return <RadioMessage> {
        datetime: item.dt,
        decibels: item.decibels,
        direction: item.direction,
        protocol: item.protocol,
        signal: item.sig,
        clockoffset: item.clockoffset,
        frequencyHz: item.frequencyHz,
        message: item.msg,
      };
    });
  }

  return [];
}

export async function insertOne(
  tableName: string,
  value: RadioMessage,
): Promise<boolean> {
  const query =
    `INSERT INTO ${tableName} (dt, decibels, direction, protocol, sig, clockoffset, frequencyHz, msg) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  const queryResult: ExecuteResult = await client.execute(
    query,
    [
      value.datetime,
      value.decibels,
      value.direction,
      value.protocol,
      value.signal,
      value.clockoffset,
      value.frequencyHz,
      value.message,
    ],
  );

  const affectedRows = queryResult.affectedRows!;

  return affectedRows > 0;
}

export async function updateOne(
  tableName: string,
  value: RadioMessage,
  id: number,
): Promise<boolean> {
  const query =
    `UPDATE ${tableName} SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;

  const queryResult: ExecuteResult = await client.execute(
    query,
    [
      "dt",
      new Date(),
      "decibels",
      `${value.decibels}`,
      "direction",
      `${value.direction}`,
      "protocol",
      `${value.protocol}`,
      "sig",
      `${value.signal}`,
      "clockoffset",
      `${value.clockoffset}`,
      "frequencyHz",
      `${value.frequencyHz}`,
      "msg",
      `${value.message}`,
      "id",
      `${id}`,
    ],
  );

  const affectedRows = queryResult.affectedRows!;

  return affectedRows > 0;
}

export async function deleteOne(
  tableName: string,
  id: number,
): Promise<boolean> {
  const query = `DELETE FROM ${tableName} WHERE ?? = ?;`;

  const queryResult: ExecuteResult = await client.execute(
    query,
    [
      "id",
      `${id}`,
    ],
  );

  const affectedRows = queryResult.affectedRows!;

  return affectedRows > 0;
}
