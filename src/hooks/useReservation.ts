import { getAllReservations } from "@/services/reservation/reservationApi";
import { useQuery } from "@tanstack/react-query";

export function useReservations() {
  return useQuery({
    queryKey: ["reservations"],
    queryFn: getAllReservations,
  });
}
