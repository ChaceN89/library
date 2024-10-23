import React from 'react'

function VersionInfo() {
  return (
    <div className="mt-2">
      <h3 className="text-lg font-medium">App Info</h3>
      <p>Version: 1.0.0</p>
      <p>Author: John Doe</p>
      <p>Cn fetch this from a backend route so it stays up to date</p>
    </div>
  )
}

export default VersionInfo