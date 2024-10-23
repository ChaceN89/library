// src/components/library/BookComments.jsx
import React, { useEffect, useState } from 'react';
import { fetchCommentsByBookId } from '@/API/comments';
import Comment from './Comment';

function BookComments({ bookId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      const data = await fetchCommentsByBookId(bookId);
      if (data) {
        setComments(data); // Assuming the API returns an array of comments
      }
      setLoading(false);
    };
    loadComments();
  }, [bookId]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (comments.length === 0) {
    return <p>No comments available for this book.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Comments</h3>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default BookComments;
