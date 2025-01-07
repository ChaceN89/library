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

    console.log("\nFetched Comments:");
    data.forEach((comment, index) => {
      console.log(`Comment ${index + 1}:`, comment.user);
    });

    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};


export const createComment = async (content, bookId, parentCommentId = null) => {
  try {
    const accessToken = localStorage.getItem('accessToken'); // Access token from localStorage
    if (!accessToken) {
      throw new Error('User is not logged in');
    }

    const payload = {
      content,
      book: bookId,
      parent_comment: parentCommentId,
    };

    const response = await fetch(`${API_BASE_URL}/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create comment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};



export const deleteComment = async (commentId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('User is not logged in');
    }

    const response = await fetch(`${API_BASE_URL}/comment/${commentId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }

    console.log(`Comment ${commentId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
