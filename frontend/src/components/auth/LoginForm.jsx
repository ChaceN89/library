/**
 * @file LoginForm.jsx
 * @module LoginForm
 * @description 
 *   A reusable login form component supporting standard login and Google Sign-In. 
 *   Can be used as a standalone page or as a popup/modal.
 *
 * @author Chace
 * @created 2025-01-11
 * @updated 2025-01-13
 */

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import GoogleSignIn from "@/components/auth/GoogleSignIn"; // Google Sign-In component
import { getLoginCredentials } from "@/API/authAPI"; // Login API
import { useProfileContext } from "@/context/ProfileContext"; // Profile context for user data
import Image from "next/image"; // Optimized image component
import { authData } from "@/data/authData"; // Authentication-related static assets
import InputField from "@/components/general/inputs/InputField"; // Reusable input field
import SubmitButton from "@/components/general/inputs/SubmitButton"; // Reusable submit button
import ErrorLoading from "@/components/loading/ErrorLoading"; // Error display component
import LoadingWheel from "@/components/loading/LoadingWheel"; // Loading wheel component
import { FaTimes } from "react-icons/fa";
import Link from 'next/link';  // Import Link for navigation

/**
 * LoginForm Component
 * @param {boolean} isPopup - If true, the form will render as a popup/modal.
 * @param {Function} onClose - Function to close the popup, required if `isPopup` is true.
 * @param {string} reRouteTo - Route to redirect after successful login (default is `/`).
 * @returns {JSX.Element} A reusable login form component.
 */
function LoginForm({ isPopup = false, onClose = null, reRouteTo = "/", showRegisterLink = true, onSuccess=null }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { triggerProfileReload, isLoggedIn } = useProfileContext();

  if (isLoggedIn ) {

    if (reRouteTo != null){
      router.push(reRouteTo);
    }else if(isPopup){
      onClose()
    }
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMsg("");
    setLoading(true);

    try {
      await getLoginCredentials(username, password);
      triggerProfileReload();
      onSuccess()
    } catch (err) {
      setError(true);
      setErrorMsg(err.message || "An unknown error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-full flex-grow ${
        isPopup && "fixed inset-0 bg-black dark:bg-white dark:bg-opacity-50 bg-opacity-50 z-50 flex justify-center items-center"
      }`}
    >
      <form
        onSubmit={handleLogin}
        className={`flex flex-col gap-4 card-background p-6 w-80 md:w-96 ${
          isPopup && "relative border-2"
        }`}
      >
        <h2 className="font-bold text-center">Login</h2>

        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading} // Disable when loading
          required
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading} // Disable when loading
          required
        />

        <SubmitButton
          label={loading ? "Logging In..." : "Login"}
          disabled={loading}
        />

        <hr className="border-2 my-1" />

        <GoogleSignIn
          setLoading={setLoading}
          successLogin={() => {
            triggerProfileReload();
          }}
          loginFailure={(error) => {
            setError(true);
            setErrorMsg(error.message || "Google sign-in failed. Please try again.");
          }}
        />

        {showRegisterLink && (
          <>
            <hr className="border-2 my-1" />
            <Link
              href="/auth/sign-up"
              className="w-full flex justify-center text-blue-800 hover:underline"
            >
              New here? Sign up to get started!
            </Link>
          </>
        )}

        <div className="flex justify-center mt-4 h-40">
          {loading ? (
            <LoadingWheel />
          ) : error ? (
            <ErrorLoading message={errorMsg} />
          ) : (
            <div className="relative w-32 h-40">
              <Image
                src={authData.authImg}
                alt="Library Fox Mascot"
                fill // Use the fill layout
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }} // Use CSS for object fit
              />
            </div>
          )}
        </div>

        {isPopup && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 text-secondary dark:text-primary hover:text-accent dark:hover:text-accent"
          >
            <FaTimes size={24} />
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
