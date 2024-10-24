"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ProfileContext = createContext();

// Export the context provider
export const ProfileProvider = ({ children }) => {
  // Initialize state directly from localStorage to avoid flicker
  const [shouldReloadProfile, setShouldReloadProfile] = useState(false);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));
  const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  // Reload tokens and user data when the component mounts or when shouldReloadProfile changes
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    if (storedUserData) setUserData(storedUserData);
  }, [shouldReloadProfile]);

  // Function to trigger the profile reload
  const triggerProfileReload = () => {
    setShouldReloadProfile((prev) => !prev);
  };

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
        setUserData
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
