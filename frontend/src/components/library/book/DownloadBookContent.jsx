import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa"; // Import the download icon
import { incrementDownloads } from "@/API/booksAPI"; // Increment download count API
import { mimeToFileType } from "@/data/bookData";

function DownloadBookContent({ book, loading }) {
  // Destructure relevant fields with fallbacks
  const { title = "Untitled", content_url = null } = book || {};

  // State for file type and display info
  const [fileType, setFileType] = useState(""); // Store MIME type
  const [fileTypeDisplay, setFileTypeDisplay] = useState({
    fileName: "Unknown File",
    extension: "unknown",
  });

  // Error state for download
  const [error, setError] = useState(null); // Store error message

  // Fetch file type and map it to display info
  useEffect(() => {
    if (!content_url) return;

    const fetchFileType = async () => {
      try {
        const response = await fetch(content_url, { method: "HEAD" }); // Fetch headers
        const type = response.headers.get("Content-Type");
        setFileType(type || "text/plain"); // Default to text/plain

        const displayInfo = mimeToFileType[type] || {
          fileName: "Text File",
          extension: "txt",
        };
        setFileTypeDisplay(displayInfo);
        setError(null); // Clear previous errors
      } catch (error) {
        console.error("Failed to fetch file type:", error);
        setFileTypeDisplay({ fileName: "Text File", extension: "txt" });
        setError("Failed to Get Book Content");
      }
    };

    fetchFileType();
  }, [content_url]);

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
      incrementDownloads(book.id); // Increment download count
      setError(null); // Clear previous errors
    } catch (error) {
      console.error("Failed to download the file:", error);
      setError("Failed to download the file");
    }
  };

  return (
    <button
      onClick={downloadFile}
      disabled={!fileType || loading || !!error} // Disable if loading, no file type, or an error occurred
      className={`flex items-center px-4 py-2 text-white rounded ${
        fileType && !loading && !error
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      <FaDownload className="mr-2" />
      {error
        ? error // Display the error message if it exists
        : fileType && !loading
        ? `Download "${title}" (${fileTypeDisplay.extension})`
        : "Loading..."}
    </button>
  );
}

export default DownloadBookContent;
