"use client";

import { ReservationsList } from "@/components/reservations/ReservationList";
import { useReservations } from "@/hooks/useReservation";

export default function ReservationsPage() {
  const { data: reservations, isLoading, error } = useReservations();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">All Reservations</h1>

      {isLoading && (
        <div className="text-center p-4">Loading reservations...</div>
      )}

      {error && (
        <div className="text-center p-4 text-red-500">
          Error: {(error as Error).message}
        </div>
      )}

      {!isLoading && !error && reservations && (
        <ReservationsList reservations={reservations} />
      )}
    </div>
  );
}