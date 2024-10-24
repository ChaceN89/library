"use client";
import React, { useState } from 'react';
import { createAccount } from '@/API/auth';
import { toast } from 'react-hot-toast';  // Import react-hot-toast

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    profile_image: null, // For handling image upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profile_image: e.target.files[0] }); // Handle file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare formData for multipart/form-data submission
    const data = new FormData();
    data.append('username', formData.username);
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.profile_image) {
      data.append('profile_image', formData.profile_image); // Add image if selected
    }

    try {
      const result = await createAccount(data);
      if (result) {
        toast.success('Account created successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-gray-700">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-gray-700">First Name:</label>
          <input 
            type="text" 
            id="first_name" 
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-gray-700">Last Name:</label>
          <input 
            type="text" 
            id="last_name" 
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Profile Image */}
        <div>
          <label htmlFor="profile_image" className="block text-gray-700">Profile Image (Optional):</label>
          <input 
            type="file" 
            id="profile_image"
            name="profile_image"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
