/**
 * @file AccountSettingsPage.jsx
 * @module AccountSettingsPage
 * @description 
 *   Page component for account settings, displaying the account settings interface within 
 *   styled wrappers for background and section layout.
 *
 * @requires React
 * @requires AccountSettings - Component containing account settings functionalities.
 * @requires BackgroundWrapper - Wrapper for the page background styling.
 * @requires SectionWrapper - Wrapper for the section title and content layout.
 * @requires authData - Contains static data for authentication-related assets like background images.
 *
 * @component
 * @example
 * // Usage of AccountSettingsPage:
 * <AccountSettingsPage />
 * 
 * @exports AccountSettingsPage
 * @author Chace Nielson
 * @created 2025-01-16
 */

"use client"
import AccountSettings from '@/components/settings/AccountSettings'
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { authData } from '@/data/authData'
import React from 'react'

function AccountSettingsPage() {
  return (
    <BackgroundWrapper
      src={authData.background} // Background image
      bgOpacity={60} // Set background opacity
      backgroundAttachment="fixed" // Fix the background during scrolling
      className="flex-grow flex flex-col "
    >
      <SectionWrapper
        title={"Account Settings"}
        subtitle={"Edit Your Account Info"}
      >
        <AccountSettings/>
      </SectionWrapper>
    </BackgroundWrapper>
  )
}

export default AccountSettingsPage