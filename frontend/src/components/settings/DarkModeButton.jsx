"use client";

import React, { useState, useEffect } from "react";
import { toggleTheme, initializeTheme } from "./DarkModeUtils";
import "./dark-mode.css";

export default function DarkModeButton() {
  // Initialize with the system preference (for instant rendering)
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(systemPrefersDark);
  const [initialized, setInitialized] = useState(false);

  // Sync dark mode with localStorage (override system preference)
  useEffect(() => {
    const isDarkMode = initializeTheme();  // Load theme from localStorage or system preference
    setDarkMode(isDarkMode);
    setInitialized(true);  // Mark as initialized once syncing is complete
  }, []);

  // Toggle dark mode and store the preference in localStorage
  const toggleDarkMode = () => {
    toggleTheme(darkMode);
    setDarkMode(!darkMode); // Toggle the state
  };

  // Ensure that the toggle is always visible immediately, even if initialization is in progress
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
