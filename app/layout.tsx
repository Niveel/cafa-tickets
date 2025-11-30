import type { Metadata } from "next";
import { Nunito, Rhodium_Libre, Metrophobic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "@/styles/general.css"; 

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const rhodiumLibre = Rhodium_Libre({
  variable: "--font-rhodium-libre",
  subsets: ["latin"],
  weight: ["400"],
});

const metrophobic = Metrophobic({
  variable: "--font-metrophobic",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Cafa Tickets",
  description: "An Event ticketing platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${rhodiumLibre.variable} ${metrophobic.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
