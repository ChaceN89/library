import localFont from "next/font/local";
import "../styles/globals.css";  // Fix the import path for globals.css

import Navbar from "@/components/navUI/Navbar";
import TailwindBreakPoints from "@/components/testing/TailwindBreakPoints";
import Footer from "@/components/general/Footer";

// contexts
import { SearchProvider } from '@/context/SearchContext';  // Import the SearchProvider
import { ProfileProvider } from "@/context/ProfileContext";

import { Toaster } from 'react-hot-toast';


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

const darkModeScript = `
  (function() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Dark mode initialization script */}
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}>
        <ProfileProvider>
          <SearchProvider>
            <Toaster position="top-center" reverseOrder={false} />

            <TailwindBreakPoints />
            <Navbar />
            <main className="flex-grow container mx-auto flex flex-col justify-stretch h-full min-h-screen">
              {children}
            </main>
            <Footer className="mt-auto" />
          </SearchProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
