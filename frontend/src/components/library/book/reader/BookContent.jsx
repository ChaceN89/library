/**
 * @file BookContent.jsx
 * @module BookContent
 * @description 
 *   Component for rendering the content of a book or document. Dynamically handles various file types
 *   and displays content or appropriate messages based on the provided `fileType`. Updates pagination 
 *   visibility (`setShowPagination`) depending on whether the file type supports inline display.
 *
 * @requires React
 *
 * @component BookContent
 *
 * @param {Object} props - The component properties.
 * @param {string|ReactNode} props.content - The content to display, which may be text or JSX.
 * @param {boolean} props.isFullScreen - Determines whether the component is in fullscreen mode.
 * @param {string} props.fileType - The MIME type of the file being displayed (e.g., "text/plain", "application/pdf").
 * @param {Object} props.fileTypeDisplay - Object containing metadata about the file, such as its name.
 * @param {Function} props.setShowPagination - Function to toggle pagination visibility based on file type.
 *
 * @example
 * // Import and use the BookContent component in your application:
 * import BookContent from '@/components/BookContent';
 * 
 * function App() {
 *   return (
 *     <BookContent 
 *       content="Sample text content."
 *       isFullScreen={false}
 *       fileType="text/plain"
 *       fileTypeDisplay={{ fileName: "example.txt" }}
 *       setShowPagination={(show) => console.log("Pagination visibility:", show)}
 *     />
 *   );
 * }
 * 
 * @exports BookContent
 * @author Chace Nielson
 * @created Jan 14 2025
 * @updated Jan 14 2025
 */
import React, { useEffect } from "react";

function BookContent({ content, isFullScreen, fileType, fileTypeDisplay, setShowPagination }) {
  /**
   * Use an effect to handle the visibility of pagination based on the file type.
   * This avoids triggering a state update during the render phase.
   */
  useEffect(() => {
    if (fileType === "application/pdf" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileType === "application/msword") {
      setShowPagination(false);
    } else if (fileType === "text/plain" || fileType === "text/html") {
      setShowPagination(true);
    }
  }, [fileType, setShowPagination]);

  // Function to render content based on fileType
  const renderContent = () => {
    if (!content) {
      return <span className="text-red-500">No content available.</span>;
    }

    switch (fileType) {
      case "application/pdf":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        return <span className="text-blue-500">The &quot;{fileTypeDisplay.fileName}&quot; is not supported for inline display.</span>;
      
        case "text/html":
        const fixLinks = (html) => {
          return html.replace(
            /<a\s+(?![^>]*target=)/gi,
            '<a target="_blank" rel="noopener noreferrer" '
          );
        };

        return(
          <div>
            <span className="text-blue-500">You may wish to download this HTML file and open on its own for better reading.</span>
            <iframe
              srcDoc={fixLinks(content)}
              sandbox="allow-same-origin"
              className="w-full h-full border-none"
              style={{ minHeight: isFullScreen ?"84vh": "58vh" }}

            />
          </div>
        )

      case "text/plain":
      case "application/rtf":
      case "application/json":
        return <pre className="whitespace-pre-wrap">{content}</pre>;
      default:
        return <span className="text-gray-500">Unsupported file type.</span>;
    }
  };

  return (
    <div
      className={`content border p-4 rounded bg-gray-100 font-semibold dark:bg-secondary overflow-y-auto flex-grow ${
        isFullScreen ? "max-h-[90vh]" : "max-h-[65vh]"
      }`}
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
      }}
    >
      {renderContent()}
    </div>
  );
}

export default BookContent;
