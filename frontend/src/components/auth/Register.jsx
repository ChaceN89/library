"use client";

/**
 * @file Register.jsx
 * @module Register
 * @description
 *   This component renders a registration form for creating a user account.
 *   It allows users to enter details such as username, name, email, password, and an optional profile image.
 *   The form validates required fields and supports image previews for the profile image.
 *   Additionally, it includes a popup login form for users who already have an account.
 *
 * @requires react
 * @requires useState from React
 * @requires InputField from "@/components/auth/InputField"
 * @requires SubmitButton from "@/components/auth/SubmitButton"
 * @requires ImageInputField from "@/components/auth/ImageInputField"
 * @requires createAccount from "@/API/authAPI"
 * @requires toast from "react-hot-toast"
 * @requires LoginForm from "@/components/auth/LoginForm"
 *
 * @example
 * // Example usage of the Register component:
 * import Register from "@/components/auth/Register";
 * 
 * export default function RegisterPage() {
 *   return <Register />;
 * }
 *
 * @notes
 * - Form submissions are handled via `handleSubmit`, which sends the data to the backend.
 * - Image uploads are managed using the `ImageInputField` component, which supports previewing the selected image.
 * - The "Already have an account?" button triggers the `LoginForm` component as a popup modal.
 * - Error and success messages are displayed using `react-hot-toast`.
 *
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-11
 */

import React, { useState } from "react";
import InputField from "@/components/auth/InputField";
import SubmitButton from "@/components/auth/SubmitButton";
import ImageInputField from "@/components/auth/ImageInputField";
import { createAccount } from "@/API/authAPI";
import { toast } from "react-hot-toast";
import LoginForm from "@/components/auth/LoginForm";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

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
    } catch (error) {
      toast.error(error.message);
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
