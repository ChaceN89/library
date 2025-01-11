/**
 * @file RootLayout.jsx - layout.jsx
 * @module RootLayout
 * @desc Entry point layout for the PageFlow Library application, managing global providers, styles, and structure.
 * This layout wraps the entire application, providing shared components like context providers, the footer, and testing utilities.
 *
 * @component RootLayout
 * 
 * @requires Navbar from "@/components/navUI/Navbar"
 * @requires Footer from "@/components/general/Footer"
 * @requires TailwindBreakPoints from "@/components/testing/TailwindBreakPoints"
 * @requires DarkModeTestingToggle from "@/components/testing/DarkModeTestingToggle"
 * @requires GoogleOAuthProvider from '@react-oauth/google'
 * @requires GOOGLE_CLIENT_ID from "../globals"
 * @requires ProfileProvider from "@/context/ProfileContext"
 * @requires FavBooksProvider from "@/context/FavBooksContext"
 * @requires SearchProvider from '@/context/SearchContext'
 * @requires Toaster from 'react-hot-toast'
 * @requires "../styles/globals.css"
 * @requires "../styles/display.css"
 *
 * @description
 * - Wraps the app with context providers: `GoogleOAuthProvider`, `ProfileProvider`, `FavBooksProvider`, and `SearchProvider`.
 * - Includes testing utilities (`DarkModeTestingToggle`, `TailwindBreakPoints`) only for development.
 * - Provides a consistent footer and a `Toaster` for notifications.
 * 
 * @notes
 * - Uses environment variables to configure Google OAuth.
 * - `Navbar` is currently commented out but can be enabled as needed.
 * 
 * @example
 * // Example of usage:
 * import RootLayout from './layout';
 * 
 * export default function App({ children }) {
 *   return <RootLayout>{children}</RootLayout>;
 * }
 * 
 * @exports RootLayout
 * 
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-08
 */

import "../styles/globals.css";  // Fix the import path for globals.css
import "../styles/display.css";  // Fix the import path for globals.css

import Navbar from "@/components/navUI/Navbar";
import TailwindBreakPoints from "@/components/testing/TailwindBreakPoints";
import DarkModeTestingToggle from "@/components/testing/DarkModeTestingToggle";
import Footer from "@/components/general/Footer";

// Google Signin info and google context
import { GOOGLE_CLIENT_ID } from "../globals";
import { GoogleOAuthProvider } from '@react-oauth/google';

// contexts
import { SearchProvider } from '@/context/SearchContext';  // Import the SearchProvider
import { ProfileProvider } from "@/context/ProfileContext";
import { FavBooksProvider } from "@/context/FavBooksContext";

import { Toaster } from 'react-hot-toast';

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
      <body className={` antialiased h-full flex flex-col`}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <ProfileProvider>
            <FavBooksProvider>
              <SearchProvider>
                <Toaster position="top-center" reverseOrder={false} />
                <DarkModeTestingToggle/>
                <TailwindBreakPoints />
                <Navbar />
                <main className="flex-grow  flex flex-col justify-stretch h-full min-h-screen">
                  {children}
                </main>
                <Footer className="mt-auto" />
              </SearchProvider>
            </FavBooksProvider>
          </ProfileProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
