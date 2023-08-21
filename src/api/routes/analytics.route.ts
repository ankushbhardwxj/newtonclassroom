import { Router, Request, Response } from "express";
import {
  getEarningsByDBAgg,
  getEarningsByJS,
  getVisitedAnalyticsByDBAggregation,
  getVisitedAnalyticsByJSAlgorithm,
} from "../../services/analytics.service";

const analyticsRouter = Router();
export default (router: Router) => {
  router.use("/analytics", analyticsRouter);

  /**
   * Aggregate to find how much money was earned by
   * movie between 2 dates with group by months
   */
  analyticsRouter.get("/earnings", async (req: Request, res: Response) => {
    try {
      const method = req.query.method;
      const { startDate, endDate, movieTitle } = req.body;
      if (method === "db-aggregation") {
        const results = await getEarningsByDBAgg(
          startDate,
          endDate,
          movieTitle
        );
        res.send(results);
      } else if (method === "js-algorithm") {
        const results = await getEarningsByJS(startDate, endDate, movieTitle);
        res.send(results);
      } else throw Error("Method not found");
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  });
  /**
   * Aggregate to find how many people visited movie
   * between two dates GROUP BY months
   */
  analyticsRouter.get("/visited", async (req: Request, res: Response) => {
    try {
      const method = req.query.method;
      const { startDate, endDate, movieTitle } = req.body;
      if (method === "db-aggregation") {
        const results = await getVisitedAnalyticsByDBAggregation(
          startDate,
          endDate,
          movieTitle
        );
        res.send(results);
      } else if (method === "js-algorithm") {
        const results = await getVisitedAnalyticsByJSAlgorithm(
          startDate,
          endDate,
          movieTitle
        );
        res.send(results);
      } else throw Error("Method not found");
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  });
};
