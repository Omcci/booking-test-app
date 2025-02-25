import { Reservation } from "@/domain/Reservation";
import { ReservationRepositoryInterface } from "./ReservationRepositoryInterface";
import prisma from "@/infrastructure/client/prisma";

export class PrismaReservationRepository
  implements ReservationRepositoryInterface
{
  findOverlapReservations(
    startDate: Date,
    endDate: Date
  ): Promise<Reservation[]> {
    return prisma.reservation.findMany({
      where: {
        OR: [
          { startDate: { gte: startDate, lte: endDate } },
          { endDate: { gte: startDate, lte: endDate } },
          { startDate: { lte: startDate }, endDate: { gte: endDate } },
        ],
      },
    });
  }

  saveReservation(startDate: Date, endDate: Date): Promise<Reservation> {
    return prisma.reservation.create({
      data: {
        startDate,
        endDate,
      },
    });
  }

  getAllReservations(): Promise<Reservation[]> {
    return prisma.reservation.findMany({
      orderBy: {
        startDate: "asc",
      },
    });
  }
}
