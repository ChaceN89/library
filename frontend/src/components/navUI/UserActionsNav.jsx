"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

import NavDropdown from "./NavDropdown";
import NavButton from "./NavButton";
import UserProfileNav from "./UserProfileNav"; // Import the new component
import { useProfileContext } from "@/context/ProfileContext"; // Import the ProfileContext
import { navData } from "@/data/navData";

const UserActionsNav = ({ popUp = false }) => {
  const { handleLogout, triggerProfileReload } = useProfileContext(); // Access user data and logout from the ProfileContext
  const router = useRouter(); // Initialize the router

  const [userData, setUserData] = useState(null);

  const navLogout =()=>{
    handleLogout()
    router.push(navData.logoLink); // Redirect to the home page

  }


  useEffect(() => {
    // Only run this on the client side
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData); // Set user data if available
  }, [triggerProfileReload]);

  // Add a handleLogout action to the dropdown item with a logout key=true
  const updatedDropdownItems = navData.userDropdownItems.map((item) =>
    item.logoutAction ? { ...item, action: navLogout } : item
  );


  return (
    <div className={`nav-actions ${popUp && "lg:hidden"}`}>
      {userData ? (
        <>
          {/* User profile and dropdown for logged-in users */}
          <UserProfileNav
            username={userData?.username}
            profilePic={userData?.profile_image_url}
          />
          <NavDropdown items={updatedDropdownItems} />
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
