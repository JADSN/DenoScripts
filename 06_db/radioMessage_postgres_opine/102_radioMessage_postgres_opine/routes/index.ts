import { Router } from "../deps.ts";
import { FILENAME, obtainAllRadioMessageFromFile } from "../radioMessage.ts";
import { insertOne, readAll, readCount, TABLENAME } from "../db.ts";

const router = Router();

// * FROM FILE - DEBUG
const allRadioMessageFromFile = await obtainAllRadioMessageFromFile(FILENAME);
const countFromDb = await readCount(TABLENAME);

if (countFromDb == 0) {
  allRadioMessageFromFile.forEach((radioMessageFromFile) => {
    insertOne(TABLENAME, radioMessageFromFile);
  });
}

// GET home page.
router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "Radio Message",
    radioMessages: await readAll(TABLENAME),
  });
});

export default router;
