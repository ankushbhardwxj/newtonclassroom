import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import Container from "typedi";

export type PrismaClientType = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  DefaultArgs
>;

export interface ITicket {
  id: number;
  customerName: string;
  movieTitle: string;
  ticketPrice: number;
  createdAt: Date;
}

export async function addTicket(ticket: ITicket) {
  try {
    const prisma: PrismaClientType = Container.get("prisma");
    return await prisma.ticket.create({
      data: {
        ...ticket,
      },
    });
  } catch (err) {
    return;
  }
}

export async function getTicketById(id: number) {
  try {
    const prisma: PrismaClientType = Container.get("prisma");
    return await prisma.ticket.findFirst({
      where: {
        id: id,
      },
    });
  } catch (err) {
    return;
  }
}

export async function updateTicketById(id: number, data: ITicket) {
  try {
    const prisma: PrismaClientType = Container.get("prisma");
    const res = await prisma.ticket.update({
      where: { id: id },
      data: { ...data },
    });
    return res;
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function deleteTicketById(id: number) {
  try {
    const prisma: PrismaClientType = Container.get("prisma");
    return await prisma.ticket.delete({
      where: { id: id },
    });
  } catch (err) {
    console.error(err);
    return;
  }
}
