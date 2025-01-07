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
