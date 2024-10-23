// settings/page.jsx

import React from 'react'
import DarkModeButton from '@/components/settings/DarkModeButton'

function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Settings Page</h1>

      <hr className='pb-2 mt-2'/>

      <DarkModeButton />

      <hr className='pb-2 mt-2'/>

      {/* Link to Account Page */}
      <div className="">
        <h3 className="text-lg font-medium">Account</h3>
        <a href="/dashboard/account" className="text-blue-600 hover:underline">Edit Account Info</a>
      </div>

      <hr className='pb-2 mt-2'/>
      <h3 className="text-lg font-medium">Security</h3>
      <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md">Change Password</button>

      <hr className='pb-2 mt-2'/>

      <div>Language settings </div>
      <div>notification Settings</div>
      <hr className='pb-2 mt-2'/>
      <div>
        <h3 className="text-lg font-medium">Privacy and Security</h3>
        <button className="mt-2 bg-red-600 text-white py-2 px-4 rounded-md">Clear Browsing History</button>
        <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md">Manage Connected Accounts</button>
      </div>

      <hr className='pb-2 mt-2'/>

      <div className="mt-2">
        <h3 className="text-lg font-medium">App Info</h3>
        <p>Version: 1.0.0</p>
        <p>Author: John Doe</p>
        <p>Cn fetch this from a backend route so it stays up to date</p>
      </div>
    </div>
  )
}

export default SettingsPage