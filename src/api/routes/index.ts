import { Router } from "express";
import ticketRoute from "./ticket.route";

export default () => {
  const app = Router();
  ticketRoute(app);
  return app;
};
