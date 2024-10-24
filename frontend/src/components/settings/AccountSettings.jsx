"use client";
import React, { useState } from 'react';
import { useProfileContext } from '@/context/ProfileContext';  // Context with user data
import { updateProfileField } from '@/API/editProfileAPI';  // Import new API calls
import { getUserProfileForLocalStorage } from '@/API/getProfileAPI';  // For updating local storage
import { toast } from 'react-hot-toast';  // For showing success/error toasts
import Link from 'next/link';

function AccountSettings() {
  const { userData, triggerProfileReload } = useProfileContext();  // Get the current user data and reload trigger
  const [editField, setEditField] = useState(null);  // To track which field is being edited
  const [formData, setFormData] = useState({
    username: userData.username,
    firstName: userData.first_name,
    lastName: userData.last_name,
    email: userData.email,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (field) => {
    try {
      if (field === 'name') {
        // Update both first and last name
        await updateProfileField('first_name', formData.firstName);
        await updateProfileField('last_name', formData.lastName);
        toast.success('Name updated successfully');
      } else {
        // Update other fields
        await updateProfileField(field, formData[field]);
        toast.success(`${field} updated successfully`);
      }

      // Fetch the updated profile and update local storage
      await getUserProfileForLocalStorage();
      triggerProfileReload();

      setEditField(null);  // Exit edit mode after success
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      {/* Username Section */}
      <div>
        <label className="block font-medium">Username</label>
        {editField === 'username' ? (
          <div className="flex space-x-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('username')}>Save</button>
            <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{userData.username}</p>
            <button className="text-blue-500" onClick={() => setEditField('username')}>Edit</button>
          </div>
        )}
      </div>

      {/* First and Last Name Section */}
      <div className="mt-4">
        <label className="block font-medium">First and Last Name</label>
        {editField === 'name' ? (
          <div className="space-y-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Last Name"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('name')}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{userData.first_name} {userData.last_name}</p>
            <button className="text-blue-500" onClick={() => setEditField('name')}>Edit</button>
          </div>
        )}
      </div>

      {/* Email Section */}
      <div className="mt-4">
        <label className="block font-medium">Email</label>
        {editField === 'email' ? (
          <div className="flex space-x-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('email')}>Save</button>
            <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{userData.email}</p>
            <button className="text-blue-500" onClick={() => setEditField('email')}>Edit</button>
          </div>
        )}
      </div>

      {/* Placeholder for Password Section */}
      <div className="mt-4">
        <label className="block font-medium">Password</label>
        <div className="flex justify-between items-center">
          <p>********</p>
          <button className="text-blue-500" disabled>Change Password (coming soon)</button>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-6">
        <Link href="/settings">
          <div className="text-blue-500 hover:underline">← Back to Settings</div>
        </Link>
      </div>
    </div>
  );
}

export default AccountSettings;
