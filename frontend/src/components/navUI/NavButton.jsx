/**
 * @file NavButton.jsx
 * @module NavButton
 * @description 
 *   A reusable navigation button component that renders a link with an optional icon and label.
 *   Styled for consistent appearance across the application.
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

import React from 'react';
import Link from 'next/link';

/**
 * NavButton Component
 * 
 * @param {string} href - The URL to navigate to when the button is clicked.
 * @param {string} label - The text displayed on the button.
 * @param {JSX.Element} [Icon] - An optional icon to display alongside the label.
 * 
 * @returns {JSX.Element} A styled navigation button with an optional icon.
 */
const NavButton = ({ href, label, Icon }) => (
  <Link
    href={href}
    className="nav-button-1" // Apply consistent styling using this class
  >
    <span className="relative z-10 flex gap-1 items-center">
      {/* Render the optional icon and label */}
      {Icon}
      {label}
    </span>
  </Link>
);

export default NavButton;
