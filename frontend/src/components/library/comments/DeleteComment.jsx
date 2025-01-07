import React, { useState } from 'react';
import { useProfileContext } from '@/context/ProfileContext';
import { deleteComment } from '@/API/commentsAPI';

function DeleteComment({ commentUserId, commentId, onCommentDeleted }) {
  const { userData } = useProfileContext(); // Access current user's data
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get the current user's ID
  const currentUserId = userData?.id;

  // Function to handle delete
  const handleDelete = async () => {
    try {
      await deleteComment(commentId);
      alert('Comment deleted successfully');
      onCommentDeleted(commentId); // Optional: Call a parent function to update UI
    } catch (error) {
      alert('Failed to delete the comment');
      console.error('Error deleting comment:', error);
    }
    setShowConfirmation(false); // Close confirmation dialog
  };

  if (!currentUserId || currentUserId !== commentUserId) {
    return null; // Do not render if the user does not own the comment
  }

  return (
    <div>
      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="bg-gray-100 border rounded p-4 shadow-lg flex flex-col items-center">
          <p className="text-center mb-4">Are you sure you want to delete this comment?</p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowConfirmation(false)}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Delete button */}
      {!showConfirmation && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setShowConfirmation(true)}
        >
          Delete Comment
        </button>
      )}
    </div>
  );
}

export default DeleteComment;
