/**
 * @file Footer.jsx
 * @module Footer
 * @description 
 *   A simple footer component for the application. Includes a logo link to navigate back to the top of the page 
 *   and a reference to the author's website for contact.
 * 
 *  * truns off when full screen is activated by the bookContext
 *
 * @example
 *   <Footer />
 * 
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

"use client"
import React from "react";
import LogoLink from "./LogoLink"; // Logo link for navigation
import { useBookContext } from "@/context/BookContext";

function Footer() {

  const { isFullScreen } = useBookContext();
  
  if (isFullScreen){return null}

  return (
    <footer className="bg-accent flex relative section-container py-4">
      <div className="w-full flex justify-between">
        {/* Link back to the top with the logo */}
        <LogoLink />

        {/* Author/contact link */}
        <h5 className="text-primary hover:underline hover:cursor-pointer" >
          <a 
            href="https://chacenielson.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chace Nielson
          </a>
        </h5>
      </div>
    </footer>
  );
}

export default Footer;
