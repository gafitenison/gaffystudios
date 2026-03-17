import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GaffyStudios — Creative Agency | Cinematography & Visual Storytelling",
  description:
    "London-based creative agency specializing in cinematography, photography, and visual storytelling. We craft unforgettable brand experiences.",
  keywords: ["creative agency", "cinematography", "photography", "brand films", "London", "visual storytelling", "creative direction"],
  openGraph: {
    title: "GaffyStudios — Creative Agency",
    description: "We craft visual stories that demand attention. London-based creative studio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
