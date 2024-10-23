"use client";
import React, { useState, useEffect } from 'react';
import NavDropdown from './NavDropdown';
import NavButton from './NavButton';
import UserProfileNav from './UserProfileNav';  // Import the new component
import { logout } from '@/API/auth';

const UserActionsNav = () => {
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.user) {
      setUsername(authData.user.username);
      setProfilePic(authData.user.profile_image_url);
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
          {/* Use the new UserProfileNav component */}
          <UserProfileNav username={username} profilePic={profilePic} />
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
