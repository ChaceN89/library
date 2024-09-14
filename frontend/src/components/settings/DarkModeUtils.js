// src/utils/darkModeUtils.js

/**
 * Dark Mode Utilities
 * @desc Utility functions to manage dark mode (applying and toggling themes).
 * 
 * @created 2024-09-XX
 */

/**
 * Apply dark mode by adding the 'dark' class to the document root.
 */
export const applyDarkMode = () => {
  document.documentElement.classList.add("dark");
};

/**
 * Apply light mode by removing the 'dark' class from the document root.
 */
export const applyLightMode = () => {
  document.documentElement.classList.remove("dark");
};

/**
 * Initialize the theme by checking localStorage or system preferences.
 * 
 * @returns {boolean} true if dark mode is applied, false if light mode.
 */
export const initializeTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply theme based on localStorage or system preference
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    applyDarkMode();
    return true; // Return true for dark mode
  } else {
    applyLightMode();
    return false; // Return false for light mode
  }
};

/**
 * Toggle the theme based on the current state.
 * 
 * @param {boolean} isDarkMode - Current dark mode state
 */
export const toggleTheme = (isDarkMode) => {
  if (isDarkMode) {
    applyLightMode();
    localStorage.setItem("theme", "light");
  } else {
    applyDarkMode();
    localStorage.setItem("theme", "dark");
  }
};
