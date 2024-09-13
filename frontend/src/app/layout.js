import localFont from "next/font/local";
import "../styles/globals.css";  // Fix the import path for globals.css

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>Navbar</div>
        {children}
      </body>
    </html>
  );
}
