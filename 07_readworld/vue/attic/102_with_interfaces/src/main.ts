// TODO: Ajeitar os imports - Só pode ficar no deps somente as bibliotecas de terceiros. Ex.: Tags
// TODO: Remover e extrair o código abaixo listen
// TODO: Os arquivos dos endpoints da api e transformar em pastas. Ex. getListOf

// TODO: Renomear os arquivos dos tests

// * FRONTEND: https://github.com/gothinkster/realworld/tree/master/api

// TODO: Add favicon to front
// http://localhost:8000/img/icons/favicon-32x32.png

// TODO: Delete Article
// Format JSON

// TODO: Un/Follow User

// * IMPORT 3RD PARTY LIBS - BEGIN

import {
  addCommentsToAnArticle,
  authSignIn,
  authSignUp,
  createArticle,
  deleteArticle,
  deleteComment,
  favoriteArticle,
  feedArticles,
  getCommentsFromArticle,
  getCurrentUser,
  getListofArticles,
  getProfile,
  getSingleArticle,
  json,
  opine,
  opineCors,
  // tags,
  updateArticle,
  updateUser,
} from "./deps.ts";

// * IMPORT 3RD PARTY LIBS - END

// * IMPORT UTILS - BEGIN
import { LOG_LEVEL, LogLevel } from "./config.ts";
import { debug, error, info, trace, warn } from "./utils.ts";

// * IMPORT UTILS - END

// * IMPORT ENDPOINTS - BEGIN

// * List of Tags
import { tags } from "./api/mod.ts";

// * IMPORT ENDPOINTS - END

const app = opine();

// * Use the JSON body parser to set `req.parsedBody` to the
// * passed JSON payload.
app.use(json());

// * Enable CORS for All Routes
app.use(opineCors());

// * MOUNT ENDPOINTS - BEGIN

// * List of Tags
app.get("/api/tags/", tags);

// * List Articles
app.get("/api/articles", getListofArticles);

// * Single Article
app.get("/api/articles/:slug", getSingleArticle);

// * Get Comments from an Article
app.get("/api/articles/:slug/comments", getCommentsFromArticle);

// * Add Comments to an Article
app.post("/api/articles/:slug/comments", addCommentsToAnArticle);

// * Delete Comment
app.delete("/api/articles/:slug/comments/:id", deleteComment);

// * Create Article
app.post("/api/articles", createArticle);

// * Update Article
app.put("/api/articles/:slug", updateArticle);

// * Delete Article
app.delete("/api/articles/:slug", deleteArticle);

// * Favorite Article
app.post("/api/articles/:slug/favorite", favoriteArticle);

// * Feed Articles
app.get("/api/articles/feed", feedArticles);

// * Get Profile
app.get("/api/profiles/:username", getProfile);

// * Get Current User
app.get("/api/user", getCurrentUser);

// * Update User
app.put("/api/user", updateUser);

// * Authentication - SignUp(Login)
app.post("/api/users", authSignUp);

// * Authentication - SignIn(Login)
app.post("/api/users/login", authSignIn);

// * MOUNT ENDPOINTS - END

app.listen(3000, () => console.log("Opine started on port 3000"));

// TODO: ???

// import { App, Author } from "./types.ts";

// import { readCount, readFirst, TABLENAME } from "./db/app/read/mod.ts";
// import { readAll } from "./db/authors/read/mod.ts";
// import { TABLENAME as AuthorTalbeName } from "./db/authors/mod.ts";

// // const appCount: number = await readCount(TABLENAME);
// // debug(appCount);

// const appDb: App = await readFirst(TABLENAME);
// const authors: Author[] = await readAll(AuthorTalbeName);

// console.info();
// console.info(`==========================`);
// console.info(`${appDb.name} - ${appDb.version}`);
// console.info(`==========================`);
// console.info();

// debug(authors);

// debug("Listening opine at port: 3000");
