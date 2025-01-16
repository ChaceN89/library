/**
 * @file AccountSettings.jsx
 * @module AccountSettings
 * @description 
 *   Main component for managing account settings, including sections for username, 
 *   name, email, password updates, and account deletion. Handles profile reloading and authentication checks.
 *
 * @requires React
 * @requires useEffect - React hook for managing side effects.
 * @requires useState - React hook for managing state.
 * @requires useProfileContext - Context for accessing profile-related data and functions.
 * @requires getUserProfileForLocalStorage - Function to refresh and save user profile data in localStorage.
 * @requires DeleteAccount - Component for handling account deletion.
 * @requires UsernameSection, NameSection, EmailSection, PasswordSection - Sub-components for managing user settings.
 *
 * @component
 * @example
 * // Usage of AccountSettings:
 * <AccountSettings />
 * 
 * @exports AccountSettings
 * @author Chace Nielson
 * @created 2025-01-16
 */

"use client";
import React, { useEffect, useState } from "react";
import { useProfileContext } from "@/context/ProfileContext";
import { getUserProfileForLocalStorage } from "@/API/getProfileAPI";
import Link from "next/link";
import DeleteAccount from "./accountSections/DeleteAccount";
import UsernameSection from "./accountSections/UsernameSection";
import NameSection from "./accountSections/NameSection";
import EmailSection from "./accountSections/EmailSection";
import PasswordSection from "./accountSections/PasswordSection";
import { useRouter } from "next/navigation";

function AccountSettings() {
  const { userData, triggerProfileReload, isLoggedIn, isLoading } = useProfileContext();
  const [editField, setEditField] = useState(null); // Track the field being edited

  const router = useRouter();


  const handleReload = async () => {
    await getUserProfileForLocalStorage();
    triggerProfileReload();
  };

   useEffect(() => {
      // Ensure this runs only on the client
      if (typeof window !== "undefined" && !isLoading && !isLoggedIn) {
        router.push("/auth/sign-in"); // Redirect to login if not logged in
      }
    }, [isLoggedIn, isLoading, router]);
  
    // Show a loader or placeholder while waiting for the state to resolve
    if (isLoading) {
      return (
        <div className="p-6 text-center">
          <p>Loading...</p>
        </div>
      );
    }

  return (
    <div className="my-2 p-2 card-background">
      <div className="space-y-6 p-4">

        {/* Username Section */}
        <UsernameSection
          userData={userData}
          editField={editField}
          setEditField={setEditField}
          onUpdate={handleReload}
        />

        {/* First and Last Name Section */}
        <NameSection
          userData={userData}
          editField={editField}
          setEditField={setEditField}
          onUpdate={handleReload}
        />

        {/* Email Section */}
        <EmailSection
          userData={userData}
          editField={editField}
          setEditField={setEditField}
          onUpdate={handleReload}
        />

        {/* Password Section */}
        <PasswordSection
          editField={editField}
          setEditField={setEditField}
        />

        {/* Delete Account Section */}
        {userData && (
          <DeleteAccount
            userID={userData.id}
            triggerProfileReload={triggerProfileReload}
          />
        )}

        {/* Back button */}
        <div className="mt-6">
          <Link href="/settings">
            <div className="text-blue-500 hover:underline">← Back to Settings</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
