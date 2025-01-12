/**
 * @file GoogleSignIn.jsx
 * @module GoogleSignIn
 * @description 
 *   A reusable component for handling Google Sign-In functionality using the 
 *   `@react-oauth/google` library. This component integrates with a backend API 
 *   to authenticate users and triggers callback functions for success and failure events.
 * 
 * @param {function} successLogin - Callback function executed after a successful login.
 * @param {function} loginFailure - Callback function executed when login fails.
 * 
 * @example
 * // Example usage of GoogleSignIn component:
 * <GoogleSignIn 
 *   successLogin={() => console.log("Login successful!")}
 *   loginFailure={(error) => console.error("Login failed:", error)}
 * />
 * 
 * @requires react
 * @requires @react-oauth/google
 * @requires @/API/googleAPI
 * @requires prop-types
 * 
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-11
 */

import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "@/API/googleAPI"; // Correctly import the API function
import PropTypes from "prop-types";

/**
 * GoogleSignIn Component
 * 
 * Handles Google Sign-In functionality using the `@react-oauth/google` library.
 * Calls appropriate handlers for success and failure scenarios.
 * 
 * @param {function} successLogin - Function to handle successful login actions.
 * @param {function} loginFailure - Function to handle login failure actions.
 */
export default function GoogleSignIn({ setLoading, successLogin, loginFailure }) {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Login Success:", credentialResponse);

    setLoading(true); // Start loading

    try {
      // Pass the credential to your backend API for authentication
      await loginWithGoogle(credentialResponse.credential);

      // Trigger success login actions
      await successLogin();
    } catch (error) {
      console.error("Google login failed:", error.message);

      // Pass the error to the failure handler
      await loginFailure(error);
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    loginFailure(error); // Call the failure handler
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
}
