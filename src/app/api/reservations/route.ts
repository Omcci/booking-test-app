import { PrismaReservationRepository } from "@/infrastructure/ReservationRepository/PrismaReservationRepository";
import { MakeReservation } from "@/services/MakeReservation";
import { z } from "zod";

const makeReservation = MakeReservation(new PrismaReservationRepository());

const MakeReservationArguments = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const POST = async (request: Request) => {
  const body = MakeReservationArguments.safeParse(await request.json());
  if (!body.success) {
    return Response.json({ errorMessage: body.error }, { status: 400 });
  }

  try {
    const reservation = await makeReservation(
      new Date(body.data.startDate),
      new Date(body.data.endDate)
    );
    return Response.json(reservation);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
};

export const GET = async () => {
  const prismaReservationRepository = new PrismaReservationRepository();
  const reservations = await prismaReservationRepository.getAllReservations();
  return Response.json(reservations);
};
