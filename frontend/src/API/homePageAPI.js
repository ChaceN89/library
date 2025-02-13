/**
 * @file homepageAPI.js
 * @module homepageAPI
 * @description 
 *   API functions for fetching homepage data, including most-viewed books, 
 *   most-recent books, and general site statistics.
 *
 * @requires API_BASE_URL - Base URL for API requests.
 *
 * @function fetchMostViewedBooks - Fetch the top N most-viewed books.
 * @function fetchMostRecentBooks - Fetch the top N most-recently added books.
 * @function fetchSiteStatistics - Fetch site-wide statistics.
 *
 * @exports fetchMostViewedBooks
 * @exports fetchMostRecentBooks
 * @exports fetchSiteStatistics
 *
 * @author Chace Nielson
 * @created 2025-01-16
 */

import { API_BASE_URL } from '../globals';

// Function to fetch the top N most-viewed books
export const fetchMostViewedBooks = async (n = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/public/books/most-viewed/?n=${n}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch most viewed books');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching most viewed books:', error);
    throw error;
  }
};

// Function to fetch the top N most recent books
export const fetchMostRecentBooks = async (n = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/public/books/most-recent/?n=${n}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch most recent books');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching most recent books:', error);
    throw error;
  }
};

// Function to fetch site statistics
export const fetchSiteStatistics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/public/books/stats/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch site statistics');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching site statistics:', error);
    throw error;
  }
};
