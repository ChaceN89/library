/**
 * @file NavBar.jsx
 * @module NavBar
 * @description 
 *   A responsive navigation bar with a hamburger menu for smaller screens and a fixed layout for larger screens. 
 *   Includes left-side navigation links and user actions on the right, with animated transitions and keyboard accessibility.
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

"use client";

import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useProfileContext } from "@/context/ProfileContext";
import { navData } from "@/data/navData";
import FixedNavItems from "./FixedNavItems";
import UserActionsNav from "./UserActionsNav";
import SideMenu from "./SideMenu";

const NavBar = () => {
  // State to track the menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // Access user authentication and logout logic from ProfileContext
  const { isLoggedIn, handleLogout } = useProfileContext();

  // Toggle menu state
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu
  const closeMenu = () => setMenuOpen(false);

  // Effect: Close the menu when Escape is pressed or screen is resized
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) closeMenu();
    };

    const handleResize = () => {
      // Automatically close the menu if the screen is resized to desktop width
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };

    // Attach event listeners for keyboard and window resize
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup event listeners on unmount
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className="w-full bg-accent py-4 sticky top-0 z-50 shadow-lg section-container">
      <div className="flex justify-between items-center ">
        {/* Left side: Static navigation links for larger screens */}
        <div className="hidden lg:flex">
          <FixedNavItems />
        </div>

        {/* Hamburger menu button for smaller screens */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {navData.hamburgerMenuIcons.open}
        </button>

        {/* Right side: User actions for larger screens */}
        <div className="hidden lg:flex">
          <UserActionsNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </div>

      {/* Side menu for smaller screens, with animated transitions */}
      <SideMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        LeftSideItems={FixedNavItems}
        RightSideItems={(props) => (
          <UserActionsNav
            {...props}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        )}
      />
    </nav>
  );
};

export default NavBar;
