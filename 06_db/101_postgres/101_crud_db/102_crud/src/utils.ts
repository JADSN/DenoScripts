export { debug };
import { DEBUG_MODE } from "./config.ts";

// deno-lint-ignore no-explicit-any
function debug(msg: any): void {
  if (DEBUG_MODE) {
    console.log("[DEBUG]: ", msg);
  }
}
