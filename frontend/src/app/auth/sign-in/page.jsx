/**
 * @file LoginPage.jsx
 * @module LoginPage
 * @description Renders the login page with a styled background and a login form.
 * Utilizes reusable components for styling and layout consistency.
 *
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-11
 */

"use client";

import React from "react";
import BackgroundWrapper from "@/components/wrappers/BackgroundWrapper"; // Wrapper for background styling
import { authData } from "@/data/authData"; // Authentication-related data
import LoginForm from "@/components/auth/LoginForm"; // Login form component

/**
 * LoginPage Component
 *
 * @returns {JSX.Element} Renders the login page with a styled background and login form.
 */
function LoginPage() {
  return (
    <BackgroundWrapper
      src={authData.background} // Background image
      bgOpacity={60} // Set background opacity
      backgroundAttachment="fixed" // Fix the background during scrolling
      className="flex flex-col items-center justify-center" // Full-screen styling
    >
      <LoginForm/>
    </BackgroundWrapper>
  );
}

export default LoginPage;
