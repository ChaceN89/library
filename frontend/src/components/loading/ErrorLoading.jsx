/**
 * @file ErrorLoading.jsx
 * @module ErrorLoading
 * @desc React component to display an error message when data fails to load or an error occurs.
 *
 * @component ErrorLoading
 *
 * @requires react
 * @requires react-icons/md
 *
 * @example
 * // Example usage of ErrorLoading component
 * import ErrorLoading from './ErrorLoading';
 *
 * function App() {
 *   return <ErrorLoading message="Failed to load data. Please try again." />;
 * }
 *
 * @exports ErrorLoading
 *
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-11
 */

import React from "react";
import { MdError } from "react-icons/md";

/**
 * ErrorLoading component
 *
 * @param {string} message - The error message to display.
 * @param {string} className - Additional CSS classes for the component container.
 * @returns {JSX.Element} The rendered error message component.
 */
const ErrorLoading = ({ message = "An error occurred. Please try again later.", className = "h-full" }) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <div className="h-36 flex flex-col justify-center items-center p-4 bg-red-100 text-red-700 border border-black rounded-lg shadow-lg min-w-72 max-w-lg mx-auto">
        <MdError className="w-10 h-10 mb-2" aria-hidden="true" />
        <p className="text-lg text-center font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default ErrorLoading;
