/**
 * @file LoginForm.jsx
 * @module LoginForm
 * @description 
 *   A reusable login form component supporting standard login and Google Sign-In. 
 *   Can be used as a standalone page or as a popup/modal.
 *
 * @author Chace
 * @created 2025-01-11
 * @updated 2025-01-11
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import GoogleSignIn from "@/components/auth/GoogleSignIn"; // Google Sign-In component
import { getLoginCredentials } from "@/API/authAPI"; // Login API
import { useProfileContext } from "@/context/ProfileContext"; // Profile context for user data
import Image from "next/image"; // Optimized image component
import { authData } from "@/data/authData"; // Authentication-related static assets
import InputField from "@/components/auth/InputField"; // Reusable input field
import SubmitButton from "@/components/auth/SubmitButton"; // Reusable submit button
import ErrorLoading from "@/components/loading/ErrorLoading"; // Error display component
import LoadingWheel from "@/components/loading/LoadingWheel"; // Loading wheel component

/**
 * LoginForm Component
 * @param {boolean} isPopup - If true, the form will render as a popup/modal.
 * @param {Function} onClose - Function to close the popup, required if `isPopup` is true.
 * @param {string} reRouteTo - Route to redirect after successful login (default is `/`).
 * @returns {JSX.Element} A reusable login form component.
 */
function LoginForm({ isPopup = false, onClose = null, reRouteTo = "/" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); // Error state
  const [errorMsg, setErrorMsg] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter(); // Initialize Next.js router
  const { triggerProfileReload, isLoggedIn } = useProfileContext(); // Access context

  // Redirect to the specified route if already logged in
  if (isLoggedIn) {
    router.push(reRouteTo);
    return null; // Prevent rendering the login form after redirection
  }

  // Handles standard login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false); // Reset error state
    setErrorMsg(""); // Clear error message
    setLoading(true); // Start loading

    try {
      await getLoginCredentials(username, password); // Authenticate
      triggerProfileReload(); // Reload profile
      router.push(reRouteTo); // Redirect to the specified route
    } catch (err) {
      setError(true);
      setErrorMsg(err.message || "An unknown error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Successful login handler for Google Sign-In
  const SuccessfulLogin = () => {
    setError(false);
    setErrorMsg("");
    triggerProfileReload();
    router.push(reRouteTo);
  };

  // Login failure handler for Google Sign-In
  const LoginFailure = (error) => {
    setError(true);
    setErrorMsg(error?.message || "Google sign-in failed. Please try again.");
  };

  return (
    <div
      className={`flex items-center justify-center ${
        isPopup ? "fixed inset-0 bg-black bg-opacity-50 z-50" : "min-h-screen"
      }`}
    >
      <form
        onSubmit={handleLogin}
        className={`flex flex-col gap-4 card-background w-80 md:w-96 ${
          isPopup ? "relative p-6 rounded-lg shadow-lg" : ""
        }`}
      >
        <h2 className="font-bold text-center">Login</h2>

        {/* Username Field */}
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password Field */}
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <SubmitButton label="Login" disabled={loading} />

        <hr className="border-2 my-2" />

        {/* Google Sign-In */}
        <GoogleSignIn successLogin={SuccessfulLogin} loginFailure={LoginFailure} />

        {/* Image/Error/Loading */}
        <div className="flex justify-center mt-4 h-40">
          {loading ? (
            <LoadingWheel />
          ) : error ? (
            <ErrorLoading message={errorMsg} />
          ) : (
            <Image
              src={authData.authImg}
              alt="Library Fox Mascot"
              width={120}
              height={150}
            />
          )}
        </div>

        {/* Close Button for Popup */}
        {isPopup && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
