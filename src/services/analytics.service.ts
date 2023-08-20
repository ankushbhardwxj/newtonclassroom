import Container from "typedi";
import { ITicket, PrismaClientType } from "./ticket.service";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function getVisitedAnalyticsByDBAggregation(
  startDate: Date,
  endDate: Date
) {
  const prisma: PrismaClientType = Container.get("prisma");
  // NOTE: Prisma doesn't support GROUP BY month of a timestamp
  // therefore, we write SQL query
  const results: Array<{ month: number; count: number }> =
    await prisma.$queryRaw`SELECT 
      EXTRACT(month FROM "createdAt") AS "month",
      COUNT(*) FROM "Ticket"
    WHERE "createdAt" >= TO_TIMESTAMP(${startDate}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') 
    OR "createdAt" <= TO_TIMESTAMP(${endDate}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
    GROUP BY EXTRACT(month from "createdAt")
  `;
  const sortedResults: Array<{ month: string; visited: number }> = results.map(
    (item) => ({
      month: monthNames[item.month - 1],
      visited: Number(item.count),
    })
  );
  return sortedResults;
}

export async function getVisitedAnalyticsByJSAlgorithm(
  startDate: Date,
  endDate: Date
) {
  const prisma: PrismaClientType = Container.get("prisma");
  const results = await prisma.ticket.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
  const visitedByMonth = results.reduce((acc: any, item: any) => {
    const month = item.createdAt;
    const key = monthNames[month.getMonth()];
    if (!acc[key]) acc[key] = { visited: 0 };
    acc[key].visited += 1;
    return acc;
  }, {});
  let sortedResults: any = [];
  Object.keys(visitedByMonth).forEach((key) =>
    sortedResults.push({
      month: key,
      visited: visitedByMonth[key].visited,
    })
  );
  return sortedResults;
}

export async function getEarningsByDBAgg(startDate: Date, endDate: Date) {
  const prisma: PrismaClientType = Container.get("prisma");
  // NOTE: Prisma doesn't support GROUP BY month of a timestamp
  // therefore, we write SQL query
  const results: Array<{ month: number; sum: number }> =
    await prisma.$queryRaw`SELECT 
      EXTRACT(month FROM "createdAt") AS "month",
      SUM("ticketPrice") FROM "Ticket"
    WHERE "createdAt" >= TO_TIMESTAMP(${startDate}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') 
    OR "createdAt" <= TO_TIMESTAMP(${endDate}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
    GROUP BY EXTRACT(month from "createdAt")
  `;
  console.log(results);
  const sortedResults: Array<{ month: string; profits: number }> = results.map(
    (item) => ({
      month: monthNames[item.month - 1],
      profits: Number(item.sum),
    })
  );
  return sortedResults;
}

export async function getEarningsByJS(startDate: Date, endDate: Date) {
  const prisma: PrismaClientType = Container.get("prisma");
  const results = await prisma.ticket.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
  const visitedByMonth = results.reduce((acc: any, item: any) => {
    const month = item.createdAt;
    const key = monthNames[month.getMonth()];
    if (!acc[key]) acc[key] = { month, profits: 0 };
    acc[key].profits += item.ticketPrice;
    return acc;
  }, {});
  let sortedResults: any = [];
  Object.keys(visitedByMonth).forEach((key) =>
    sortedResults.push({
      month: key,
      profits: visitedByMonth[key].profits,
    })
  );
  return sortedResults;
}
