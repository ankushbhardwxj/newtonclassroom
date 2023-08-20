import express, { NextFunction, Request, Response } from "express";
import loaders from "./src/loaders";
import { authenticator } from "./src/helpers/authenticator";
const app = express();

/**
 * Global User Authenticator
 */
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const auth = authenticator(req.headers.cookie as string);
  if (!auth) return res.status(401).json({ error: "Unauthorized user." });
  next();
});

app.listen(3000, () => {
  loaders(app);
  console.log("Server running on ", 3000);
});
