/**
 * @file InputField.jsx
 * @module InputField
 * @description 
 *   A reusable input field component designed for various input types, supporting 
 *   validation, dynamic placeholders, and change handling. Customizable for different 
 *   use cases and styling.
 * 
 * @param {string} type - The type of the input (e.g., "text", "password", "email").
 * @param {string} placeholder - Placeholder text displayed inside the input.
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - Function to handle changes in the input field.
 * @param {boolean} [required=false] - Indicates whether the input is mandatory.
 * 
 * @example
 * // Example usage of InputField component:
 * <InputField
 *   type="text"
 *   placeholder="Enter your username"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 *   required={true}
 * />
 * 
 * @requires react
 * @requires prop-types
 * 
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-16
 */

import React from "react";
import PropTypes from "prop-types";

function InputField({ type, placeholder, value, onChange, required = false, name }) {
  return (
    <input
      type={type}
      name={name} // Ensure the name attribute is passed
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required} // Add required attribute
      className="border p-2 rounded-md w-full text-secondary"
    />
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, // Add name to prop validation
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool, // Make required optional
};

export default InputField;
