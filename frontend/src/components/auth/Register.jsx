"use client";

/**
 * @file Register.jsx
 * @module Register
 * @description
 *   This component renders a registration form for creating a user account.
 *   It allows users to enter details such as username, name, email, password, and an optional profile image.
 *   The form validates required fields and supports image previews for the profile image.
 *   Additionally, it includes a popup login form for users who already have an account.
 *   Errors during form submission are handled and displayed using the ErrorLoading component.
 *
 * @requires react
 * @requires useState from React
 * @requires InputField from "@/components/auth/InputField"
 * @requires SubmitButton from "@/components/auth/SubmitButton"
 * @requires ImageInputField from "@/components/auth/ImageInputField"
 * @requires createAccount from "@/API/authAPI"
 * @requires toast from "react-hot-toast"
 * @requires LoginForm from "@/components/auth/LoginForm"
 * @requires ErrorLoading from "@/components/loading/ErrorLoading"
 */

import React, { useState } from "react";
import InputField from "@/components/auth/InputField";
import SubmitButton from "@/components/auth/SubmitButton";
import ImageInputField from "@/components/auth/ImageInputField";
import { createAccount } from "@/API/authAPI";
import { toast } from "react-hot-toast";
import LoginForm from "@/components/auth/LoginForm";
import ErrorLoading from "@/components/loading/ErrorLoading";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Error message state

  /**
   * Handle profile image change and set the selected file.
   * @param {Event} e - File input change event.
   */
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  /**
   * Handle error messages from the server and format them as HTML.
   * @param {string | string[]} error - Error message from the server.
   * @returns {JSX.Element} - Formatted error message for display.
   */
  const formatErrorMessage = (error) => {
    if (typeof error === "string") {
      // Check if the string is formatted as an array-like error
      if (error.startsWith("[") && error.endsWith("]")) {
        // Remove the brackets and split by commas
        const errorList = error
          .slice(1, -1) // Remove the surrounding brackets
          .split(",") // Split by commas
          .map((err) => err.trim().replace(/^['"]|['"]$/g, "")); // Trim spaces and remove quotes
  
        return (
          <div className="text-left">
            <ul className="list-disc pl-5 text-red-600 text-left">
              {errorList.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        );
      }
  
      // Handle single error message as a string
      return <p className="text-red-600">{error}</p>;
    }
  
    return null; // Default to null if no valid error
  };
  

  /**
   * Handle form submission, including form validation and error handling.
   * @param {Event} e - Form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", username);
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("email", email);
    data.append("password", password);
    if (profileImage) {
      data.append("profile_image", profileImage);
    }

    try {
      await createAccount(data);
      toast.success("Account created successfully!");
      setErrorMessage(null); // Clear any previous error messages
    } catch (error) {
      const errorResponse = error.response?.data?.errors || error.message;
      setErrorMessage(formatErrorMessage(errorResponse)); // Set formatted error message
    }
  };

  return (
    <>
      {showLoginPopup && (
        <LoginForm
          showRegisterLink={false}
          isPopup={true}
          onClose={() => setShowLoginPopup(false)}
        />
      )}

      <div className="card-background p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              type="text"
              name="first_name"
              placeholder="First Name (Optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              type="text"
              name="last_name"
              placeholder="Last Name (Optional)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <ImageInputField
            label="Profile Image (Optional):"
            name="profile_image"
            onChange={handleImageChange}
          />

          <SubmitButton label="Create Account" />

          {errorMessage && <ErrorLoading message={errorMessage} />}

          <div className="w-full flex justify-center text-blue-500 hover:underline">
            <button type="button" onClick={() => setShowLoginPopup(true)}>
              Already have an account? Log in here.
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
