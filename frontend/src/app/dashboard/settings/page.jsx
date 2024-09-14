// settings/page.jsx

import React from 'react'
import DarkModeButton from '@/components/settings/DarkModeButton'

function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Settings Page</h1>
      <DarkModeButton />
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <p>This text color and background will change with dark mode!</p>
      </div>
    </div>
  )
}

export default SettingsPage