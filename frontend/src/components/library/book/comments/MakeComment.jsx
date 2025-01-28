/**
 * @file MakeComment.jsx
 * @module MakeComment
 * @description 
 *   Component for creating a new comment or reply to an existing comment in the book discussion section.
 *   Handles the login prompt if the user is not signed in and provides a simple reply interface.
 *
 * @requires React
 * @requires react-hot-toast
 * @requires @/context/ProfileContext
 * @requires @/context/BookContext
 * @requires @/API/commentsAPI
 * @requires @/utils/comments
 * @requires @/components/auth/LoginForm
 * @requires react-icons/fa
 *
 * @component MakeComment
 *
 * @example
 * // Render MakeComment for a top-level comment
 * <MakeComment parentCommentId={null} />
 *
 * @example
 * // Render MakeComment for a reply to an existing comment
 * <MakeComment parentCommentId={123} />
 *
 * @param {number|null} parentCommentId - The ID of the parent comment, or null for top-level comments.
 *
 * @exports MakeComment
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-14
 */
import React, { useState } from 'react';
import { useProfileContext } from '@/context/ProfileContext';
import { createComment } from '@/API/commentsAPI';
import { toast } from 'react-hot-toast';
import { useBookContext } from '@/context/BookContext';
import { addNestedComment } from '@/utils/comments';
import LoginForm from '@/components/auth/LoginForm';
import { FaReplyAll } from 'react-icons/fa';

function MakeComment({ parentCommentId = null, large=false }) {
  const { book, setComments, loading } = useBookContext();
  const { isLoggedIn } = useProfileContext();
  const [commentContent, setCommentContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleCommentSubmit = async () => {
    if (commentContent.trim().length === 0) {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      const newComment = await createComment(commentContent, book.id, parentCommentId);
      setComments((prevComments) => addNestedComment(prevComments, newComment));
      setCommentContent('');
      setIsReplying(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || error.message || 'Unknown error occurred';
      toast.error(`Failed to post comment: ${errorMessage}`);
    }
  };

  const openReplyBox = () => {
    if (isLoggedIn) {
      setIsReplying(true);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginPopup(false);
    setIsReplying(true);
  };

  if (loading) return null;

  return (
    <div>
      {!isReplying && (
        <button
          onClick={openReplyBox}
          className="text-sm focus:outline-none"
        >
          <div className={`flex gap-1 items-center text-gray-300 hover:text-gray-700 ${large && "text-lg text-gray-400"}`}>
            <FaReplyAll size={16}/> Reply
          </div>
        </button>
      )}

      {isReplying && (
        <div className="mt-2 flex flex-col md:flex-row items-start md:items-center gap-2">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write your reply..."
            className="w-full border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-secondary dark-text-primary"
            rows="1"
          />
          <button
            onClick={handleCommentSubmit}
            className="py-1 px-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
          <button
            onClick={() => setIsReplying(false)}
            className="py-1 px-2 rounded-md text-gray-600 hover:text-gray-800 transition text-sm focus:outline-none"
          >
            Cancel
          </button>
        </div>
      )}

      {showLoginPopup && (
        <LoginForm
          isPopup
          onClose={() => setShowLoginPopup(false)}
          reRouteTo={null}
          successLogin={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default MakeComment;
