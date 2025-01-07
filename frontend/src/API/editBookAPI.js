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
  console.log(bookId +" The updatedData " + JSON.stringify(updatedData))
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const formData = new FormData();
    
    // Append only the fields provided in updatedData
    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update book details');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Function to update book content
// Function to update book content
export const UpdateBookContent = async (bookId, contentFiles) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const formData = new FormData();

    // Dynamically append files if they are not null
    if (contentFiles.get('cover_art')) formData.append('cover_art', contentFiles.get('cover_art'));
    if (contentFiles.get('content')) formData.append('content', contentFiles.get('content'));

    const response = await fetch(`${API_BASE_URL}/books/${bookId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update book content');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
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
