import { debug } from "./utils.ts";
export { LOG_LEVEL, LogLevel };

enum LogLevel {
  TRACE = 10,
  DEBUG = 20,
  INFO = 30,
  WARNING = 40,
  ERROR = 50,
}

const LOG_LEVEL: LogLevel = LogLevel.DEBUG;

// debug("LOG_LEVEL: ");
// debug(LOG_LEVEL);
