"use client";

import React, { useState, useEffect } from "react";
import "./dark-mode.css"; // Import your CSS file for the toggle styles

export default function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode state from session storage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkMode = storedTheme === "dark" || (!storedTheme && prefersDark);
    setDarkMode(isDarkMode);
  }, []);

  // Toggle dark mode and store preference in session storage
  const toggleDarkMode = () => {
    const newMode = !darkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newMode === "dark");
    localStorage.setItem("theme", newMode);
    setDarkMode(!darkMode); // Update state
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
        <span className="slider"></span> {/* Use the slider class for the switch */}
      </label>
    </div>
  );
}
