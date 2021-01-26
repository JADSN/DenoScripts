import { debug, json, NextFunction, Request, Response } from "../deps.ts";

// * Get Comments from an Article
export function getCommentsFromArticle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({
    "comments": [{
      "id": 1,
      "createdAt": "2016-02-18T03:22:56.637Z",
      "updatedAt": "2016-02-18T03:22:56.637Z",
      "body": "It takes a Jacobian",
      "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false,
      },
    }],
  });
}

// * Add Comments to an Article
export function addCommentsToAnArticle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({
    "comment": {
      "id": 1,
      "createdAt": "2016-02-18T03:22:56.637Z",
      "updatedAt": "2016-02-18T03:22:56.637Z",
      "body": "It takes a Jacobian",
      "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false,
      },
    },
  });
}

// * Delete Comment
export function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  debug(req.originalUrl);

  res.setStatus(200);
  res.json({ "status": "DELETED" });
}
