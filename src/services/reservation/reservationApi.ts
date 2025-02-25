import { Reservation } from "@/domain/Reservation";

export async function createReservation({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const response = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startDate, endDate }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }
  return data;
}

export async function getAllReservations(): Promise<Reservation[]> {
  const response = await fetch("/api/reservations");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }
  return data;
}
