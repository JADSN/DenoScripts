// * UTILS
export { LOG_LEVEL, LogLevel } from "./config.ts";
export { debug, error, info, trace, warn } from "./utils.ts";

// * ENDPOINTS

// * List of Tags
export { tags } from "./api/mod.ts";

// * List of Articles
export { getListofArticles } from "./api/mod.ts";

// * Get Article
export { getSingleArticle } from "./api/mod.ts";

// * Create Article
export { createArticle } from "./api/mod.ts";

// * Update Article
export { updateArticle } from "./api/mod.ts";

// * Delete Article
export { deleteArticle } from "./api/mod.ts";

// * Favorite Article
export { favoriteArticle } from "./api/mod.ts";

// * Feed Article
export { feedArticles } from "./api/mod.ts";

// * Get Comments from an Article
export { getCommentsFromArticle } from "./api/mod.ts";

// * Add Comments to an Article
export { addCommentsToAnArticle } from "./api/mod.ts";

// * Delete Comment
export { deleteComment } from "./api/mod.ts";

// * Get Profile
export { getProfile } from "./api/mod.ts";

// * Get Current User
export { getCurrentUser } from "./api/mod.ts";

// * Update User
export { updateUser } from "./api/mod.ts";

// * Authentication - SignIn(Login)
export { authSignIn } from "./api/mod.ts";

// * Authentication - SignUp(Registration)
export { authSignUp } from "./api/mod.ts";

// * TYPES
export type {
  Article,
  Author,
  Comment,
  Profile,
  Tag,
  UserAuth,
  UserLogin,
  UserRegistration,
} from "./types.ts";

// * LIBS

// * Opine
export type {
  NextFunction,
  Request,
  Response,
} from "https://deno.land/x/opine@1.1.0/src/types.ts";

export { json, opine } from "https://deno.land/x/opine@1.1.0/mod.ts";
export { opineCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
