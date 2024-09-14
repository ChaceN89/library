// src/components/settings/DarkModeButton.js

"use client";

/**
 * DarkModeButton
 * @desc Button to toggle between dark mode and light mode.
 * The button updates the localStorage and toggles the theme dynamically.
 * 
 * @created 2024-09-XX
 */

import React, { useState, useEffect } from "react";
import { toggleTheme, initializeTheme } from "./DarkModeUtils";
import "./dark-mode.css";


export default function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize the dark mode state based on user's system preference or localStorage
  useEffect(() => {
    const isDarkMode = initializeTheme();
    setDarkMode(isDarkMode);
  }, []);

  // Toggle dark mode and store the preference in localStorage
  const toggleDarkMode = () => {
    toggleTheme(darkMode);
    setDarkMode(!darkMode); // Toggle the state
  };

  return (
    <div className="flex items-center gap-2">
      <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode} // Toggle on change
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
