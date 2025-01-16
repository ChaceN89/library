/**
 * @file booksAPI.js
 * @module booksAPI
 * @description 
 *   API functions for managing books, including fetching, updating, deleting, 
 *   and incrementing views/downloads.
 *
 * @requires API_BASE_URL - Base URL for API requests.
 * @requires DEFAULT_PAGE_SIZE - Default number of books per page.
 * @requires checkAndRefreshAccessToken - Utility function for handling token refresh.
 *
 * @function fetchBooks - Fetch a list of books with pagination, search, and filters.
 * @function fetchBookById - Fetch details of a single book by ID.
 * @function incrementViews - Increment the view count of a book.
 * @function incrementDownloads - Increment the download count of a book.
 * @function fetchBookDetails - Fetch detailed book information (admin only).
 * @function updateBookDetails - Update metadata of a specific book (admin only).
 * @function updateBookContent - Update the content or cover art of a book (admin only).
 * @function deleteBook - Delete a specific book (admin only).
 *
 * @exports fetchBooks
 * @exports fetchBookById
 * @exports incrementViews
 * @exports incrementDownloads
 * @exports fetchBookDetails
 * @exports updateBookDetails
 * @exports updateBookContent
 * @exports deleteBook
 *
 * @author Chace Nielson
 * @created 2025-01-16
 */

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
    return data;
  } catch (error) {
    console.error('Error incrementing downloads:', error);
    return null;
  }
};
