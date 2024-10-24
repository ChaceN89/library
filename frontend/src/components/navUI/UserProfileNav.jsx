import React, { useEffect } from 'react';
import { checkRefreshToken } from '@/API/tokenFetchAPI';  // Check refresh token validity
import { logout } from '@/API/authAPI';  // Logout function
import Link from 'next/link';  // Import Link for navigation

const UserProfileNav = ({ username, profilePic }) => {
  useEffect(() => {
    const checkTokenStatus = async () => {
      if (checkRefreshToken()) {  // If the refresh token is expired
        await handleLogout();
      }
    };

    checkTokenStatus();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.reload();  // Optionally reload to force a UI update
  };

  const truncatedUsername = username.length > 40 ? `${username.substring(0, 10)}...` : username;


  return (
    <Link href="/settings" className="hover:underline">
      <div className="flex items-center gap-2">
        <img
          src={profilePic || 'https://library-app-data.s3.ca-west-1.amazonaws.com/misc/defaultProfilePic.jpg'}
          alt="Profile"
          className="w-10 h-10 rounded-full"
          />
          {truncatedUsername}
      </div>
    </Link>
  );
};

export default UserProfileNav;
