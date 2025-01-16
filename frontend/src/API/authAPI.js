/**
 * @file authAPI.js
 * @module authAPI
 * @description 
 *   API functions for handling user authentication, including login, logout, 
 *   and account creation.
 *
 * @requires API_BASE_URL - Base URL for API requests.
 *
 * @function getLoginCredentials - Log in with username and password.
 * @function createAccount - Create a new account with optional profile image.
 * @function logout - Log out the user and clear tokens.
 *
 * @exports getLoginCredentials
 * @exports createAccount
 * @exports logout
 *
 * @author Chace Nielson
 * @created 2025-01-16
 */

import { API_BASE_URL } from '../globals';

// Function to log in and store tokens
export const getLoginCredentials = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Store access token, refresh token, and user data in separate localStorage keys
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));  // User data stored as JSON

      return data;
    } else {
      throw new Error('Login failed. Check your credentials and try again.');
    }
  } catch (error) {
    throw error;  // Re-throw to handle in the component
  }
};

// Function to handle account creation with a profile image
export const createAccount = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData, // Sends formData directly as multipart/form-data
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error data:', errorData);

      // Check if the API returned password validation errors
      if (errorData.passwordError) {
        throw new Error(errorData.passwordError);  // Join the errors into a single message
      }

      // Handle other field-specific error messages like username or email
      if (errorData.username) {
        throw new Error(errorData.username);
      }
      if (errorData.email) {
        throw new Error(errorData.email);
      }

      // Generic error message
      throw new Error(errorData.message ||errorData || 'Account creation failed');

    }

    const data = await response.json();

    // Store access token, refresh token, and user data in separate localStorage keys
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));  // User data stored as JSON

    window.location.reload(); // Reload the page to update the user state - can be replaced with a redirect later

    return data;
  } catch (error) {
    throw error;  // Re-throw to handle in register.jsx
  }
};


// Logout function to clear all tokens and user data
export const logout = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');  // Clear user data

  // need to reload the page to update the user state upon a successful logout
  window.location.reload();  // Reload the page to update the user state - can be replaced with a redirect later

  return 'User has been logged out successfully';
};
