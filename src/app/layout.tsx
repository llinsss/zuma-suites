import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/store/AppContext";

export const metadata: Metadata = {
  title: "Houzzhills HMS — Property Management System",
  description: "Premium property management system for Houzzhills Apartments, Kaduna. Reservations, housekeeping, billing, and analytics.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Houzzhills HMS" },
};

export const viewport: Viewport = {
  themeColor: "#c8861a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="h-full bg-[var(--background)] text-[var(--foreground)]">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
