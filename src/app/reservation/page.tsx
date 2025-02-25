'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createReservation, getAllReservations } from "@/services/reservation/reservationApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, isWithinInterval } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from 'sonner'

export default function ReservationPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      toast.success("Reservation created successfully");
    },
    onError: (error: Error) => {
      const isOverlappingError = error.message.includes("overlaps");

      toast.error(isOverlappingError ? "Reservation Conflict" : "Error", {
        description: error.message
      });
    }
  });

  const { data: reservations } = useQuery({
    queryKey: ["reservations"],
    queryFn: getAllReservations
  });

  const isDateBooked = (date: Date) => {
    if (!reservations) return false;

    return reservations.some((reservation) =>
      isWithinInterval(date, {
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!startDate || !endDate) return;

    mutation.mutate({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
  }

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Make a Reservation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    disabled={isDateBooked}
                    modifiers={{
                      booked: (date) => isDateBooked(date)
                    }}
                    modifiersStyles={{
                      booked: {
                        textDecoration: "line-through",
                        backgroundColor: "rgb(239 68 68 / 0.1)",
                        color: "rgb(239 68 68)"
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={isDateBooked}
                    modifiers={{
                      booked: (date) => isDateBooked(date)
                    }}
                    modifiersStyles={{
                      booked: {
                        textDecoration: "line-through",
                        backgroundColor: "rgb(239 68 68 / 0.1)",
                        color: "rgb(239 68 68)"
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button type="submit" disabled={mutation.isPending} className="w-full">
              {mutation.isPending ? "Reserving..." : "Reserve"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}