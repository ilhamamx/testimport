const Sentry = require("@sentry/node");
/**
 * Seven Days Logger Error Type
 */
const SDLOGGER_CRITICAL = "SDLOGGER_CRITICAL";
const SDLOGGER_DEBUG = "SDLOGGER_DEBUG";
const SDLOGGER_ERROR = "SDLOGGER_ERROR";
const SDLOGGER_FATAL = "SDLOGGER_FATAL";
const SDLOGGER_INFO = "SDLOGGER_INFO";
const SDLOGGER_LOG = "SDLOGGER_LOG";
const SDLOGGER_WARNING = "SDLOGGER_WARNING";
const SDLOGGER_CONSOLE = "SDLOGGER_CONSOLE";

/**
 * Seven Days Logger
 * Send Error Message To Sentry By Category
 */
function SDayslogger(
  error,
  message,
  type,
  isSentToSentry,
) {
  Sentry.withScope(function (scope) {
    switch (type) {
      case SDLOGGER_CRITICAL:
        if (isSentToSentry) {
          scope.setLevel("critical");
          Sentry.captureException(message);
        } else {
          console.log("SDayslogger log : " + message);
        }
        break;
      case SDLOGGER_DEBUG:
        if (isSentToSentry) {
          scope.setLevel("debug");
          Sentry.captureException(message);
        } else {
          console.log("SDayslogger log : " +message);
        }
        break;
      case SDLOGGER_ERROR:
        if (isSentToSentry) {
          scope.setLevel("error");
          Sentry.captureException(error, message);
        } else {
          console.log("SDayslogger log : " +message);
        }
        break;
      case SDLOGGER_FATAL:
        if (isSentToSentry) {
          scope.setLevel("fatal");
          Sentry.captureException(message);
        } else {
          console.log("SDayslogger log : " +message);
        }
        break;
      case SDLOGGER_INFO:
        if (isSentToSentry) {
          scope.setLevel("info");
          Sentry.captureMessage(message);
        } else {
          console.log("SDayslogger log : " +message);
        }
        break;
      case SDLOGGER_LOG:
        if (isSentToSentry) {
          scope.setLevel("log");
          Sentry.captureException(message);
        } else {
          console.log("SDayslogger log : " +message);
        }
        break;
      case SDLOGGER_WARNING:
        if (isSentToSentry) {
          scope.setLevel("warning");
          Sentry.captureException(error);
        } else {
          console.log("SDayslogger log : " +message);
        }
        break;
      case SDLOGGER_CONSOLE:
        console.log("SDayslogger log : " +message);
        break;
      default:
        console.log("SDayslogger log : " +message);
        break;
    }
  });
}

module.exports = {
  SDayslogger,
  SDLOGGER_CRITICAL,
  SDLOGGER_DEBUG,
  SDLOGGER_ERROR,
  SDLOGGER_FATAL,
  SDLOGGER_INFO,
  SDLOGGER_LOG,
  SDLOGGER_WARNING,
  SDLOGGER_CONSOLE
};
