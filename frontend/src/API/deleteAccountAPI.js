/**
 * @file deleteAccountAPI.js
 * @module deleteAccountAPI
 * @description 
 *   API function for deleting a user account. Validates access tokens, performs the 
 *   deletion request, and handles errors gracefully.
 *
 * @requires API_BASE_URL - Base URL for API requests.
 * @requires checkAndRefreshAccessToken - Utility function to ensure a valid access token.
 *
 * @function deleteAccount
 * @param {string} id - Unique identifier of the user to delete.
 * @returns {boolean} - Returns true if the account was deleted successfully.
 * @throws {Error} - Throws an error if the deletion request fails.
 *
 * @example
 * const success = await deleteAccount("123");
 * 
 * @exports deleteAccount
 * @created 2025-01-16
 */

import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';
export const deleteAccount = async (id) => {
  try {
    const accessToken = await checkAndRefreshAccessToken(); // Ensure valid token

    const response = await fetch(`${API_BASE_URL}/users/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        detail: 'Unable to parse error response',
      }));
      throw new Error(
        `Failed to delete account. Status: ${response.status}. Details: ${errorDetails.detail || 'No additional details'}`
      );
    }

    return true; // Indicate success
  } catch (error) {
    console.error('Error deleting account:', error.message);
    throw error;
  }
};
