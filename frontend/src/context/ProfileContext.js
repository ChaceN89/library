"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const ProfileContext = createContext();

// Export the context provider
export const ProfileProvider = ({ children }) => {
  const [shouldReloadProfile, setShouldReloadProfile] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Load tokens and user data when the component mounts
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    if (storedUserData) setUserData(storedUserData);
  }, [shouldReloadProfile]);

  // Function to trigger the profile reload
  const triggerProfileReload = () => {
    setShouldReloadProfile((prev) => !prev);
  };

  const isLoggedIn = !!accessToken; // Boolean check for logged-in status

  return (
    <ProfileContext.Provider
      value={{
        shouldReloadProfile,
        triggerProfileReload,
        accessToken,
        refreshToken,
        userData,
        setAccessToken,
        setRefreshToken,
        setUserData,
        isLoggedIn,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the ProfileContext
export const useProfileContext = () => {
  return useContext(ProfileContext);
};
