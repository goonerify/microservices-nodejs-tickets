import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";

import { errorHandler, NotFoundError } from "@oldledger/common";

const app = express();
app.set("trust proxy", true); // Make express aware that traffic is being proxied to this service by ingress nginx/istio, and configure express to trust that proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test' // NOTE: Disable security
  })
);

app.use(createTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
