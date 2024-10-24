"use client";
import React, { useState } from 'react';
import { editProfile, getUserProfileForLocalStorage } from '@/API/editProfileAPI';
import { useProfileContext } from '@/context/ProfileContext';  // Import ProfileContext
import { toast } from 'react-hot-toast';  // Import toast from react-hot-toast

function EditProfilePic({ profileImageUrl }) {
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { triggerProfileReload } = useProfileContext();  // Access triggerProfileReload from context

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);
    setShowConfirm(true); // Show confirmation when a file is selected
  };

  const handleConfirm = async () => {
    if (newProfileImage) {
      const formData = new FormData();
      formData.append('profile_image', newProfileImage);

      try {
        // Update the profile picture in the backend
        await editProfile(formData);

        // Fetch the updated profile and store in localStorage
        await getUserProfileForLocalStorage();  

        // Trigger a reload of the profile context
        triggerProfileReload();

        toast.success('Profile picture updated successfully!');
      } catch (error) {
        toast.error(error.message)
      }
    }
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setNewProfileImage(null);
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={profileImageUrl}
        alt="Profile"
        className="w-56 h-56 rounded-full object-cover mb-4"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
      
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
