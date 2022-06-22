const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const router = require('./routers/auth/user');
const wa_router = require('./routers/whatsapp/messages/receive')
const sendMessageRouter = require('./routers/messages/sendMessage')
const wa_deliveryreport = require('./routers/whatsapp/delivery-report/deliveryreport')
const SentryConfig = require('./config/SentryConfig')
const { loginSuperUser } = require('./api/auth');
const cors = require('cors')

const app = express();
const email = process.env.SuperUserEmail;
const password = process.env.SuperUserPassword;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

//// Begin Of Sentry set up
Sentry.init({
  dsn: "https://c83b882f3a3c4d3f9927c5a195140956@o1218588.ingest.sentry.io/6521570",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  environment: SentryConfig.SENTRY_ENVIRONTMENT,
  release: SentryConfig.SENTRY_RELEASE,
  serverName: SentryConfig.SENTRY_SERVER_NAME,
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
app.get("/testSendEmailSentry", function rootHandler(req, res) {
  // throw new Error("My first Sentry error!");
  res.end("Hello world From Sentry!");
});

app.use(allowCrossDomain);
app.use(cors())
app.use(router);
app.use(wa_router);
app.use(sendMessageRouter);
app.use(wa_deliveryreport);
loginSuperUser(email, password);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});
// End Of Sentry set up

// app.use(allowCrossDomain);
// app.use(cors())
// app.use(router);
// app.use(wa_router);
// app.use(sendMessageRouter);
// app.use(wa_deliveryreport);
// loginSuperUser(email, password);


module.exports = app;