import { debug, json, NextFunction, Request, Response } from "../deps.ts";

// * Get Profile
export function getProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({
    "profile": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
      "following": false,
    },
  });
}
