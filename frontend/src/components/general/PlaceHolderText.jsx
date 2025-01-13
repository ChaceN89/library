import React from "react";

/**
 * PlaceHolderText Component
 * A reusable component for displaying placeholder text or loading states.
 *
 * @param {boolean} loading - Determines whether to show loading state.
 * @param {React.Element} placeholder - Optional custom React element to show as a placeholder.
 * @param {string} className - Additional classes for the placeholder.
 * @param {React.Element} children - The actual content to display when not loading.
 *
 * @example
 * <PlaceHolderText loading={true}>
 *   <h3>This is a heading</h3>
 * </PlaceHolderText>
 */
function PlaceHolderText({ 
  loading, 
  placeholder = null, 
  children 
}) {
  // Get the tag name of the child element, if available
  const tagName = React.isValidElement(children) ? children.type : "div";

  // Generate a default placeholder based on the tag
  const defaultPlaceholder = React.createElement(
    tagName,
    {
      className: `w-inherit bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse "
      }`,
    },
    "\u00A0" // Non-breaking space to ensure the element has height
  );

  // Show placeholder when loading, otherwise render children
  return loading ? (placeholder || defaultPlaceholder) : <>{children}</>;
}

export default PlaceHolderText;
