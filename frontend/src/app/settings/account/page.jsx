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
        title={"Account"}
        subtitle={"Edit Your Account Info"}
      >
        <AccountSettings/>
      </SectionWrapper>
    </BackgroundWrapper>
  )
}

export default AccountSettingsPage