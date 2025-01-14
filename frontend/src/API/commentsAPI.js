/**
 * @file comments.js
 * @module commentsAPI
 * @description 
 *   API functions for managing comments. Includes fetching comments for a book, creating new comments,
 *   and deleting existing comments. Utilizes the application's API base URL and requires user authentication
 *   for creating and deleting comments.
 *
 * @requires globals - Contains the API base URL.
 *
 * @exports fetchCommentsByBookId
 * @exports createComment
 * @exports deleteComment
 *
 * @example
 * import { fetchCommentsByBookId, createComment, deleteComment } from '@/API/comments';
 * 
 * async function exampleUsage() {
 *   // Fetch comments
 *   const comments = await fetchCommentsByBookId(1);
 * 
 *   // Create a new comment
 *   const newComment = await createComment('This is a comment', 1);
 * 
 *   // Delete a comment
 *   await deleteComment(42);
 * }
 * 
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */

import { API_BASE_URL } from '../globals';

/**
 * Fetches comments for a given book ID.
 * @async
 * @function fetchCommentsByBookId
 * @param {number} bookId - The ID of the book for which to fetch comments.
 * @returns {Promise<Array|Object|null>} An array of comments or null if an error occurs.
 * @throws Will throw an error if the book ID is invalid or if the request fails.
 */
export const fetchCommentsByBookId = async (bookId) => {
  try {
    if (!bookId) {
      throw new Error("Invalid book ID.");
    }
    const url = `${API_BASE_URL}/public-comments/${bookId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};

/**
 * Creates a new comment for a given book.
 * @async
 * @function createComment
 * @param {string} content - The content of the comment.
 * @param {number} bookId - The ID of the book to associate with the comment.
 * @param {number|null} [parentCommentId=null] - The ID of the parent comment (for replies).
 * @returns {Promise<Object>} The created comment object.
 * @throws Will throw an error if the user is not logged in or if the request fails.
 */
export const createComment = async (content, bookId, parentCommentId = null) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
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

/**
 * Deletes a comment by its ID.
 * @async
 * @function deleteComment
 * @param {number} commentId - The ID of the comment to delete.
 * @returns {Promise<void>} Resolves if the deletion is successful.
 * @throws Will throw an error if the user is not logged in or if the request fails.
 */
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
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
