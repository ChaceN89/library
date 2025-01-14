import React, { useState } from "react";
import MakeComment from "./MakeComment";
import DeleteComment from "./DeleteComment";
import BookOwner from "../BookOwner";
import { FaComment } from "react-icons/fa";
import { bookReaderData } from "@/data/bookData";
import Modal from "@/components/general/Modal";

/**
 * Renders a single comment and its nested replies, along with options for replying and deleting.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.comment - The comment data object.
 * @param {number} props.bookId - ID of the book associated with the comment.
 * @param {boolean} props.loading - Indicates if the data is loading.
 * @param {number} props.depth - Current depth of the comment in the nesting hierarchy.
 * @returns {JSX.Element} A comment component.
 */
function Comment({ comment, bookId, loading, depth = 0 }) {
  const [commentContent, setCommentContent] = useState(comment.content);
  const [modalChildComment, setModalChildComment] = useState(false);
  const [showRepliesInline, setShowRepliesInline] = useState(false);

  const onCommentDeleted = () => {
    setCommentContent("[Your comment has been deleted.]");
  };

  // Determine the max depth based on screen size
  const smallScreen = window.innerWidth <= 768;
  const maxDepth = smallScreen
    ? bookReaderData.maxCommentDepthSmBeforeModal
    : bookReaderData.maxCommentDepthLg;

  return (
    <li className="p-4 bg-gray-100 dark:bg-slate-600 bg-opacity-50 border border-black dark:border-white border-opacity-30 shadow-lg rounded-md dark:border-opacity-30 overflow-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
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
      <p className="font-semibold mt-2 flex gap-2 items-start text-sm md:text-base">
        <span>
          <FaComment />
        </span>
        <span>{commentContent}</span>
      </p>
      <MakeComment parentCommentId={comment.id} />

      {comment.replies && comment.replies.length > 0 && (
        <>
          {depth < maxDepth ? (
            <ul className="ml-4 border-l-2 border-gray-300 dark:border-gray-500 pl-4 mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  bookId={bookId}
                  loading={loading}
                  depth={depth + 1}
                />
              ))}
            </ul>
          ) : (
            <>
              {!showRepliesInline && (
                <button
                  onClick={() =>
                    smallScreen ||depth > bookReaderData.maxCommentDepthLgBeforeModal  
                      ? setModalChildComment(true)
                      : setShowRepliesInline(true)
                  }
                  className="text-blue-500 hover:text-blue-700 underline text-sm mt-2"
                >
                  View {comment.replies.length} more replies
                </button>
              )}

              {/* Open modal if small screen of depth is really high*/}
              {(smallScreen || depth > bookReaderData.maxCommentDepthLgBeforeModal ) && modalChildComment &&  (
                <Modal onClose={() => setModalChildComment(false)}>
                  <h3 className="text-lg font-semibold mb-4">
                    Replies to "{commentContent.slice(0, 20)}..."
                  </h3>
                  <ul className="space-y-4">
                    {comment.replies.map((reply) => (
                      <Comment
                        key={reply.id}
                        comment={reply}
                        bookId={bookId}
                        loading={loading}
                        depth={depth + 1}
                      />
                    ))}
                  </ul>
                </Modal>
              )}

              {/* Inline replies (large screens) */}
              {!smallScreen && showRepliesInline && depth <= bookReaderData.maxCommentDepthLgBeforeModal && (
                <ul className="ml-4 border-l-2 border-gray-300 dark:border-gray-500 pl-4 mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      bookId={bookId}
                      loading={loading}
                      depth={depth + 1}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </li>
  );
}

export default Comment;
