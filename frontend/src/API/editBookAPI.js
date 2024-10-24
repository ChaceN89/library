import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';

// Function to fetch the book details
export const fetchBookDetails = async (bookId) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Function to update book information
export const updateBookDetails = async (bookId, updatedData) => {
  throw new Error('Not implemented');
};

// Function to update book content
export const updateContent = async (bookId, updatedData) => {
  throw new Error('Not implemented');
};

// Function to update book cover art
export const updateBookCoverArt = async (bookId, updatedData) => {
  throw new Error('Not implemented');
};

// Function to delete a book
export const deleteBook = async (bookId) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
    return response.status === 204 ? { detail: 'Book deleted successfully.' } : await response.json();
  } catch (error) {
    throw error;
  }
};
