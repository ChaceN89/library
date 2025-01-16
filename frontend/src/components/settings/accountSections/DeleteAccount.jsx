/**
 * @file DeleteAccount.jsx
 * @module DeleteAccount
 * @description 
 *   Component for allowing users to delete their account with a two-step confirmation process. 
 *   Includes API calls for deletion and triggers profile reload upon success.
 *
 * @requires React
 * @requires useState - React hook for managing confirmation steps.
 * @requires deleteAccount - API function to delete the user's account.
 * @requires logout - Function to log the user out after account deletion.
 * @requires toast - Library for displaying success/error notifications.
 *
 * @component
 * @param {string} userID - Unique identifier of the user to be deleted.
 * @param {Function} triggerProfileReload - Function to refresh the profile context.
 *
 * @example
 * // Render the DeleteAccount component:
 * <DeleteAccount userID="123" triggerProfileReload={refreshProfile} />
 * 
 * @exports DeleteAccount
 * @author Chace Nielson
 * @created 2025-01-16
 */

import React, { useState } from "react";
import { deleteAccount } from "@/API/deleteAccountAPI";
import { toast } from "react-hot-toast";
import { logout } from "@/API/authAPI";

function DeleteAccount({ userID, triggerProfileReload }) {
  const [confirmationStep, setConfirmationStep] = useState(0); // Track the confirmation step
  
  const handleDelete = async () => {
    try {
      await deleteAccount(userID);
      toast.success("Account deleted successfully");
      logout()
      triggerProfileReload(); // Reload profile context after account deletion
    } catch (error) {
      toast.error(error.message || "Failed to delete account");
    }
  };

  return (
    <div className="mt-6">
      <button
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={() => setConfirmationStep(1)}
      >
        Delete Account
      </button>

      {/* First Confirmation Dialog */}
      {confirmationStep === 1 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-black border-2 border-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 ">Are you sure?</h2>
            <p className="mb-4">
              This action cannot be undone. Do you really want to delete your account?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setConfirmationStep(0)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setConfirmationStep(2)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Confirmation Dialog */}
      {confirmationStep === 2 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-black border-2 border-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Final Confirmation</h2>
            <p className=" mb-4">
              This is your last chance. Are you absolutely sure you want to delete your account?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-500  px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setConfirmationStep(0)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500  px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
