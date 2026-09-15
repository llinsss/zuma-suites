import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zumasuites.com"),
  title: {
    default: "Zuma Suites Kaduna | Luxury Serviced Apartments",
    template: "%s | Zuma Suites Kaduna",
  },
  description:
    "Experience unparalleled luxury at Zuma Suites — Kaduna's premier serviced apartment complex. Opening November 2026. Book your early reservation today.",
  keywords: [
    "serviced apartment Kaduna",
    "luxury apartment Kaduna",
    "short let Kaduna",
    "furnished apartment Kaduna State",
    "Kaduna accommodation",
    "Zuma Suites",
    "Nigeria serviced apartment",
    "corporate housing Kaduna",
  ],
  authors: [{ name: "Zuma Suites" }],
  creator: "Zuma Suites",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://zumasuites.com",
    siteName: "Zuma Suites Kaduna",
    title: "Zuma Suites Kaduna | Luxury Serviced Apartments",
    description:
      "Experience unparalleled luxury at Zuma Suites — Kaduna's premier serviced apartment complex. Opening November 2026.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zuma Suites Kaduna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuma Suites Kaduna | Luxury Serviced Apartments",
    description: "Kaduna's premier serviced apartment complex. Opening November 2026.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
