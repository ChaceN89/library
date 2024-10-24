import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';

// Function to edit profile picture
export const editProfilePicture = async (data) => {
  try {
    // Retrieve a valid access token or throw an error
    const accessToken = await checkAndRefreshAccessToken();

    const response = await fetch(`${API_BASE_URL}/profile-picture/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      },
      body: data
    });

    if (!response.ok) {
      throw new Error('Failed to update profile picture');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // Re-throw to handle it in the functional component
    throw error 
  }
};


// Function to update profile fields (username, first_name, last_name, email)
export const updateProfileField = async (field, value) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;  // Retrieve user ID from localStorage
    
    const response = await fetch(`${API_BASE_URL}/users/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ [field]: value })  // Dynamic field update
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to update ${field}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
    throw error;
  }
};

// Placeholder for password update functionality
// Function to update password
export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();

    const response = await fetch(`${API_BASE_URL}/users/change-password/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail.join(' ') || 'Failed to update password');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};