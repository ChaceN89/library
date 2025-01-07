// src/components/library/Comment.jsx
import React, { useState } from 'react';
import MakeComment from './MakeComment';
import DeleteComment from './DeleteComment';

function Comment({id, comment, bookId }) {

  const onCommentDeleted =(id)=>{
    setcommentContent("[Comment Deleted]")
  }

  const [commentContent, setcommentContent] = useState(comment.content)


  return (
    <li className="border rounded-lg p-3 shadow">
      <div className="flex items-center gap-3">
        <img 
          src={comment.user_profile_pic} 
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-gray-800">{commentContent}</p>
      </div>
      <p className="text-sm text-gray-500">
       {id} Posted by {comment.user_username} on {new Date(comment.created_at).toLocaleDateString()}
        <DeleteComment
          commentUserId={comment.user}
          commentId={comment.id}
          onCommentDeleted = {onCommentDeleted}
        />
      </p>

      <MakeComment bookId={bookId} parentCommentId={comment.id} />
      
      {comment.replies && comment.replies.length > 0 && (
        <ul className="ml-4 border-l-2 border-gray-300 pl-4 mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} bookId={bookId} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
