/**
 * @file AccountBanner.jsx
 * @module AccountBanner
 * @description 
 *   Component for displaying user account details, including profile image, name, email, 
 *   and a link to edit account settings. Uses the profile context to fetch user information.
 *
 * @requires React
 * @requires useProfileContext - Hook to access user profile information.
 * @requires EditProfilePic - Component for editing the profile picture.
 * @requires Link - Next.js Link component for navigation.
 *
 * @component AccountBanner
 *
 * @example
 * // Render the AccountBanner component:
 * import AccountBanner from "@/components/settings/AccountBanner";
 *
 * export default function App() {
 *   return <AccountBanner />;
 * }
 *
 * @exports AccountBanner
 * @author Chace Nielson
 * @created 2025-01-16
 * @updated 2025-01-16
 */

"use client";
import React from 'react';
import EditProfilePic from './EditProfilePic';
import { useProfileContext } from '@/context/ProfileContext';
import Link from 'next/link';

function AccountBanner() {
  const { userData } = useProfileContext();

  return (
    <div className=" border dark:border-gray-600 p-4 flex flex-col-reverse md:flex-row items-center gap-6 rounded-lg bg-gray-100 dark:bg-gray-700">
      <EditProfilePic
        profileImageUrl={userData?.profile_image_url || 'https://library-app-data.s3.ca-west-1.amazonaws.com/misc/defaultProfilePic.jpg'}
      />
      <div className=' md:border-l-4 pl-4 border-black dark:border-white'>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Username: {userData?.username || ''}</h3>
        <p className="text-gray-600 dark:text-gray-300">First Name: {userData?.first_name || ''}</p>
        <p className="text-gray-600 dark:text-gray-300">Last Name: {userData?.last_name || ''}</p>
        <p className="text-gray-600 dark:text-gray-300">Email: {userData?.email || ''}</p>
        <Link href="/settings/account">
          <div className="text-blue-500 hover:underline transition">Edit Account Info</div>
        </Link>
      </div>
    </div>
  );
}

export default AccountBanner;
