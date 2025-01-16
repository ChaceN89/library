/**
 * @file adminAPI.js
 * @module adminAPI
 * @description 
 *   API functions for managing user accounts, including fetching, editing, deleting, 
 *   and updating user details, specifically for admin use cases.
 *
 * @requires API_BASE_URL - Base URL for API requests.
 * @requires checkAndRefreshAccessToken - Utility function for handling token refresh.
 *
 * @function fetchAllUsers - Fetch all users (admin only).
 * @function editUser - Edit details of a specific user (admin only).
 * @function deleteUser - Delete a specific user (admin only).
 * @function updateUserPassword - Update a user's password (admin only).
 *
 * @exports fetchAllUsers
 * @exports editUser
 * @exports deleteUser
 * @exports updateUserPassword
 *
 * @author Chace Nielson
 * @created 2025-01-16
 */


import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';

// Fetch all users (admin only)
export const fetchAllUsers = async () => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Edit user details (admin only)
export const editUser = async (userId, userData) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to edit user');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Delete user (admin only)
export const deleteUser = async (userId) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return response.status === 204 ? { detail: 'User deleted successfully' } : await response.json();
  } catch (error) {
    throw error;
  }
};


export const updateUserPassword = async (userId, newPassword) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();

    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/update_password/`, {
      method: 'PUT', // Corrected to PUT
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_password: newPassword }),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        detail: 'Unable to parse error response',
      })); // Gracefully handle JSON parse errors
      console.error('Failed to update password:', {
        status: response.status,
        statusText: response.statusText,
        errorDetails,
      });
      throw new Error(
        `Failed to update password. Status: ${response.status} - ${response.statusText}. Details: ${errorDetails.detail || 'No additional details'}`
      );
    }

    const data = await response.json();
    console.log('Password updated successfully:', data); // Log success response for debugging
    return data;
  } catch (error) {
    console.error('Error in updateUserPassword:', error); // Log the thrown error
    throw error; // Re-throw the error for the calling function to handle
  }
};


export const deleteBook = async (bookId) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();

    const response = await fetch(`${API_BASE_URL}/admin/users/${bookId}/delete-book/`, {

      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        detail: 'Unable to parse error response',
      }));
      throw new Error(
        `Failed to delete book. Status: ${response.status} - ${response.statusText}. Details: ${errorDetails.detail || 'No additional details'}`
      );
    }

    return response.status === 204 ? { detail: 'Book deleted successfully' } : await response.json();
  } catch (error) {
    console.error('Error in deleteBook:', error);
    throw error;
  }
};