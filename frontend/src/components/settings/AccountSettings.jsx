"use client";
import React, { useState } from 'react';
import { useProfileContext } from '@/context/ProfileContext';  // Context with user data
import { updateProfileField, updatePassword } from '@/API/editProfileAPI';  // Import the password update function
import { getUserProfileForLocalStorage } from '@/API/getProfileAPI';  // For updating local storage
import { toast } from 'react-hot-toast';  // For showing success/error toasts
import Link from 'next/link';
import DeleteAccount from './DeleteAccount';

function AccountSettings() {
  const { userData, triggerProfileReload } = useProfileContext();  // Get the current user data and reload trigger
  const [editField, setEditField] = useState(null);  // To track which field is being edited
  const [formData, setFormData] = useState({
    username: userData ? userData.username : '',
    firstName: userData ? userData.first_name : '',
    lastName: userData ? userData.last_name : '',
    email: userData ? userData.email : '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordUpdate = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      await updatePassword(formData.oldPassword, formData.newPassword);
      toast.success('Password updated successfully');
      setEditField(null);  // Exit edit mode after success
    } catch (error) {
      toast.error(error.message);
    }
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
    <div className="my-2 p-2 card-background">
      <div className="space-y-6 p-4">

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
            <p>{userData && userData.username}</p>
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
            <p>{userData && (userData.first_name + ' ' + userData.last_name)}</p>
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
            <p>{userData && userData.email}</p>
            <button className="text-blue-500" onClick={() => setEditField('email')}>Edit</button>
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="mt-4">
        <label className="block font-medium">Password</label>
        {editField === 'password' ? (
          <div className="space-y-2">
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Old Password"
            />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Confirm New Password"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={handlePasswordUpdate}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>********</p>
            <button className="text-blue-500" onClick={() => setEditField('password')}>Change Password</button>
          </div>
        )}
      </div>


      {userData &&
        <DeleteAccount 
          userID = {userData.id}
          triggerProfileReload={triggerProfileReload}
        />
      }


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
