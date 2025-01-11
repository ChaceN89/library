/**
 * @file UserProfileNav.jsx
 * @module UserProfileNav
 * @description 
 *   Displays the user's profile picture and username as a link to the settings page. 
 *   Truncates long usernames for better visual presentation.
 *
 * @example
 *   <UserProfileNav 
 *     username="JohnDoe123" 
 *     profilePic="https://example.com/profile.jpg" 
 *   />
 *
 * @props
 *   {string} username - The user's display name.
 *   {string} profilePic - The URL of the user's profile picture.
 * 
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

import React from "react";
import Link from "next/link"; // Link for navigation
import Image from "next/image"; // Image for optimized rendering
import { navData } from "@/data/navData";

const UserProfileNav = ({ username, profilePic }) => {
  // Maximum length for displaying the username
  const maxLen = 30;

  // Truncate the username if it exceeds the maximum length
  const truncatedUsername =
    username.length > maxLen ? `${username.substring(0, maxLen - 3)}...` : username;

  return (
    <Link href="/settings" className="hover:underline">
      <div className="flex items-center gap-2">
        {/* Profile picture */}
        <div className="relative w-10 h-10">
          <Image
            src={profilePic || navData.defaultImg} // Default image if profilePic is unavailable
            alt="Profile"
            fill // Fill the container
            sizes="(max-width: 768px) 40px, (max-width: 1200px) 48px, 64px" // Responsive sizes
            className="rounded-full object-cover"
          />
        </div>

        {/* Username */}
        <span className="break-words hyphens-auto max-w-40 lg:max-w-56 xl:max-w-72">
          {truncatedUsername}
        </span>
      </div>
    </Link>
  );
};

export default UserProfileNav;
