"use client";
import React, { useEffect, useState } from "react";
import NavDropdown from "./NavDropdown";
import NavButton from "./NavButton";
import UserProfileNav from "./UserProfileNav"; // Import the new component
import { useProfileContext } from "@/context/ProfileContext"; // Import the ProfileContext
import { navData } from "@/data/navData";

const UserActionsNav = ({ popUp = false }) => {
  const { userData, isLoggedIn, handleLogout } = useProfileContext(); // Access user data and logout from the ProfileContext
  const [dropDownItems, setDropDownItems] = useState(navData.userDropdownItems);

  // Update dropdown items to include the logout action dynamically
  useEffect(() => {
    if (isLoggedIn) {
      const updatedItems = navData.userDropdownItems.map((item) =>
        item.logoutAction ? { ...item, action: handleLogout } : item
      );
      setDropDownItems(updatedItems);
    } else {
      setDropDownItems([]); // If not logged in don't bother filling the list
    }
  }, [isLoggedIn, handleLogout]);

  return (
    <div className={`nav-actions ${popUp && "lg:hidden"}`}>
      {isLoggedIn ? (
        <>
          {/* User profile and dropdown for logged-in users */}
          <UserProfileNav username={userData.username} profilePic={userData.profile_image_url} />
          <NavDropdown items={dropDownItems} />
        </>
      ) : (
        // Render buttons for non-logged-in users
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
