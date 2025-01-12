/**
 * @file UserActionsNav.jsx
 * @module UserActionsNav
 * @description 
 *   Handles user-specific actions in the navigation bar. Displays a user profile 
 *   and dropdown menu for logged-in users, and sign-in/sign-up buttons for guests.
 *   Supports dynamic logout functionality with navigation redirection.
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NavDropdown from "./NavDropdown";
import NavButton from "./NavButton";
import UserProfileNav from "./UserProfileNav";
import { useProfileContext } from "@/context/ProfileContext"; // Access ProfileContext
import { navData } from "@/data/navData";

const UserActionsNav = ({ popUp = false }) => {
  const { handleLogout, userData, isLoading } = useProfileContext(); // Access logout, userData, and loading state
  const router = useRouter();

  /**
   * Logout Function:
   * - Logs the user out and redirects to the home page.
   */
  const navLogout = () => {
    handleLogout();
    router.push(navData.logoLink); // Redirect to the home page
  };

  /**
   * Update dropdown items:
   * - Adds a logout action to the dropdown item if `logoutAction` is true.
   */
  const updatedDropdownItems = navData.userDropdownItems.map((item) =>
    item.logoutAction ? { ...item, action: navLogout } : item
  );

  // Render a placeholder or nothing while user data is loading
  if (isLoading) {
    return null
  }

  return (
    <div className={`nav-actions ${popUp && "lg:hidden"}`}>
      {userData ? (
        <>
          {/* Display user profile and dropdown for logged-in users */}
          <UserProfileNav
            username={userData?.username}
            profilePic={userData?.profile_image_url}
          />
          <NavDropdown items={updatedDropdownItems} />
        </>
      ) : (
        // Render sign-in and sign-up buttons for non-logged-in users
        navData.noUserItems.map((item) => (
          <NavButton
            key={item.label}
            href={item.href}
            label={item.label}
            Icon={item.icon}
          />
        ))
      )}
    </div>
  );
};

export default UserActionsNav;
