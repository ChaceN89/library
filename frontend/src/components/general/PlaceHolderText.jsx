/**
 * PlaceHolderText Component
 * A reusable component for displaying placeholder text or loading states.
*
* @param {boolean} loading - Determines whether to show loading state.
* @param {React.Element} placeholder - A custom React element to show as placeholder (e.g., `<div>` or `<span>`).
* @param {string} loadingText - Optional text to display when loading (e.g., "Loading...").
* @param {string} className - Additional CSS classes for styling.
* @param {React.Element} children - The actual content to display when not loading.
*
* @example
* <PlaceHolderText
*   loading={true}
*   placeholder={<div className="bg-gray-300 w-24 h-6 rounded-md"></div>}
*   loadingText="Loading..."
* >
*   <h3>Actual Content</h3>
* </PlaceHolderText>
*/
import React from "react";

function PlaceHolderText({ loading, placeholder, loadingText, className, children }) {
  if (loading) {
    if (placeholder) {
      return <div className={className}>{placeholder}</div>;
    }
    return <div className={className}>{loadingText || "Loading..."}</div>;
  }
  return <>{children}</>;
}

export default PlaceHolderText;
