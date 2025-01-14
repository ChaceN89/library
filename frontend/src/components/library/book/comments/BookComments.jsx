/**
 * @file BookComments.jsx
 * @module BookComments
 * @description 
 *   A component to display and manage comments for a book. Includes nested comments and a 
 *   form for adding new comments. Leverages the `BookContext` for fetching and rendering
 *   comments associated with the current book.
 *
 * @requires React
 * @requires ./Comment - Component for rendering a single comment, including its nested replies.
 * @requires ./MakeComment - Component for adding a new comment or reply.
 * @requires @context/BookContext - Provides book-related state and actions.
 *
 * @component BookComments
 *
 * @example
 * // Usage in a BookPage component:
 * import BookComments from '@/components/library/BookComments';
 * 
 * function BookPage() {
 *   return (
 *     <div>
 *       <BookComments />
 *     </div>
 *   );
 * }
 *
 * @exports BookComments
 * 
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */
import React from 'react';
import Comment from './Comment';
import MakeComment from './MakeComment';
import { useBookContext } from '@/context/BookContext';

/**
 * Renders the comments section for a book, including a list of comments and a form for adding new comments.
 *
 * @returns {JSX.Element} The comments section for a book.
 */
function BookComments() {
  const { book, loading, comments } = useBookContext();

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="my-6 px-4 relative">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            comment={comment}
            bookId={book?.id}
            loading={loading}
            depth={1}
          />
        ))}
      </ul>
      <div className="mt-4">
        <MakeComment large={true}/>
      </div>
    </div>
  );
}

export default BookComments;
