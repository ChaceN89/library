import React from 'react'
import AccountBanner from './AccountBanner'
import DarkModeButton from './DarkModeButton'
import VersionInfo from './VersionInfo'
import LinkToAdminPage from '../admin/LinkToAdminPage'

function Settings() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className="text-2xl font-bold ">Settings Page</h1>
      <AccountBanner />
      <DarkModeButton />
      

      <LinkToAdminPage />
      <VersionInfo />
    </div>
  )
}

export default Settings;
