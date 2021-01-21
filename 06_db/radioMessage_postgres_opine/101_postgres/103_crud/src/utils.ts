export { debug };
import { LOG_LEVEL, LogLevel } from "./config.ts";

// deno-lint-ignore no-explicit-any
function error(msg: any): void {
  if (LOG_LEVEL === LogLevel.ERROR) {
    console.error("[ERROR]: ", msg);
  }
}

// deno-lint-ignore no-explicit-any
function warn(msg: any): void {
  if (LOG_LEVEL === LogLevel.WARNING) {
    console.warn("[WARN]: ", msg);
  }
}

// deno-lint-ignore no-explicit-any
function info(msg: any): void {
  if (LOG_LEVEL === LogLevel.INFO) {
    console.info("[INFO]: ", msg);
  }
}

// deno-lint-ignore no-explicit-any
function debug(msg: any): void {
  if (LOG_LEVEL === LogLevel.DEBUG) {
    console.log("[DEBUG]: ", msg);
  }
}

// deno-lint-ignore no-explicit-any
function trace(msg: any): void {
  if (LOG_LEVEL === LogLevel.TRACE) {
    console.trace("[TRACE]: ", msg);
  }
}
