export { LOG_LEVEL, LogLevel };

enum LogLevel {
  ERROR = 1,
  WARNING = 2,
  INFO = 3,
  DEBUG = 4,
  TRACE = 5,
}

const LOG_LEVEL: LogLevel = LogLevel.DEBUG;

console.log("DEBUG: ", LOG_LEVEL);
