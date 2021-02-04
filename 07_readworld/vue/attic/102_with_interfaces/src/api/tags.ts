import { json, NextFunction, Request, Response } from "../deps.ts";
import { debug } from "../utils.ts";

// * List of Tags
export function tags(req: Request, res: Response, next: NextFunction) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({
    tags: [
      "reactjs",
      "angularjs",
    ],
  });
}
