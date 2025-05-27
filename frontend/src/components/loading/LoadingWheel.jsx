/**
 * @file LoadingWheel.jsx
 * @module LoadingWheel
 * @desc React component that displays a spinning loading wheel, centered within its parent container.
 * will display a message about the server if active for more than 12 seconds
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
 * @updated 2025-01-20
 */

import React, { useEffect, useState } from "react";

/**
 * LoadingWheel component
 *
 * @param {string} className - Optional class name to customize the container styling.
 * @returns {JSX.Element} A spinning loading indicator.
 */
const LoadingWheel = ({ className = "h-full" }) => {

// Set a timer for 10 seconds - if the loading wheel is still spinning after 10 seconds, display an a second message below the loading wheeel
//the backend is on render and might take up to 1 min to load if it hasn't been accessed in a while so i just need a loading message that lets a user know its still 

const [showMessage, setShowMessage] = useState(false);


useEffect(() => {
  // Set a timer to display the message after 10 seconds
  const timer = setTimeout(() => {
    setShowMessage(true);
  }, 6000);

  return () => clearTimeout(timer); // Cleanup the timer on component unmount
}, []);

  return (
    <div className={`flex flex-col justify-center items-center `}>
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"
        role="status"
        aria-label="Loading"
      ></div>
      {showMessage && (
        <div className="mt-4 px-2 text-center text-gray-600 dark:text-gray-300 w-full text-xs">
          The server is starting up. This may take up to a minute. Thanks for your patience.
        </div>
      )}
    </div>
  );
};

export default LoadingWheel;
