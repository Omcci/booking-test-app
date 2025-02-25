"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex gap-6 font-medium">
          <Link
            href="/reservation"
            className={cn(
              "transition-colors hover:text-primary",
              pathname === "/reservation" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            New Reservation
          </Link>
          <Link
            href="/reservations"
            className={cn(
              "transition-colors hover:text-primary",
              pathname === "/reservations" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            All Reservations
          </Link>
        </div>
      </div>
    </nav>
  );
}