// src/components/library/BookComments.jsx
import React, { useEffect, useState } from 'react';
import { fetchCommentsByBookId } from '@/API/commentsAPI';
import Comment from './Comment';
import MakeComment from './MakeComment';
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

  return (
    <div className="">
      <h3 className="text-xl font-semibold">Comments</h3>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <Comment key={comment.id} id={comment.id} comment={comment} bookId={bookId} />
        ))}
      </ul>
      <MakeComment bookId={bookId} triggerRefresh={() => setComments([])} />
    </div>
  );
}

export default BookComments;
