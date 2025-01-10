/**
 * @file LoadingWheel.jsx
 * @module LoadingWheel
 * @desc React component that displays a spinning loading wheel, centered within its parent container.
 *
 * @component LoadingWheel
 *
 * @requires react
 *
 * @example
 * // Example usage of LoadingWheel component
 * import LoadingWheel from './LoadingWheel';
 *
 * function App() {
 *   return (
 *     <div className="h-screen">
 *       <LoadingWheel className="h-full" />
 *     </div>
 *   );
 * }
 *
 * @exports LoadingWheel
 *
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-08
 */

import React from "react";

/**
 * LoadingWheel component
 *
 * @param {string} className - Optional class name to customize the container styling.
 * @returns {JSX.Element} A spinning loading indicator.
 */
const LoadingWheel = ({ className = "h-full" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default LoadingWheel;
