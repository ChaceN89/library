/**
 * @file PlaceHolderText.jsx
 * @module PlaceHolderText
 * @description
 * A reusable component for displaying placeholder text or loading states.
 * Automatically adapts to the dimensions and tag type of its child element.
 *
 * @param {boolean} loading - Determines whether to show the placeholder.
 * @param {React.Element} placeholder - Optional custom React element for placeholder.
 * @param {string} width - Tailwind CSS width class for the placeholder.
 * @param {React.Element} children - The actual content to display when not loading.
 *
 * @example
 * <PlaceHolderText loading={true}>
 *   <h3>This is a heading</h3>
 * </PlaceHolderText>
 *
 * @exports PlaceHolderText
 *
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React from "react";

function PlaceHolderText({
  loading,
  placeholder = null,
  width = "w-full",
  children,
}) {
  // Determine the tag type of the child element, fallback to "div" if not provided
  const tagName = React.isValidElement(children) ? children.type : "div";

  // Generate a default placeholder that matches the child element's dimensions and style
  const defaultPlaceholder = React.createElement(
    tagName,
    {
      className: `bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse ${width}`,
      style: { height: React.isValidElement(children) ? "auto" : "1rem" }, // Auto-height for matching tags
    },
    "\u00A0" // Non-breaking space for ensuring height is maintained
  );

  // Return the placeholder if loading, otherwise render children
  return loading ? placeholder || defaultPlaceholder : <>{children}</>;
}

export default PlaceHolderText;
