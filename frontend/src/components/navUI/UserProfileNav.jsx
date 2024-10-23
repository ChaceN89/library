// checks if the refresh token is expired and logs out the user if it is

import React, { useEffect } from 'react';
import { checkRefreshToken } from '@/API/tokenFetch';  // Check refresh token validity
import { logout } from '@/API/auth';  // Logout function

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

  return (
    <div className="flex items-center gap-3">
      <img
        src={profilePic || 'https://library-app-data.s3.ca-west-1.amazonaws.com/misc/defaultProfilePic.jpg'}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default UserProfileNav;
