import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "31 Days of Sunshine",
  description: "Just a something nyana for my ray of sunshine",
  openGraph: {
    title: "31 Days of Sunshine for Lathitha",
    description: "Just a something nyana for my ray of sunshine",
    type: "website",
    url: "https://latti.netlify.app/", // Replace with your actual URL
    images: [
      {
        url: "/latti.jpg", // Path to your image in public folder
        width: 1200, // Recommended size for social media
        height: 630, // Recommended aspect ratio 1.91:1
        alt: "31 Days of Sunshine for Lathitha",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
