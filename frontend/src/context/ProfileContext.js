/**
 * Filename: ProfileContext.js
 * Author: Chace Nielson
 * Date Created: January 11, 2025
 * Last Updated: January 11, 2025
 * Description:
 *   Provides a context for managing user profile data, including authentication tokens 
 *   and user information. It enables profile updates and handles logout functionality.
 * Dependencies:
 *   - React: For creating the context and managing state.
 *   - "@/API/authAPI": API module for handling logout functionality.
 * Usage:
 *   Wrap the application with <ProfileProvider> to enable context usage.
 *   Use `useProfileContext()` to access or modify profile-related data and functions.
 */

"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { logout as authLogout } from "@/API/authAPI";

// Create the ProfileContext
const ProfileContext = createContext();

// ProfileContext Provider Component
export const ProfileProvider = ({ children }) => {
  // State variables for profile and authentication data
  const [shouldReloadProfile, setShouldReloadProfile] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Load tokens and user data from localStorage when the component mounts
  useEffect(() => {
    const fetchProfileData = () => {
      setIsLoading(true); // Start loading

      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedUserData = JSON.parse(localStorage.getItem("user"));

      if (storedAccessToken) setAccessToken(storedAccessToken);
      if (storedRefreshToken) setRefreshToken(storedRefreshToken);
      if (storedUserData) setUserData(storedUserData);

      setIsLoading(false); // Stop loading after fetching data
    };

    fetchProfileData();
  }, [shouldReloadProfile]); // Triggered when `shouldReloadProfile` changes

  /**
   * Function to manually trigger profile reload.
   * This can be used to sync state with updated localStorage data.
   */
  const triggerProfileReload = () => {
    setShouldReloadProfile((prev) => !prev);
  };

  // Determine if the user is currently logged in
  const isLoggedIn = !!accessToken;

  /**
   * Logout Function:
   * - Calls the API to clear server-side tokens.
   * - Clears localStorage and resets context state.
   * - Triggers a UI update by reloading the profile.
   */
  const handleLogout = async () => {
    await authLogout(); // Call the API to handle logout
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);
    triggerProfileReload(); // Update components reliant on profile data
  };

  return (
    <ProfileContext.Provider
      value={{
        shouldReloadProfile,       // State for triggering profile reload
        triggerProfileReload,      // Function to reload profile data
        accessToken,               // User's access token
        refreshToken,              // User's refresh token
        userData,                  // User profile information
        setAccessToken,            // Function to update access token
        setRefreshToken,           // Function to update refresh token
        setUserData,               // Function to update user data
        isLoggedIn,                // Boolean flag for login status
        handleLogout,              // Function to handle logout
        isLoading,                 // Loading state for UI
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

/**
 * Custom Hook:
 * - Provides easy access to ProfileContext.
 * - Use within any child component of <ProfileProvider>.
 */
export const useProfileContext = () => {
  return useContext(ProfileContext);
};
