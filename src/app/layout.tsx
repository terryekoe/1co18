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
 * Includes Open Graph and Twitter cards for social sharing.
 */
export const metadata: Metadata = {
  title: {
    default: "1co18 - Ghanaian Worship Lyrics",
    template: "%s | 1co18",
  },
  description: "Find and copy Ghanaian worship lyrics in Twi, Ga, and other local languages. Formatted for projection software like FreeShow and EasyWorship.",
  keywords: ["worship lyrics", "Ghana", "Twi", "Ghanaian gospel", "church projection", "FreeShow", "EasyWorship", "praise and worship", "African hymns"],
  authors: [{ name: "1co18 Community" }],
  creator: "1co18",
  metadataBase: new URL("https://1co18.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://1co18.vercel.app",
    title: "1co18 - Ghanaian Worship Lyrics",
    description: "Find and copy Ghanaian worship lyrics for church projection. Twi, Ga, Ewe, and more.",
    siteName: "1co18",
  },
  twitter: {
    card: "summary_large_image",
    title: "1co18 - Ghanaian Worship Lyrics",
    description: "Find and copy Ghanaian worship lyrics for church projection.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
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
