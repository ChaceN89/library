"use client";
import React from 'react';
import { FaCogs, FaUpload, FaBook, FaHeart, FaSignOutAlt } from 'react-icons/fa';  // Importing icons
import NavDropdown from './NavDropdown';
import NavButton from './NavButton';
import UserProfileNav from './UserProfileNav';  // Import the new component
import { logout } from '@/API/authAPI';
import { useProfileContext } from '@/context/ProfileContext';  // Import the ProfileContext

const UserActionsNav = () => {

  return(

    <div>User Action Items</div>
  )
  

  const { userData } = useProfileContext();  // Access user data from the ProfileContext

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const dropdownItems = [
    { label: 'My Books', href: '/my-books', icon: <FaBook /> },
    { label: 'Favorites', href: '/favorites', icon: <FaHeart /> },
    { label: 'Upload', href: '/upload', icon: <FaUpload /> },
    { label: 'Settings', href: '/settings', icon: <FaCogs /> },
    { label: 'Sign Out', action: handleLogout, icon: <FaSignOutAlt /> }
  ];

  return (
    <div className="flex items-center gap-3">
      {userData ? (
        <>
          {/* Use the new UserProfileNav component */}
          <UserProfileNav username={userData.username} profilePic={userData.profile_image_url} />
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
