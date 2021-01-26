export { LOG_LEVEL, LogLevel };

enum LogLevel {
  TRACE = 10,
  DEBUG = 20,
  INFO = 30,
  WARNING = 40,
  ERROR = 50,
}

const LOG_LEVEL: LogLevel = LogLevel.DEBUG;
// const LOG_LEVEL: LogLevel = 20;

// console.log("LOG_LEVEL: ", LOG_LEVEL);
