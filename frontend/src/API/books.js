// src/API/books.js
import { API_BASE_URL, DEFAULT_PAGE_SIZE } from '../globals';

export const fetchBooks = async (page = 1, searchQuery = '', filters = {}, pageSize = DEFAULT_PAGE_SIZE) => {
  try {
    const queryParams = new URLSearchParams();

    if (page) queryParams.append('page', page);
    if (searchQuery) queryParams.append('search', searchQuery); // No need for encodeURIComponent
    if (pageSize) queryParams.append('page_size', pageSize);

    // Add filter parameters
    if (filters.sort_by) queryParams.append('sort_by', filters.sort_by);
    if (filters.genre) queryParams.append('genre', filters.genre); // No need for encodeURIComponent
    if (filters.language) queryParams.append('language', filters.language); // No need for encodeURIComponent
    if (filters.description) queryParams.append('description', filters.description ? 'true' : 'false');

    const url = `${API_BASE_URL}/public/books?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return null;
  }
};



// get single book by id
export const fetchBookById = async (id) => {
  try {
    const url = `${API_BASE_URL}/public/books/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch the book');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching the book:', error);
    return null;
  }
};


export const incrementViews = async (bookId) => {
  try {
    const url = `${API_BASE_URL}/public/books/${bookId}/increment_views/`;
    const response = await fetch(url, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to increment views');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error incrementing views:', error);
    return null;
  }
};

export const incrementDownloads = async (bookId) => {
  try {
    const url = `${API_BASE_URL}/public/books/${bookId}/increment_downloads/`;
    const response = await fetch(url, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to increment downloads');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error incrementing downloads:', error);
    return null;
  }
};
