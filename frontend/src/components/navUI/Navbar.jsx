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
import { useProfileContext } from "@/context/ProfileContext";
import { navData } from "@/data/navData";
import FixedNavItems from "./FixedNavItems";
import UserActionsNav from "./UserActionsNav";
import SideMenu from "./SideMenu";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, handleLogout } = useProfileContext(); // Access profile data

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Close the menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) closeMenu();
    };

    const handleResize = ()=>{
      if (window.innerWidth >= 1024){
        closeMenu();
      }
    } 

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className="w-full bg-accent p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        {/* Left side: Fixed items */}
        <div className="hidden lg:flex">
          <FixedNavItems />
        </div>

        {/* Hamburger menu for small screens */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <FaBars size={24} />
        </button>

        {/* Right side: User actions */}
        <div className="hidden lg:flex">
          <UserActionsNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </div>

      {/* Animated pop-out menu for small screens */}
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
