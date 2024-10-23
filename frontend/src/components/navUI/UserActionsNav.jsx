// src/components/navUI/UserActionsNav.jsx
"use client";
import React, { useState, useEffect } from 'react';
import NavDropdown from './NavDropdown';
import NavButton from './NavButton';
import { logout } from '@/API/auth';

const UserActionsNav = () => {
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
      setProfilePic(user.profile_image_url);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const dropdownItems = [
    { label: 'Settings', href: '/settings' },
    { label: 'Upload Book', href: '/upload' },
    { label: 'My Books', href: '/my-books' },
    { label: 'Favorites', href: '/favorites' },
    { label: 'Sign Out', action: handleLogout }
  ];

  return (
    <div className="flex items-center gap-3">
      {username ? (
        <>
          <img 
            src={profilePic || 'https://library-app-data.s3.ca-west-1.amazonaws.com/misc/defaultProfilePic.jpg'} 
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <p>Welcome, {username}!</p>
          <NavDropdown items={dropdownItems} />
        </>
      ) : (
        <div className="flex gap-3">
          <NavButton href="/auth/sign-in" label="Sign In" />
          <NavButton href="/auth/sign-up" label="Sign Up" />
          <NavButton href="/settings" label="Settings" />
        </div>
      )}
    </div>
  );
};

export default UserActionsNav;
