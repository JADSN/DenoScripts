// * GENERATE SQL - https://www.mockaroo.com/

import { Database, DataTypes, Model, PostgresConnector } from "./deps.ts";
import { RadioMessage } from "./radioMessage.ts";

const POOL_CONNECTIONS = 1;
const connection = new PostgresConnector({
  database: "radiosDb",
  host: "localhost",
  username: "postgres",
  password: "mysecretpassword",
  port: 5432, // optional
});

const db = new Database({
  debug: false,
  // dialect: "postgres",
  connector: connection,
});

export class RadioMsg extends Model {
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

// RadioMsg.on("creating", () => {
//   console.log("Creating a flight record");
// }).on("created", (model: RadioMsg) => {
//   console.log(`Created: ${model.id}`);
// }).on("updating", () => {
//   console.log("Updating RadioMsg");
// }).on("updated", (model: RadioMsg) => {
//   console.log(`Updated: ${model.id}`);
// }).on("deleting", () => {
//   console.log("Deleting RadioMsg");
// }).on("deleted", (model: RadioMsg) => {
//   console.log(`Deleted: ${model.id}`);
// });
