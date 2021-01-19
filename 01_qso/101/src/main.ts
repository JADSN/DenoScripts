// * Objetivo: Ter as mensagens ciclos - mapeamento de sessão.

// * Grid squares: Grid squares are a shorthand means of describing your general location anywhere on the Earth in a manner that is easy to communicate over the air.

// ? Questions
// ? 1 - Quem respondeu o CQ do PONTO_A
// ? 2 - Qual o intervalo entre os estágios 3 e 2
// ? 3 -
// ? 3 -

// https://www.karhukoti.com/maidenhead-grid-square-locator

// * Read file line by line
import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

// interface Message {
//   recv: string;
//   trans: string;
// }

interface Qso {
  utc: string;
  dB: number;
  dt: number;
  freq: number;
  message: string;
}

const INTERVAL = 15;

const filename = Deno.args[0];

console.log("[DEBUG] - file:", filename);

// TODO: Write correct syntax function
// https://www.typescriptlang.org/docs/handbook/functions.html#writing-the-function-type

const fileArrayStringToQsoArray = (arr: string[]): Qso[] => {
  console.log("fileArrayStringToQsoArray()");

  const db: Qso[] = [];
  const utc = arr[0];
  const dB = parseInt(arr[1]);
  const dt = parseFloat(arr[2]);
  const freq = parseInt(arr[3]);
  const message = arr[5];

  const qso = {
    utc: utc,
    dB: dB,
    dt: dt,
    freq: freq,
    message: message,
  };

  db.push(qso);

  console.log("[DEBUG] - db:", db);

  return db;
};

const readFileLineByLine = async () => {
  const file = await Deno.open(filename);
  for await (const line of readline(file)) {
    const qso = new TextDecoder().decode(line);

    // TODO: Normalize do split

    const qsoSplit = qso.split("  ");

    console.log("[DEBUG] - qso:", qsoSplit);

    fileArrayStringToQsoArray(qsoSplit);
  }
  file.close();
};

readFileLineByLine();
