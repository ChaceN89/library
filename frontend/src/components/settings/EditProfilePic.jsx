"use client";
import React, { useState } from 'react';
import { editProfile, getUserProfileForLocalStorage } from '@/API/editProfile';
import { useProfileContext } from '@/context/ProfileContext';  // Import ProfileContext

function EditProfilePic({ profileImageUrl }) {
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { triggerProfileReload
,
    accessToken,
    refreshToken,
    userData

   } = useProfileContext();  // Access triggerProfileReload from context

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

        alert('Profile picture updated successfully!');
      } catch (error) {
        console.error('Failed to update profile picture:', error);
        alert('Failed to update profile picture.');
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


<div className="w-screen p-4">
        <h3 className="text-xl font-bold mb-2">Profile Data from Context:</h3>
        <pre className='w-9/12 bg-gray-100 p-2 rounded-lg' style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: userData
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default EditProfilePic;
