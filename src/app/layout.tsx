import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/libs/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // without this, relative image paths never resolve for link previews
  metadataBase: new URL(SITE_URL),
  // no title template here: the pages already append "| Adeptstack" themselves
  title: "Adeptstack",
  description: "Complexity made simple!",
  openGraph: {
    siteName: "Adeptstack",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Adeptstack",
    description: "Complexity made simple!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeptstack",
    description: "Complexity made simple!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
