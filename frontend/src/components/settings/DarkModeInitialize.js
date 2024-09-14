// src/components/settings/DarkModeInitialize.js

"use client";

/**
 * DarkModeInitialize
 * @desc Initializes dark mode based on localStorage or system preferences.
 * This component doesn't render anything; it just applies the correct theme.
 * 
 * @author Chace Nielson
 * @created 2024-09-XX
 */

import React, { useEffect } from "react";
import { initializeTheme } from "./DarkModeUtils";

export default function DarkModeInitialize() {
  useEffect(() => {
    initializeTheme(); // Initialize theme based on preference
  }, []);

  return null; // This component doesn't render any UI
}
