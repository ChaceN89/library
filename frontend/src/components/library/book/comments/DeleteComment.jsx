/**
 * @file DeleteComment.jsx
 * @module DeleteComment
 * @description 
 *   A component for rendering a delete button with a confirmation modal for comments.
 *   Only renders if the current user is the owner of the comment. Handles comment deletion
 *   through an API call and provides an optional callback for UI updates.
 *
 * @requires React
 * @requires @context/ProfileContext - Provides the current user's profile context.
 * @requires @API/commentsAPI - API functions for deleting comments.
 * @requires react-icons/fa - Icon for the delete button.
 *
 * @component DeleteComment
 *
 * @param {Object} props - Component props.
 * @param {number} props.commentUserId - The ID of the user who owns the comment.
 * @param {number} props.commentId - The ID of the comment to be deleted.
 * @param {Function} props.onCommentDeleted - Callback function to update UI after comment deletion.
 * @param {string} props.content - The content of the comment.
 *
 * @example
 * import DeleteComment from '@/components/DeleteComment';
 * 
 * function CommentsList({ comments }) {
 *   return comments.map((comment) => (
 *     <DeleteComment 
 *       key={comment.id}
 *       commentUserId={comment.user}
 *       commentId={comment.id}
 *       onCommentDeleted={(id) => console.log(`Comment ${id} deleted`)}
 *       content={comment.content}
 *     />
 *   ));
 * }
 *
 * @exports DeleteComment
 * 
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */
import React, { useState } from 'react';
import { useProfileContext } from '@/context/ProfileContext';
import { deleteComment } from '@/API/commentsAPI';
import { FaRegTrashAlt } from 'react-icons/fa';

/**
 * Component for deleting a comment with a confirmation modal.
 *
 * @param {Object} props - The component props.
 * @param {number} props.commentUserId - ID of the user who owns the comment.
 * @param {number} props.commentId - ID of the comment to delete.
 * @param {Function} props.onCommentDeleted - Callback function to update UI after deletion.
 * @param {string} props.content - The content of the comment.
 * @returns {JSX.Element|null} A button to delete the comment or null if conditions aren't met.
 */
function DeleteComment({ commentUserId, commentId, onCommentDeleted, content }) {
  const { userData } = useProfileContext(); // Access current user's data
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [localDelete, setLocalDelete] = useState(false);

  const currentUserId = userData?.id;

  const handleDelete = async () => {
    try {
      await deleteComment(commentId);
      onCommentDeleted(commentId);
      setLocalDelete(true);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
    setShowConfirmation(false);
  };

  if (!currentUserId || currentUserId !== commentUserId || content === '[Deleted]' || localDelete) {
    return null;
  }

  return (
    <div>
      {showConfirmation && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowConfirmation(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 border-2 dark:border-white border-black rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h5 className="text-center text-lg font-semibold mb-4">
                Are you sure you want to delete your comment?
              </h5>
              <p className="truncate mb-4 text-sm">{content}</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => setShowConfirmation(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {!showConfirmation && (
        <button
          className="text-sm text-red-300 hover:text-red-700 focus:outline-none"
          onClick={() => setShowConfirmation(true)}
        >
          <div className="flex gap-0.5 items-center">
            Remove <FaRegTrashAlt />
          </div>
        </button>
      )}
    </div>
  );
}

export default DeleteComment;
