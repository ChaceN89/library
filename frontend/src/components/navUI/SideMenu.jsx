/**
 * @file SideMenu.jsx
 * @module SideMenu
 * @description Sliding menu component for small screens, with animated transitions.
 *
 * @param {boolean} menuOpen - Indicates whether the menu is open.
 * @param {Function} toggleMenu - Function to toggle the menu's visibility.
 * @param {Component} LeftSideItems - Component for fixed nav items.
 * @param {Component} RightSideItems - Component for user action items.
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-10
 */

import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { overlayVariants, slideVariants } from "@/data/navData";

const SideMenu = ({ menuOpen, toggleMenu, LeftSideItems, RightSideItems }) => {
  return (
    <>
      {/* Overlay Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-secondary dark:bg-primary z-30"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={toggleMenu} // Close menu when clicking outside
          />
        )}
      </AnimatePresence>

      {/* Menu Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 w-64 bg-accent h-full shadow-lg p-6 z-40 border-r-2 border-black border-opacity-20"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Close button */}
            <button
              className="text-white mb-4 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <FaTimes size={24} />
            </button>

            <LeftSideItems />
            <hr className="my-3 h-[2px] bg-primary dark:bg-secondary border-0" />
            <RightSideItems />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
