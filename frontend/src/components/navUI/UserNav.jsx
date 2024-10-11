"use client";
import React, { useState, useEffect } from 'react';
import { logout } from '@/API/auth';

const UserNav = () => {
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Fetch user data from session storage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username); // Set username from session storage
      setProfilePic(user.profile_image_url); // Set profile image URL from session storage
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    alert('You have been logged out');
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {username ? (
          <>
            <img 
              src={profilePic || 'https://library-app-data.s3.ca-west-1.amazonaws.com/misc/defaultProfilePic.jpg'} 
              alt="Profile"
              className="w-10 h-10 rounded-full" // Adjust the size and style as needed
            />
            <p>Welcome, {username}!</p>
          </>
        ) : (
          <p>Please log in</p>
        )}
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserNav;
