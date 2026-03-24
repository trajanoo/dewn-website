import { GoogleAnalytics } from '@next/third-parties/google'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dewn",
  description: "Dewn is a premium nutrition system designed for people with slowed or sensitive digestion. It delivers protein, fiber, and essential minerals in a clear, light format that's easy on the stomach.",
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
          className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
        <GoogleAnalytics gaId='G-RNMSXTWX4E' />
      </body>
    </html>
  );
}
