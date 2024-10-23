import React from 'react'
import AccountBanner from './AccountBanner'
import DarkModeButton from './DarkModeButton'
import VersionInfo from './VersionInfo'
import Link from 'next/link'  // Import Next.js Link component

function Settings() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className="text-2xl font-bold ">Settings Page</h1>
      <AccountBanner />
      <DarkModeButton />
      
      {/* Text with underline hover effect */}
      <Link href="/settings/account">
        <div className="text-blue-500 hover:underline transition">
          Edit Account
        </div>
      </Link>
      
      <VersionInfo />
    </div>
  )
}

export default Settings;
