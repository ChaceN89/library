import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';  // Ensure the token is valid

export const uploadBook = async (data) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();  // Ensure valid token

    const response = await fetch(`${API_BASE_URL}/books/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'X-CSRFToken': localStorage.getItem('csrftoken'),  // Ensure CSRF token is sent
      },
      body: data,  // Send form data
    });

    if (!response.ok) {
      throw new Error('Failed to upload book');
    }

    return await response.json();  // Return the result
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
