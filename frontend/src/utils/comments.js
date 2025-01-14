/**
 * Adds a new comment or reply to the correct place in the nested comments structure.
 * @param {Array} comments - The current list of comments.
 * @param {Object} newComment - The new comment or reply to add.
 * @returns {Array} - The updated comments array with the new comment added.
 */
export const addNestedComment = (comments, newComment) => {
  if (!newComment.parent_comment) {
    // If it's a top-level comment, add it to the root array
    return [...comments, { ...newComment, replies: [] }];
  }

  // Recursive function to traverse and find the correct parent
  const updateReplies = (commentList) =>
    commentList.map((comment) => {
      if (comment.id === newComment.parent_comment) {
        // Add the new comment as a reply to the correct parent
        return {
          ...comment,
          replies: [...comment.replies, { ...newComment, replies: [] }],
        };
      }

      // Recursively check nested replies
      return {
        ...comment,
        replies: updateReplies(comment.replies),
      };
    });

  return updateReplies(comments);
};
