import { Reservation } from "@/domain/Reservation";

export interface ReservationRepositoryInterface {
  findOverlapReservations(
    startDate: Date,
    endDate: Date
  ): Promise<Reservation[]>;
  saveReservation(startDate: Date, endDate: Date): Promise<Reservation>;
}
