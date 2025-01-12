/**
 * @file SubmitButton.jsx
 * @module SubmitButton
 * @description 
 *   A reusable button component specifically designed for form submissions. 
 *   Supports customizable labels and dynamic states (enabled/disabled).
 *   Includes styling for hover and disabled states to enhance UX.
 * 
 * @param {string} label - The text displayed on the button.
 * @param {boolean} [disabled=false] - Disables the button when set to true, with visual feedback.
 * 
 * @example
 * // Example usage of SubmitButton component:
 * <SubmitButton 
 *   label="Submit" 
 *   disabled={false} 
 * />
 * 
 * @requires react
 * @requires prop-types
 * 
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-11
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * SubmitButton Component
 * 
 * Renders a styled button for form submissions with optional disabled state.
 * Provides distinct visual feedback for enabled and disabled states.
 * 
 * @param {string} label - The text displayed on the button.
 * @param {boolean} [disabled=false] - Indicates whether the button is disabled.
 * @returns {JSX.Element} A submit button component.
 */
function SubmitButton({ label, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled} // Dynamically disable the button if needed
      className={`p-2 rounded-md w-full ${
        disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed" // Styling for disabled state
          : "bg-blue-500 text-white hover:bg-blue-600" // Styling for enabled state
      }`}
    >
      {label}
    </button>
  );
}

// Prop type validation
SubmitButton.propTypes = {
  label: PropTypes.string.isRequired, // Button label text
  disabled: PropTypes.bool, // Optional prop to disable the button
};

export default SubmitButton;
