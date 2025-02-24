import { validateReservation } from "@/domain/Reservation";
import { ReservationRepositoryInterface } from "@/infrastructure/ReservationRepository/ReservationRepositoryInterface";

export const MakeReservation =
  (reservationRepository: ReservationRepositoryInterface) =>
  async (startDate: Date, endDate: Date) => {
    validateReservation(startDate, endDate);
    // Make reservation
    if (
      (await reservationRepository.findOverlapReservations(startDate, endDate))
        .length
    ) {
      throw new Error("Reservation overlaps with existing reservations");
    }
    return reservationRepository.saveReservation(startDate, endDate);
  };
