import React, { useState } from 'react';
import { useProfileContext } from '@/context/ProfileContext';  // Import the ProfileContext
import { createComment } from '@/API/commentsAPI'; // Adjust based on actual API location
import { toast } from 'react-hot-toast';

function MakeComment({ bookId, parentCommentId = null, triggerRefresh }) {
  const { isLoggedIn } = useProfileContext(); // Access login data
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      toast.error('You must be logged in to leave a comment.');
      return;
    }

    try {
      await createComment(commentContent, bookId, parentCommentId); // API call
      toast.success('Comment posted successfully');
      setCommentContent(''); // Clear the input
      if (triggerRefresh) triggerRefresh(); // Optional: Refresh comments list
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Unknown error occurred';
      toast.error(`Failed to post comment: ${errorMessage}`);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="mt-2">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write your reply here..."
            className="w-full border rounded-lg p-2 mb-2"
            rows="3"
          />
          <button
            onClick={handleCommentSubmit}
            className="py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Submit Reply
          </button>
        </div>
      ) : (
        <p className="text-gray-500">You must be logged in to leave a comment.</p>
      )}
    </div>
  );
}

export default MakeComment;
