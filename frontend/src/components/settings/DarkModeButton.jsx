"use client"; // Enable client-side JavaScript

import React, { useState, useEffect } from "react";
import "./dark-mode.css";

function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize the dark mode state based on user's system preference or localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setDarkMode(true);
      applyDark();
    } else {
      setDarkMode(false);
      applyLight();
    }
  }, []);

  // Apply Light Mode
  const applyLight = () => {
    document.documentElement.classList.remove("dark");
  };

  // Apply Dark Mode
  const applyDark = () => {
    document.documentElement.classList.add("dark");
  };

  // Toggle dark mode and store the preference in localStorage
  const toggleDarkMode = () => {
    if (darkMode) {
      applyLight();
      localStorage.setItem("theme", "light");
    } else {
      applyDark();
      localStorage.setItem("theme", "dark");
    }
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

export default DarkModeButton;
