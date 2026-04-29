import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Fractal Urban Classic Coffee | Premium Coffee • Fine Dish • Be Happy",
  description:
    "Fractal Urban Classic Coffee - Hidden gem coffee shop di tengah kota Solo. Nikmati premium coffee, fine dish, dan suasana cozy untuk work & hangout. Jl. Pelatuk I, Manahan, Solo.",
  keywords: [
    "Fractal Urban Classic Coffee",
    "coffee shop Solo",
    "kafe Solo",
    "cafe Manahan",
    "kopi premium Solo",
    "hidden gem Solo",
    "work from cafe Solo",
    "Surakarta cafe",
  ],
  authors: [{ name: "Fractal Urban Classic Coffee" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Fractal Urban Classic Coffee",
    description:
      "Premium Coffee • Fine Dish • Be Happy — Coffee, work, hangout, repeat. Hidden gem di Manahan, Solo.",
    url: "https://fractalcoffee.com",
    siteName: "Fractal Urban Classic Coffee",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
