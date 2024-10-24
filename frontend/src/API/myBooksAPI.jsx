// API/myBooksAPI.js
import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';  // Ensure this is correct

export const fetchMyBooks = async () => {
  try {
    const accessToken = await checkAndRefreshAccessToken();  // Ensure valid token

    const response = await fetch(`${API_BASE_URL}/books/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching my books:', error);
    throw error;
  }
};
