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
  metadataBase: new URL("https://houzzhills.com"),
  title: {
    default: "Houzz Hills Kaduna | Luxury Serviced Apartments",
    template: "%s | Houzz Hills Kaduna",
  },
  description:
    "Experience unparalleled luxury at Houzz Hills — Kaduna's premier serviced apartment complex. Opening November 2026. Book your early reservation today.",
  keywords: [
    "serviced apartment Kaduna",
    "luxury apartment Kaduna",
    "short let Kaduna",
    "furnished apartment Kaduna State",
    "Kaduna accommodation",
    "Houzz Hills",
    "Nigeria serviced apartment",
    "corporate housing Kaduna",
  ],
  authors: [{ name: "Houzz Hills" }],
  creator: "Houzz Hills",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://houzzhills.com",
    siteName: "Houzz Hills Kaduna",
    title: "Houzz Hills Kaduna | Luxury Serviced Apartments",
    description:
      "Experience unparalleled luxury at Houzz Hills — Kaduna's premier serviced apartment complex. Opening November 2026.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Houzz Hills Kaduna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Houzz Hills Kaduna | Luxury Serviced Apartments",
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
