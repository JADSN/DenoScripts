import { debug, json, NextFunction, Request, Response } from "../deps.ts";

// * Get Current User
export function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({
    "user": {
      "email": "jake@jake.jake",
      "token": "jwt.token.here",
      "username": "jake",
      "bio": "I work at statefarm",
      "image": null,
    },
  });
}

// * Authentication - SignIn(Login)
export function authSignIn(req: Request, res: Response, next: NextFunction) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({
    "user": {
      "email": "jake@jake.jake",
      "token": "jwt.token.here",
      "username": "jake",
      "bio": "I work at statefarm",
      "image": null,
    },
  });
}

// * Authentication - SignUp(Registration)
export function authSignUp(req: Request, res: Response, next: NextFunction) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({
    "user": {
      "email": "jake@jake.jake",
      "token": "jwt.token.here",
      "username": "jake",
      "bio": "I work at statefarm",
      "image": null,
    },
  });
}
