// src/components/library/Comment.jsx
import React from 'react';

function Comment({ comment }) {
  return (
    <li className="border rounded-lg p-3 shadow">
      <p className="text-gray-800">{comment.content}</p>
      <p className="text-sm text-gray-500">
        Posted by {comment.user_username} on {new Date(comment.created_at).toLocaleDateString()}
      </p>

      {/* Recursively render replies if they exist */}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="ml-4 border-l-2 border-gray-300 pl-4 mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
