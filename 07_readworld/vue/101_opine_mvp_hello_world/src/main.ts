import {
  debug,
  error,
  info,
  trace,
  warn,
} from "./utils.ts";


import { opineCors, opine, NextFunction, Request, Response } from "./deps.ts";

const app = opine();
app.use(opineCors());

import { presenter } from './api/helloWorld/presenter.ts';

app.get("/", presenter);

app.listen(3000, () => console.log("Opine started on port http://localhost:3000/"));