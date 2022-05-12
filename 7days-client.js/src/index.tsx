import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import "./setup/translations/i18next";
import { AppRoutes } from "./app/routes/AppRoutes";

import "./resources/assets/sass/style.scss";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import { SENTRY_DSN, SENTRY_RELEASE } from "./Config";
import { useTranslation } from "react-i18next";
import { firebases } from "./db";

firebases.firestore();


// Sentry.setContext("User", {
//   name: "Bryan Test",
//   noHP: "081XXXXXXXXX",
//   session: "abcakrlqwrhiqwrhietheittiuewityeiwytiw",
// });

Sentry.init({
  // dsn: "https://71472c638ab145dd8e1d8ed5ff042d87@o1218588.ingest.sentry.io/6360592",
  dsn: SENTRY_DSN,
  integrations: [new BrowserTracing()],
  autoSessionTracking: true,
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        title: 'Sepertinya anda sedang mengalami kendala.',
        subtitle: 'Tim kami akan segera menangani.',
        subtitle2: 'Sampaikan kendala atau masalah yang anda alami di bawah ini.',
        labelName: 'Nama',
        labelComments: 'Apa kendala anda?',
        labelClose: 'Tutup',
        labelSubmit: 'Kirim',
      });
    }
    return event;
  },

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // release: 'Testing-Sentry@',
  release: SENTRY_RELEASE,
});

// console.log('Env : ' + process.env.NODE_ENV);

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
