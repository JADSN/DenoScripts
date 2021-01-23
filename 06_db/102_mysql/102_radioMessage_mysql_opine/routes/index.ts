import { Router } from "../deps.ts";
import {
  FILENAME,
  obtainAllRadioMessageFromFile,
  RadioMessage,
} from "../radioMessage.ts";
import { insertOne, readAll, readCount, TABLENAME } from "../db.ts";

const router = Router();

// * FROM FILE - DEBUG
const countFromDb: number = await readCount(TABLENAME);

if (countFromDb == 0) {
  const allRadioMessageFromFile = await obtainAllRadioMessageFromFile(FILENAME);
  allRadioMessageFromFile.forEach((radioMessageFromFile) => {
    insertOne(TABLENAME, radioMessageFromFile);
  });
}

const allRadioMessageFromDb: RadioMessage[] = await readAll(TABLENAME)!;

const normalizeRadioMessageFromDb = allRadioMessageFromDb.map(
  (radioMessage) => {
    return {
      datetime: radioMessage.datetime.toISOString(),
      decibels: radioMessage.decibels,
      direction: radioMessage.direction,
      protocol: radioMessage.protocol,
      signal: radioMessage.signal,
      clockoffset: radioMessage.clockoffset,
      frequencyHz: radioMessage.frequencyHz,
      message: radioMessage.message,
    };
  },
);

// GET home page.
router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Radio Message",
    radioMessages: normalizeRadioMessageFromDb,
  });
});

export default router;
