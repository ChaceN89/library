/**
 * @file NavDropdown.jsx
 * @module NavDropdown
 * @description 
 *   A dropdown menu component for the navigation bar. Displays a toggleable menu 
 *   with dynamic items, supporting both navigation links and logout actions. 
 *   Includes mouse-out boundary detection for closing the dropdown menu.
 *
 * @example
 *   <NavDropdown items={[
 *     { label: "Profile", icon: <FaUser />, href: "/profile" },
 *     { label: "Logout", icon: <FaSignOutAlt />, logoutAction: true, action: handleLogout }
 *   ]} />
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

import React, { useState, useRef, useEffect } from "react";
import { navData } from "@/data/navData";
import Link from "next/link";

const NavDropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false); // Tracks dropdown open/close state
  const btnRef = useRef(null); // Ref for the toggle button
  const dropRef = useRef(null); // Ref for the dropdown menu
  const boundaryValue = 100; // Distance to detect if the mouse is out of bounds

  /**
   * Toggles the dropdown menu open or closed.
   */
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * Checks if the mouse pointer is outside the bounding rectangle of an element.
   * @param {DOMRect} rect - The bounding rectangle of the element.
   * @param {number} mouseX - The current mouse X-coordinate.
   * @param {number} mouseY - The current mouse Y-coordinate.
   * @returns {boolean} True if the mouse is outside the boundary, false otherwise.
   */
  const isMouseOutOfBounds = (rect, mouseX, mouseY) => {
    return (
      mouseX < rect.left - boundaryValue ||
      mouseX > rect.right + boundaryValue ||
      mouseY < rect.top - boundaryValue ||
      mouseY > rect.bottom + boundaryValue
    );
  };

  /**
   * Handles mouse movement to close the dropdown if the mouse leaves the 
   * button and dropdown menu boundaries.
   * @param {MouseEvent} event - The mousemove event.
   */
  const handleMouseLeave = (event) => {
    const btnRect = btnRef.current?.getBoundingClientRect();
    const dropRect = dropRef.current?.getBoundingClientRect();
    const { clientX: mouseX, clientY: mouseY } = event;

    if (isMouseOutOfBounds(btnRect, mouseX, mouseY) && isMouseOutOfBounds(dropRect, mouseX, mouseY)) {
      setIsOpen(false);
    }
  };

  // Attach or remove the mousemove event listener based on dropdown state
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousemove", handleMouseLeave);
    } else {
      document.removeEventListener("mousemove", handleMouseLeave);
    }
    return () => document.removeEventListener("mousemove", handleMouseLeave);
  }, [isOpen]);

  return (
    <div className="relative w-full lg:w-auto">
      {/* Dropdown toggle button */}
      <button
        ref={btnRef}
        onClick={toggleDropdown}
        className="nav-button-1 w-full flex gap-0.5 items-center"
      >
        <span className="relative z-10 flex gap-1 items-center">
          {navData.menuButton.icon}
          {navData.menuButton.label}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropRef}
          className="absolute right-0 bg-white dark:bg-secondary border rounded-lg shadow-lg w-full lg:w-fit"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`dropdown-cell ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === items.length - 1 ? "rounded-b-lg" : ""}`}
            >
              {item.logoutAction ? (
                // Logout action item
                <a
                  onClick={item.action ? item.action : null}
                  className="dropdown-item"
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                // Navigation link item
                <Link href={item.href} className="dropdown-item">
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
