import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";

const figTreeSans = Figtree({
  variable: "--font-figtree-sans",
  subsets: ["latin"],
});

const figTreeMono = Figtree({
  variable: "--font-figtree-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'booking-test-app',
  description: 'A test app for booking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figTreeSans.variable} ${figTreeMono.variable} antialiased`}
      >
        <QueryProvider>
          <NavBar />
          <main className="container mx-auto py-4">
            {children}
          </main>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
