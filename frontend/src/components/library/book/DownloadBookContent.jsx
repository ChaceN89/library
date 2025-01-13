/**
 * @file DownloadBookContent.jsx
 * @module DownloadBookContent
 * @description
 * A React component for downloading the book content file.
 * It integrates with the `BookContext` to fetch and display relevant data about the book.
 * Displays a dynamic button to handle file downloads, showing appropriate states (loading, error, or ready).
 *
 * @requires react
 * @requires react-icons/fa - For rendering the download icon.
 * @requires incrementDownloads - API function to increment the book's download count.
 * @requires useBookContext - Context to access book-related data and states.
 *
 * @example
 * <DownloadBookContent />
 *
 * @exports DownloadBookContent
 *
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React, { useState } from "react";
import { FaDownload } from "react-icons/fa"; // Import the download icon
import { incrementDownloads } from "@/API/booksAPI"; // Increment download count API
import { useBookContext } from "@/context/BookContext";

function DownloadBookContent() {
  const { book, loading, fileType, fileTypeDisplay } = useBookContext();

  // Destructure relevant fields from the book context
  const { content_url = null, title = "Unnamed Book", id } = book || {};

  // Error state for download
  const [error, setError] = useState(null); // Store error message

  // Function to handle the file download
  const downloadFile = async () => {
    if (!content_url) return;

    try {
      const response = await fetch(content_url);
      if (!response.ok) {
        throw new Error("Failed to download the file");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      const fileName = `${title}.${fileTypeDisplay.extension}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      await incrementDownloads(id); // Increment download count
      setError(null); // Clear previous errors
    } catch (error) {
      console.error("Failed to download the file:", error);
      setError("Failed to download the file");
    }
  };

  // Determine button text based on state
  const buttonText = error
    ? error // Show error message if there is one
    : fileType && !loading
    ? `Download "${title}" (${fileTypeDisplay.extension})` // File info when ready
    : "Loading..."; // Show loading text otherwise

  return (
    <button
      onClick={downloadFile}
      disabled={!fileType || loading || !!error} // Disable button when loading, no file type, or an error exists
      className={`flex items-center px-4 py-2 text-white rounded w-fit ${
        fileType && !loading && !error
          ? "bg-blue-500 hover:bg-blue-600" // Enabled button style
          : "bg-gray-300 cursor-not-allowed" // Disabled button style
      }`}
    >
      <FaDownload className="mr-2" />
      {buttonText}
    </button>
  );
}

export default DownloadBookContent;
