import { Router } from "../deps.ts";
import {
  FILENAME,
  obtainAllRadioMessageFromFile,
  RadioMessage,
} from "../radioMessage.ts";

import { RadioMsg } from "../db.ts";

const router = Router();

// * FROM FILE - DEBUG
const allRadioMessageFromFile: RadioMessage[] =
  await obtainAllRadioMessageFromFile(FILENAME);
const countFromDb: number | undefined = await RadioMsg.count()!;

// console.log(typeof (allRadioMessageFromFile[0].datetime.toISOString()));
// console.log(allRadioMessageFromFile[0].datetime);

if (await countFromDb == 0) {
  allRadioMessageFromFile.forEach(async (radioMessageFromFile) => {
    await RadioMsg.create({
      dt: radioMessageFromFile.datetime,
      decibels: radioMessageFromFile.decibels,
      direction: radioMessageFromFile.direction,
      protocol: radioMessageFromFile.protocol,
      sig: radioMessageFromFile.signal,
      clockOffset: radioMessageFromFile.clockoffset,
      frequencyHz: radioMessageFromFile.frequencyHz,
      msg: radioMessageFromFile.message,
    });
  });
}

// GET home page.
router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "Radio Message",
    radioMessages: await RadioMsg.select("*").all(),
  });
});

export default router;
