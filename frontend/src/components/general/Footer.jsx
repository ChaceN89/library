/**
 * @file Footer.jsx
 * @module Footer
 * @description 
 *   A simple footer component for the application. Includes a logo link to navigate back to the top of the page 
 *   and a reference to the author's website for contact.
 *
 * @example
 *   <Footer />
 * 
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

import React from "react";
import LogoLink from "./LogoLink"; // Logo link for navigation

function Footer() {
  return (
    <footer className="bg-accent flex relative bottom-0">
      <div className="container mx-auto flex justify-between items-center p-1 sm:p-2">
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
