/**
 * @file page.jsx
 * @module SettingsPage
 * @description 
 *   The main settings page for the application. Renders a background and includes the 
 *   settings component that contains account settings, theme toggling, and admin options.
 *
 * @requires React
 * @requires BackgroundWrapper - Component for background image and styling.
 * @requires Settings - Component that renders the settings content.
 * @requires authData - Contains application-level authentication data.
 *
 * @component SettingsPage
 *
 * @example
 * // Render the SettingsPage as part of a Next.js app:
 * import SettingsPage from "@/app/settings/page";
 *
 * export default function App() {
 *   return <SettingsPage />;
 * }
 *
 * @exports SettingsPage
 * @author Chace Nielson
 * @created 2025-01-16
 * @updated 2025-01-16
 */

"use client"
import React from 'react'
import Settings from '@/components/settings/Settings'
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper'
import { authData } from '@/data/authData'

function SettingsPage() {
  return (
    <BackgroundWrapper
      src={authData.background} // Background image
      bgOpacity={60} // Set background opacity
      backgroundAttachment="fixed" // Fix the background during scrolling
      className="flex-grow flex flex-col justify-center items-center section-container"
    >
      <Settings/>
    </BackgroundWrapper>
  )
}

export default SettingsPage