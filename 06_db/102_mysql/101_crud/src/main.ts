// * See later: https://deno.land/x/sql_builder@v1.8.0 (to mount sql query)

// ! [BUG] Not supported: https://github.com/denodrivers/mysql/search?q=Not+supported

import {
  debug,
  error,
  info,
  LOG_LEVEL,
  LogLevel,
  trace,
  warn,
} from "./deps.ts";

import { parse } from "https://deno.land/std@0.84.0/datetime/mod.ts";

import { Client } from "https://deno.land/x/mysql@v2.7.0/mod.ts";
import { ExecuteResult } from "https://deno.land/x/mysql@v2.7.0/src/connection.ts";

export interface RadioMessage {
  datetime: Date;
  decibels: number;
  direction: string;
  protocol: string;
  signal: number;
  clockoffset: number;
  frequencyHz: number;
  message: string;
}

const TABLENAME = "radios";

const main = async () => {
  const client = await new Client().connect({
    hostname: "localhost",
    username: "root",
    db: "radio_db",
    poolSize: 2, // connection limit
    password: "my-secret-pw",
  });

  async function readCount(tableName: string): Promise<number> {
    debug("READ COUNT");
    const queryResult: ExecuteResult = await client.execute(
      `SELECT COUNT(*) FROM ${tableName};`,
    );

    if (queryResult.rows !== undefined && queryResult.rows.length > 0) {
      const dataRetrevied: Record<string, number> = queryResult.rows.pop();
      const dataRetreviedArray: Array<number> = Object.values(dataRetrevied);
      const count: number = dataRetreviedArray.pop()!;
      trace(count);

      return count;
    }

    return 0;
  }

  async function readAll(tableName: string): Promise<RadioMessage[]> {
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

  async function insertOne(
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

  async function updateOne(
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

  async function deleteOne(
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

  // * READ COUNT
  // const radioCountResult = await readCount(TABLENAME);
  // debug(radioCountResult);

  // * READ ALL
  // const radiosResultReadAll = await readAll(TABLENAME);
  // debug(radiosResultReadAll);

  // * INSERT ONE
  // const radioToInsert = <RadioMessage> {
  //   datetime: new Date(),
  //   decibels: 0,
  //   direction: "Rx",
  //   protocol: "FT8",
  //   signal: -16,
  //   clockoffset: 0.7,
  //   frequencyHz: 730,
  //   message: "ASDF ZXCV ER",
  // };

  // const isInserted = await insertOne(TABLENAME, radioToInsert);
  // debug(isInserted);

  // * UPDATE ONE
  // const radioToUpdate = <RadioMessage> {
  //   datetime: new Date(),
  //   decibels: 0,
  //   direction: "Rx",
  //   protocol: "FT8",
  //   signal: -16,
  //   clockoffset: 0.7,
  //   frequencyHz: 730,
  //   message: "UPDATED",
  // };

  // const isUpdated = await updateOne(TABLENAME, radioToUpdate, 1);
  // debug(isUpdated);

  // * DELETE ONE
  const isDeleted = await deleteOne(TABLENAME, 3);
  debug(isDeleted);
};

main();
