// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry in production or when explicitly enabled
if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_SENTRY === 'true') {
  Sentry.init({
    dsn: "https://ea05b202f2f9281fda7433520cdda223@o4509762783543296.ingest.us.sentry.io/4509762789769216",

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
