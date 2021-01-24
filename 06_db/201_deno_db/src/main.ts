import {
  debug,
  error,
  info,
  LOG_LEVEL,
  LogLevel,
  trace,
  warn,
} from "./deps.ts";

import {
  Database,
  DataTypes,
  Model,
  PostgresConnector,
} from "https://deno.land/x/denodb@v1.0.21/mod.ts";

const main = async () => {
  const connection = new PostgresConnector({
    database: "radiosDb",
    host: "localhost",
    username: "postgres",
    password: "mysecretpassword",
    port: 5432, // optional
  });

  const db = new Database({
    debug: false,
    connector: connection,
  });

  class RadioMsg extends Model {
    static table = "radios";
    // static timestamps = true;

    static fields = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: false,
      },
      dt: { type: DataTypes.DATETIME, unique: false, allowNull: false },
      decibels: DataTypes.FLOAT,
      direction: {
        type: DataTypes.STRING,
        length: 2,
        unique: false,
        allowNull: false,
      },
      protocol: {
        type: DataTypes.STRING,
        length: 3,
        unique: false,
        allowNull: false,
      },
      sig: { type: DataTypes.INTEGER, unique: false, allowNull: false },
      clockOffset: { type: DataTypes.FLOAT, unique: false, allowNull: false },
      frequencyHz: { type: DataTypes.INTEGER, unique: false, allowNull: false },
      msg: {
        type: DataTypes.STRING,
        length: 255,
        unique: false,
        allowNull: false,
      },
    };

    // static defaults = {
    //   flightDuration: 2.5,
    // };
  }

  db.link([RadioMsg]);

  // Synchronizing your models means making sure your models are available in the provided database. If they do not exist, synchronizing will create them.

  await db.sync();

  // Some of these tables might have values already and so you might want to drop them
  // await db.sync({ drop: true });

  RadioMsg.on("creating", () => {
    debug("Creating a flight record");
  }).on("created", (model: RadioMsg) => {
    debug(`Created: ${model.id}`);
  }).on("updating", () => {
    debug("Updating RadioMsg");
  }).on("updated", (model: RadioMsg) => {
    debug(`Updated: ${model.id}`);
  }).on("deleting", () => {
    debug("Deleting RadioMsg");
  }).on("deleted", (model: RadioMsg) => {
    debug(`Deleted: ${model.id}`);
  });

  // const radioMsg: RadioMsg = await RadioMsg.create({
  // dt: new Date(),
  // decibels: "aa",
  // direction: "Rx",
  // protocol: "FT8",
  // sig: 7,
  // clockOffset: 12.9,
  // frequencyHz: -26,
  // msg:
  // "Aute adipisicing reprehenderit nulla aute fugiat excepteur elit sunt non commodo deserunt enim et nostrud.",
  // });

  // debug(radioMsg);

  // const count: number | undefined = await RadioMsg.count()!;
  // debug(count);

  // const all: RadioMsg[] = await RadioMsg.select("*").all();
  // debug(all);
};

await main();
