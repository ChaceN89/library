import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';  // Ensure this is the correct path

// Function to fetch the favorite books
export const fetchFavBooks = async () => {
  try {
    const accessToken = await checkAndRefreshAccessToken();  // Ensure valid token

    const response = await fetch(`${API_BASE_URL}/books/get_favorites/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorite books');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching favorite books:', error);
    throw error;
  }
};

// Function to add a book to favorites
export const addFavoriteBook = async (bookId) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();  // Ensure valid token

    const response = await fetch(`${API_BASE_URL}/books/${bookId}/add_favorite/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'X-CSRFToken': localStorage.getItem('csrftoken'),  // Ensure CSRF token is sent
      },
      body: ''  // Empty body for POST request
    });

    if (!response.ok) {
      const errorData = await response.json();  // Parse error response
      throw new Error(errorData.detail || 'Failed to add favorite');
    }

    return await response.json();  // Return success response
  } catch (error) {
    throw error;
  }
};

// Function to remove a book from favorites
export const removeFavoriteBook = async (bookId) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();  // Ensure valid token

    const response = await fetch(`${API_BASE_URL}/books/${bookId}/remove_favorite/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'X-CSRFToken': localStorage.getItem('csrftoken'),  // Ensure CSRF token is sent
      }
    });

    if (!response.ok) {
      const errorData = await response.json();  // Parse error response
      throw new Error(errorData.detail || 'Failed to remove favorite');
    }

    return response.status === 204 ? { detail: 'Book removed from favorites.' } : await response.json();  // Handle 204 response
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};
