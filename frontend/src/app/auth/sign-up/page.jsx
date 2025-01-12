"use client";

/**
 * @file RegisterPage.jsx
 * @module RegisterPage
 * @description 
 *   This component serves as the registration page for the application. 
 *   It displays the registration form inside a styled background wrapper with opacity settings.
 *   The `Register` component is used to handle the actual registration functionality.
 *
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-11
 *
 * @requires Register from '@/components/auth/Register'
 * @requires BackgroundWrapper from '@/components/wrappers/BackgroundWrapper'
 * @requires authData from '@/data/authData'
 *
 * @example
 * // Example usage:
 * import RegisterPage from './RegisterPage';
 * 
 * export default function App() {
 *   return <RegisterPage />;
 * }
 *
 * @notes
 * - The background image and opacity are configurable using `authData.background` and `bgOpacity`.
 * - The page is centered vertically and horizontally using Tailwind's `flex` utilities.
 * - This component uses the `BackgroundWrapper` for consistent background styling across the app.
 */

import React from "react";
import Register from "@/components/auth/Register";
import BackgroundWrapper from "@/components/wrappers/BackgroundWrapper";
import { authData } from "@/data/authData";

function RegisterPage() {
  return (
    <BackgroundWrapper
      src={authData.background} // Background image
      bgOpacity={60} // Set background opacity
      backgroundAttachment="fixed" // Fix the background during scrolling
      className="flex-grow flex flex-col justify-center items-center"
    >
      <Register />
    </BackgroundWrapper>
  );
}

export default RegisterPage;
