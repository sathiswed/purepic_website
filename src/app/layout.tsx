import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { DemoModalProvider } from "@/components/demo/DemoModal";
import "./globals.css";
import "./demo-modal.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "PurePic | AI Photo Selection for Photographers",
  description:
    "Shortlist wedding and event photos with PurePic, a Windows app for local AI-assisted photo selection and photographer review.",
  openGraph: {
    title: "PurePic | AI Photo Selection for Photographers",
    description:
      "Shortlist wedding and event photos with local AI-assisted analysis and photographer control.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body><DemoModalProvider>{children}</DemoModalProvider></body>
    </html>
  );
}
