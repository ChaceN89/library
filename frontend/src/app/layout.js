import localFont from "next/font/local";
import "../styles/globals.css";  // Fix the import path for globals.css

import Navbar from "@/components/navUI/Navbar";
import TailwindBreakPoints from "@/components/testing/TailwindBreakPoints";
import Footer from "@/components/general/Footer";
import Head from "next/head";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",  // Correct path relative to the public folder
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",  // Correct path relative to the public folder
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PageFlow Library",
  description: "A simple library app to manage txt files",
  icons: {
    icon: '/fox.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}  
      >
        <TailwindBreakPoints />
        <Navbar />
        <main className="flex-grow container mx-auto flex flex-col justify-stretch h-full min-h-screen">  {/* flex-grow to fill space */}
          {children}
        </main>
        <Footer className="mt-auto" />  {/* Ensure footer stays at the bottom */}
      </body>
    </html>
  );
}
