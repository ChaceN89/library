/**
 * @file Comment.jsx
 * @module Comment
 * @description 
 *   A recursive component for rendering a single comment and its replies. Includes functionality 
 *   for deleting a comment, replying to a comment, and displaying comment metadata.
 *
 * @requires React
 * @requires ./MakeComment - Component for adding a reply to a comment.
 * @requires ./DeleteComment - Component for deleting a comment with a confirmation dialog.
 * @requires ../BookOwner - Component for rendering the owner's profile information.
 * @requires react-icons/fa - Icon for comment display.
 *
 * @component Comment
 *
 * @param {Object} props - The props object.
 * @param {Object} props.comment - The comment data.
 * @param {number} props.bookId - The ID of the book associated with the comment.
 * @param {boolean} props.loading - Indicates if the data is still loading.
 *
 * @example
 * // Render a comment with replies:
 * import Comment from '@/components/library/Comment';
 * 
 * function CommentsSection({ comments }) {
 *   return (
 *     <ul>
 *       {comments.map((comment) => (
 *         <Comment key={comment.id} comment={comment} bookId={123} loading={false} />
 *       ))}
 *     </ul>
 *   );
 * }
 *
 * @exports Comment
 * 
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */

import React, { useState } from 'react';
import MakeComment from './MakeComment';
import DeleteComment from './DeleteComment';
import BookOwner from '../BookOwner';
import { FaComment } from "react-icons/fa";

/**
 * Renders a single comment and its nested replies, along with options for replying and deleting.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.comment - The comment data object.
 * @param {number} props.bookId - ID of the book associated with the comment.
 * @param {boolean} props.loading - Indicates if the data is loading.
 * @returns {JSX.Element} A comment component.
 */
function Comment({ comment, bookId, loading }) {
  const [commentContent, setCommentContent] = useState(comment.content);

  /**
   * Handles comment deletion by setting the content to a placeholder.
   */
  const onCommentDeleted = () => {
    setCommentContent("[Your comment has been deleted.]");
  };

  return (
    <li className="p-3 bg-gray-100 dark:bg-slate-600 bg-opacity-50 border border-black dark:border-white border-opacity-30 shadow-lg rounded-md dark:border-opacity-30 overflow-auto">
      <div className="flex items-center gap-3 justify-between">
        <BookOwner
          loading={loading}
          owner_profile_pic={comment.user_profile_pic}
          owner_username={comment.user_username}
          subtitle={new Date(comment.created_at).toLocaleDateString()}
          smallPic={true}
        />
        <DeleteComment
          commentUserId={comment.user}
          commentId={comment.id}
          onCommentDeleted={onCommentDeleted}
          content={commentContent}
        />
      </div>
      <p className="font-semibold p-2 flex gap-2">
        <span>
          <FaComment />
        </span>
        <span>{commentContent}</span>
      </p>
      <MakeComment parentCommentId={comment.id} />

      {comment.replies && comment.replies.length > 0 && (
        <ul className="ml-4 border-l-2 border-gray-300 dark:border-gray-500 pl-4 mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              bookId={bookId}
              loading={loading}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
