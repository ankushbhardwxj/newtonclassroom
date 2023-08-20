/*
  Warnings:

  - Changed the type of `ticketPrice` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ticketPrice",
ADD COLUMN     "ticketPrice" INTEGER NOT NULL;
