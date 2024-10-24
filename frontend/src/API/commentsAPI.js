// src/API/comments.js
import { API_BASE_URL } from '../globals';

export const fetchCommentsByBookId = async (bookId) => {
  try {
    const url = `${API_BASE_URL}/public-comments/${bookId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};
