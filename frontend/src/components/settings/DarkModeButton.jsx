/**
 * @file DarkModeButton.jsx
 * @module DarkModeButton
 * @description 
 *   Component for toggling between light and dark mode. Updates the `dark` class on 
 *   the root HTML element to switch themes. Displays current mode and icon.
 *
 * @requires React
 * @requires useState - React hook for managing dark mode state.
 * @requires useEffect - React hook for synchronizing the initial state with the DOM.
 *
 * @component DarkModeButton
 *
 * @example
 * // Render the DarkModeButton component:
 * import DarkModeButton from "@/components
*/
"use client";

import React, { useState, useEffect } from "react";
import "./dark-mode.css"; // Import your CSS file for the toggle styles

export default function DarkModeButton() {
  // State to track the dark mode status
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update the dark mode class on the HTML root element
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    const html = document.documentElement;
    if (!isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  // Set the initial dark mode state based on the class on mount
  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div
      onClick={toggleDarkMode}
      className={`flex items-center gap-2 cursor-pointer m-2 p-2 z-[100] font-mono text-white rounded-full ${
        isDarkMode ? "bg-gray-400" : "bg-gray-700"
      }`}
    >
      <div className="h-10 w-10 flex items-center justify-center">
        {isDarkMode ? "🌙" : "☀️"}
      </div>
      <span className="text-sm">
        {isDarkMode ? "Dark Mode: On" : "Dark Mode: Off"}
      </span>
    </div>
  );
}
