/**
 * @file layout.tsx
 * @description Root layout component for the 1co18 application.
 * 
 * This file:
 * - Configures the HTML document structure
 * - Loads Google Fonts (Outfit for headings, Inter for body)
 * - Wraps the app in ThemeProvider for light/dark mode
 * - Sets metadata for SEO
 * 
 * All pages inherit from this layout.
 */

import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * Outfit font configuration.
 * Used for headings and the logo.
 * @see https://fonts.google.com/specimen/Outfit
 */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Inter font configuration.
 * Used for body text and lyrics display.
 * @see https://fonts.google.com/specimen/Inter
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Page metadata for SEO.
 * Used by Next.js to generate <head> tags.
 */
export const metadata: Metadata = {
  title: "1co18 - Ghanaian Worship Lyrics",
  description: "Find and copy Ghanaian worship lyrics for projection software like FreeShow and EasyWorship.",
  keywords: ["worship", "lyrics", "Ghana", "Twi", "church", "FreeShow", "EasyWorship"],
};

/**
 * Root layout component.
 * 
 * Wraps the entire application with:
 * - HTML document structure
 * - Font classes on body
 * - ThemeProvider for dark mode support
 * 
 * @param children - Page content to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        {/* ThemeProvider enables light/dark mode throughout the app */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
