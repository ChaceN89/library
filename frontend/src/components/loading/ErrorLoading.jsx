/**
 * @file ErrorLoading.jsx
 * @module ErrorLoading
 * @desc React component to display an error message when data fails to load or an error occurs.
 *
 * @component ErrorLoading
 *
 * @requires react
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
 * @updated 2025-01-08
 */

import React from "react";

/**
 * ErrorLoading component
 *
 * @param {string} message - The error message to display.
 * @returns {JSX.Element} The rendered error message component.
 */
const ErrorLoading = ({ message = "An error occurred. Please try again later.", className="h-full" }) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className} `}>
      <div className={`h-36 flex flex-col justify-center items-center p-4 bg-red-100 text-red-700 border border-black rounded-lg shadow-lg min-w-72 max-w-lg mx-auto`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 mb-2"
          aria-hidden="true"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M9.172 9.172a4 4 0 115.656 5.656 4 4 0 01-5.656-5.656z"
            />
        </svg>
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default ErrorLoading;
