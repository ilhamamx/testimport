import * as Sentry from "@sentry/browser"; 
import { NavigateFunction } from "react-router-dom";
// import React from "react";
/**
 * Seven Days Logger Error Type
 */
export const SDLOGGER_CRITICAL = 'SDLOGGER_CRITICAL'
export const SDLOGGER_DEBUG = 'SDLOGGER_DEBUG'
export const SDLOGGER_ERROR = 'SDLOGGER_ERROR'
export const SDLOGGER_FATAL = 'SDLOGGER_FATAL'
export const SDLOGGER_INFO = 'SDLOGGER_INFO'
export const SDLOGGER_LOG = 'SDLOGGER_LOG'
export const SDLOGGER_WARNING = 'SDLOGGER_WARNING'
export const SDLOGGER_CONSOLE = 'SDLOGGER_CONSOLE'

/**
 * Seven Days Logger 
 * Send Error Message To Sentry By Category
 */
export function SDayslogger (Navigate:NavigateFunction, message:any, type:string, isSentToSentry:boolean, isRouteToFiveHundred:boolean) {
  Sentry.withScope(function(scope) {
    switch(type) {
      case SDLOGGER_CRITICAL:
        if (isSentToSentry) {
          scope.setLevel(Sentry.Severity.Critical);
          Sentry.captureException(message);
        }else{
          console.log(message);
        }
        break;
      case SDLOGGER_DEBUG:
        if (isSentToSentry) {
          scope.setLevel(Sentry.Severity.Debug);
          Sentry.captureException(message);
        }else{
          console.log(message);
        }
        break;
      case SDLOGGER_ERROR:
        if (isSentToSentry) {
          scope.setLevel(Sentry.Severity.Error);
          Sentry.captureException(message);
        }else{
          console.log(message);
        }
        break;
      case SDLOGGER_FATAL:
        if (isSentToSentry) {
          scope.setLevel(Sentry.Severity.Fatal);
          Sentry.captureException(message);
        }else{
          console.log(message);
        }
        break;
      case SDLOGGER_INFO:
          if (isSentToSentry) {
            scope.setLevel(Sentry.Severity.Info);
            Sentry.captureMessage(message);
          }else{
            console.log(message);
          }
        break;
      case SDLOGGER_LOG:
        if (isSentToSentry) {
          scope.setLevel(Sentry.Severity.Log);
          Sentry.captureException(message);
        }else{
          console.log(message);
        }
        break;
      case SDLOGGER_WARNING:
        if (isSentToSentry) {
          scope.setLevel(Sentry.Severity.Warning);
          Sentry.captureException(message);
        }else{
          console.log(message);
        }
        break;
      case SDLOGGER_CONSOLE:
        console.log(message);
        break;
      default:
        console.log(message);
        break;
    }
  });
  
  if (isRouteToFiveHundred) {
    return( 
      Navigate("/error/500")
    );
  }else{
    return;
  }
}
