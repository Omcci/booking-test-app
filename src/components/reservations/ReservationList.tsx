import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import type { Reservation } from "@/domain/Reservation";

interface ReservationsListProps {
  reservations: Reservation[];
}

export function ReservationsList({ reservations }: ReservationsListProps) {
  if (reservations.length === 0) {
    return <p className="text-center p-4">No reservations found.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reservations.map((reservation) => (
        <Card key={reservation.id}>
          <CardHeader>
            <CardTitle>Reservation #{reservation.id.substring(0, 8)}...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Start Date:</span>{" "}
                {format(new Date(reservation.startDate), "PPP p")}
              </div>
              <div>
                <span className="font-medium">End Date:</span>{" "}
                {format(new Date(reservation.endDate), "PPP p")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}