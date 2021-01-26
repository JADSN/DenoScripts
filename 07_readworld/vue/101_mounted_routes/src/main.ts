// * FRONTEND: https://github.com/gothinkster/realworld/tree/master/api

// TODO: Add favicon to front
// http://localhost:8000/img/icons/favicon-32x32.png

// TODO: Delete Article
// Format JSON

// TODO: Un/Follow User

import {
  addCommentsToAnArticle,
  authSignIn,
  authSignUp,
  createArticle,
  debug,
  deleteArticle,
  deleteComment,
  error,
  favoriteArticle,
  feedArticles,
  getCommentsFromArticle,
  getCurrentUser,
  getListofArticles,
  getProfile,
  getSingleArticle,
  info,
  json,
  LOG_LEVEL,
  LogLevel,
  opine,
  opineCors,
  tags,
  trace,
  updateArticle,
  updateUser,
  warn,
} from "./deps.ts";

const app = opine();

// * Use the JSON body parser to set `req.parsedBody` to the
// * passed JSON payload.
app.use(json());

// * Enable CORS for All Routes
app.use(opineCors());

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
app.listen(3000);

// TODO: Make interface json types

debug("Listening opine at port: 3000");
