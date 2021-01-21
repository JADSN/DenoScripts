import { Router } from "../deps.ts";
import { FILENAME, obtainAllRadioMessageFromFile } from "../radioMessage.ts";

const router = Router();

// * DEBUG
await obtainAllRadioMessageFromFile(FILENAME);

// GET home page.
router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "Radio Message",
    radioMessages: await obtainAllRadioMessageFromFile(FILENAME),
  });
});

export default router;
