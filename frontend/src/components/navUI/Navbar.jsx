/**
 * @file NavBar.jsx
 * @module NavBar
 * @description Responsive navigation bar with a hamburger menu for smaller screens.
 * Includes fixed left-side navigation and user actions on the right, with animated transitions.
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-10
 */

"use client";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import FixedNavItems from "./FixedNavItems";
import UserActionsNav from "./UserActionsNav";
import SideMenu from "./SideMenu";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Add an event listener for the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Add a resize listener to close the menu when screen size exceeds `md`
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu(); // Close the menu if screen size is `md` or larger
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the resize listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="w-full bg-accent p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        {/* Left side: Fixed items */}
        <div className="hidden md:flex">
          <FixedNavItems />
        </div>

        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <FaBars size={24} />
        </button>

        {/* Right side: User actions */}
        <div className="hidden md:flex">
          <UserActionsNav />
        </div>
      </div>

      {/* Animated pop-out menu for small screens */}
      <SideMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        LeftSideItems={FixedNavItems}
        RightSideItems={UserActionsNav}
      />
    </nav>
  );
};

export default NavBar;
