/**
 * @file FixedNavItems.jsx
 * @module FixedNavItems
 * @description 
 *   A component for rendering the fixed navigation items on the left side of the navigation bar. 
 *   Includes the logo, a "Browse Books" button, and a search bar.
 *   Adjusts visibility based on the `popUp` prop for responsiveness.
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

import React from "react";
import NavSearch from "./NavSearch";
import LogoLink from "../general/LogoLink";
import NavButton from "./NavButton";
import { navData } from "@/data/navData";

/**
 * FixedNavItems Component
 * 
 * @param {boolean} [popUp=false] - If true, applies styles for rendering in a pop-up menu (e.g., for small screens).
 * 
 * @returns {JSX.Element} A container for fixed navigation items (logo, browse button, and search bar).
 */
const FixedNavItems = ({ popUp = false }) => (
  <div className={`nav-actions ${popUp && "lg:hidden"}`}>
    {/* Logo link: navigates to the home page */}
    <LogoLink />

    {/* Browse button: navigates to the "Browse Books" page */}
    <NavButton
      href={navData.browseButton.href}
      label={navData.browseButton.label}
    />

    {/* Search bar: enables users to search for books */}
    <NavSearch />
  </div>
);

export default FixedNavItems;
