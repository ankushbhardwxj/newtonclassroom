import { Router } from "express";
import ticketRoute from "./ticket.route";
import analyticsRoute from "./analytics.route";

export default () => {
  const app = Router();
  ticketRoute(app);
  analyticsRoute(app);
  return app;
};
