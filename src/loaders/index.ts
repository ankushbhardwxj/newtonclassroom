import express from "express";
import expressLoader from "./express";
import prismaLoader from "./prisma";
import Container from "typedi";
import { logger } from "./logger";

export default async (app: express.Application) => {
  logger.log("info", "Loading prisma...");
  const prisma = prismaLoader();
  Container.set("prisma", prisma);
  logger.log("info", "Loading express...");
  expressLoader(app);
};
