/**
 * @file EditProfilePic.jsx
 * @module EditProfilePic
 * @description 
 *   Component for allowing users to update their profile picture. Includes image preview, 
 *   file upload input, and confirmation/cancellation buttons. Updates the profile image via API.
 *
 * @requires React
 * @requires useState - React hook for managing state.
 * @requires useProfileContext - Hook for accessing profile-related context.
 * @requires toast - Notification library for providing user feedback.
 * @requires ImageInputField - Reusable component for image uploads with preview.
 * @requires editProfilePicture - API function for updating profile picture on the backend.
 * @requires getUserProfileForLocalStorage - API function to refresh and save user profile data.
 *
 * @component EditProfilePic
 *
 * @example
 * // Render the EditProfilePic component:
 * import EditProfilePic from "@/components/settings/EditProfilePic";
 *
 * export default function App() {
 *   return <EditProfilePic profileImageUrl="/path/to/image.jpg" />;
 * }
 *
 * @exports EditProfilePic
*/
"use client";
import React, { useState } from "react";
import { editProfilePicture } from "@/API/editProfileAPI";
import { getUserProfileForLocalStorage } from "@/API/getProfileAPI";
import { useProfileContext } from "@/context/ProfileContext"; // Import ProfileContext
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
import ImageInputField from "../general/inputs/ImageInputField"; // Import the reusable ImageInputField

function EditProfilePic({ profileImageUrl }) {
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { triggerProfileReload } = useProfileContext(); // Access triggerProfileReload from context

  /**
   * Handles file selection and shows the confirmation buttons.
   * @param {Event} e - Input change event.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);
    setShowConfirm(true); // Show confirmation when a file is selected
  };

  /**
   * Handles the confirmation to update the profile picture.
   */
  const handleConfirm = async () => {
    if (newProfileImage) {
      const formData = new FormData();
      formData.append("profile_image", newProfileImage);

      const loadingToast = toast.loading("Updating profile picture...");

      try {
        // Update the profile picture in the backend
        await editProfilePicture(formData);

        // Fetch the updated profile and store in localStorage
        await getUserProfileForLocalStorage();

        // Trigger a reload of the profile context
        triggerProfileReload();

        toast.success("Profile picture updated successfully!", { id: loadingToast });
      } catch (error) {
        toast.error(error.message || "Failed to update profile picture.", { id: loadingToast });
      } finally {
        toast.dismiss(loadingToast); // Ensure toast is dismissed even if an error occurs
      }
    }
    setShowConfirm(false);
  };

  /**
   * Handles cancelation of the file selection.
   */
  const handleCancel = () => {
    setNewProfileImage(null);
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Image Input with Preview */}
      <ImageInputField
        label="Profile Picture"
        name="profile_image"
        onChange={handleFileChange}
        accepted_files="image/*"
        rounded="rounded-full"
        previewImg={profileImageUrl}
      />

      {/* Confirmation Buttons */}
      {showConfirm && (
        <div className="flex gap-4">
          <button
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default EditProfilePic;
