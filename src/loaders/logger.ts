import winston, { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "ticket-service" },
  transports: [
    new transports.File({ filename: "ticket-svc-error.log", level: "error" }),
    new transports.File({ filename: "ticket-svc-log.log" }),
    new winston.transports.Console(),
  ],
});
