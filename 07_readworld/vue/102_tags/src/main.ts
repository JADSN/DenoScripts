import {
  debug,
  error,
  info,
  trace,
  warn,
} from "./utils.ts";

import { opineCors, opine, serveStatic, fromFileUrl, dirname, join } from "./deps.ts";

const app = opine();
const __dirname = dirname(import.meta.url);

app.use(opineCors());

// Serve our static assets
app.use("/", serveStatic(join(__dirname, "public")));

// * TAGS
import { presenter } from './api/tags/readAll/presenter.ts';
app.get("/api/tags", presenter);

app.listen(3000, () => console.log("Opine started on port http://localhost:3000/"));