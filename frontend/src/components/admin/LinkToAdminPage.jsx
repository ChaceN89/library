"use client"
import React from 'react';
import Link from 'next/link';
import { useProfileContext } from '@/context/ProfileContext';  // Import the ProfileContext

function LinkToAdminPage() {
  const { userData } = useProfileContext();  // Access context data

  // Conditionally render the link only if the user is an admin (is_staff)
  if (!userData || !userData.is_staff) {
    return null; // Return nothing if the user is not an admin
  }

  return (
    <div className="my-4">
      <Link href="/admin">
        <div className="text-blue-500 hover:underline">Go to Admin Page</div>
      </Link>
    </div>
  );
}

export default LinkToAdminPage;
