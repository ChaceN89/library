/**
 * @file Settings.jsx
 * @module Settings
 * @description 
 *   Component for rendering the settings page content, including the account banner, 
 *   dark mode toggle, and link to the admin page if the user has admin privileges.
 *
 * @requires React
 * @requires useProfileContext - Hook to access user profile information.
 * @requires AccountBanner - Component displaying user account details.
 * @requires DarkModeButton - Component for toggling between dark and light modes.
 * @requires LinkToAdminPage - Component for navigating to the admin page (conditional rendering).
 *
 * @component Settings
 *
 * @example
 * // Render the Settings component:
 * import Settings from "@/components/settings/Settings";
 *
 * export default function App() {
 *   return <Settings />;
 * }
 *
 * @exports Settings
 * @author Chace Nielson
 * @created 2025-01-16
 * @updated 2025-01-16
 */

"use client";

import React, { useEffect } from "react";
import AccountBanner from "./AccountBanner";
import DarkModeButton from "./DarkModeButton";
import LinkToAdminPage from "../admin/LinkToAdminPage";
import { useProfileContext } from "@/context/ProfileContext";
import { useRouter } from "next/navigation";

function Settings() {
  const { isLoggedIn, isLoading } = useProfileContext(); // Assuming isLoading exists in ProfileContext
  const router = useRouter();

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

  // Render settings page if logged in
  return (
    <div className="my-2 p-2 card-background">
      <h1 className="text-2xl font-bold text-center mb-6">Account Settings</h1>
      <div className="space-y-6">
        <AccountBanner />
        <DarkModeButton />
        <LinkToAdminPage />
      </div>
    </div>
  );
}

export default Settings;
