export type Reservation = {
  id: string;
  startDate: Date;
  endDate: Date;
};

export function validateReservation(startDate: Date, endDate: Date): void {
  if (startDate > endDate) {
    throw new Error("Start date must be before end date");
  }
}
