"use client";
import React from 'react';
import EditProfilePic from './EditProfilePic';
import { useProfileContext } from '@/context/ProfileContext';  // Import the ProfileContext
import Link from 'next/link'  // Import Next.js Link component


function AccountBanner() {
  // Get user data from ProfileContext
  const { userData } = useProfileContext();

  return (
    <div className='border-2 p-4 flex justify-around items-center'>
      {/* Pass the profile image URL to the EditProfilePic component */}
      <EditProfilePic profileImageUrl={userData?.profile_image_url || 'https://library-app-data.s3.ca-west-1.amazonaws.com/misc/defaultProfilePic.jpg'} />
      <div>
        <h2 className="text-xl font-bold">Username: {userData?.username || ''}</h2>
        <p>First Name: {userData?.first_name || ''}</p>
        <p>Last Name: {userData?.last_name || ''}</p>
        <p>Email: {userData?.email || ''}</p>
        <Link href="/settings/account">
          <div className="text-blue-500 hover:underline transition">
            Edit Account
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AccountBanner;
