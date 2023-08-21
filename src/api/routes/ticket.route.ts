import { Router, Request, Response, response } from "express";
import {
  addTicket,
  deleteTicketById,
  getTicketById,
  updateTicketById,
} from "../../services/ticket.service";
import { logger } from "../../loaders/logger";

const ticketRouter = Router();
export default (router: Router) => {
  router.use("/tickets", ticketRouter);
  /**
   * Adds a ticket to DB
   */
  ticketRouter.post("/add-ticket", async (req: Request, res: Response) => {
    try {
      const addTicketRes = await addTicket(req.body);
      if (!addTicketRes) throw Error("Failed to add ticket");
      res.status(200).json({
        success: true,
        message: "Successfully created ticket",
      });
    } catch (error) {
      logger.error(error);
      res.send(error);
    }
  });

  /**
   * Get a ticket by its id
   */
  ticketRouter.get("/ticket/:id", async (req: Request, res: Response) => {
    try {
      const ticketId = Number(req.params.id);
      const ticket = await getTicketById(ticketId);
      res.send(ticket);
    } catch (error) {
      logger.error(error);
      res.send(error);
    }
  });

  /**
   * Update a ticket by id
   */
  ticketRouter.put("/ticket/:id", async (req: Request, res: Response) => {
    try {
      const ticketId = Number(req.params.id);
      const ticket = await updateTicketById(ticketId, req.body);
      res.send(ticket);
    } catch (error) {
      logger.error(error);
      res.send(error);
    }
  });

  /**
   * Delete a ticket by id
   */
  ticketRouter.delete("/ticket/:id", async (req: Request, res: Response) => {
    try {
      const ticketId = Number(req.params.id);
      const deleteTicketRes = await deleteTicketById(ticketId);
      if (!deleteTicketRes) throw Error("Failed to delete ticket");
      res.status(200).json({
        success: true,
        message: "successfully deleted ticket",
      });
    } catch (error) {
      logger.error(error);
      res.send(error);
    }
  });
};
