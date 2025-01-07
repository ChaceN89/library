import React, { useState } from 'react';
import { UpdateBookContent } from '@/API/editBookAPI'; // Placeholder for file upload function
import { toast } from 'react-hot-toast';

function ChangeBookContent({ bookId, triggerRefresh }) {
  const [newCoverArt, setNewCoverArt] = useState(null);
  const [newContent, setNewContent] = useState(null);

  const handleCoverArtChange = (e) => setNewCoverArt(e.target.files[0]);
  const handleContentChange = (e) => setNewContent(e.target.files[0]);

  const handleUpload = async () => {
    if (newCoverArt || newContent) {
      try {
        const formData = new FormData();
        if (newCoverArt) formData.append('cover_art', newCoverArt);
        if (newContent) formData.append('content', newContent);

        await UpdateBookContent(bookId, formData); // API call to handle upload
        toast.success('Book content updated successfully');
        triggerRefresh();
      } catch (error) {
        const errorMessage = error.response?.data?.detail || error.message || 'Unknown error occurred';
        toast.error(`Failed to update content: ${errorMessage}`);
      }
    } else {
      toast.error('Please select at least one file to upload');
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Update Book Files</h2>

      {/* Cover Art Upload */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Cover Art (Optional)</label>
        <div className="flex items-center">
          <input
            type="file"
            onChange={handleCoverArtChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
        {newCoverArt && (
          <p className="text-sm text-gray-500 mt-1">Selected file: {newCoverArt.name}</p>
        )}
      </div>

      {/* Content Upload */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Book Content (Optional)</label>
        <div className="flex items-center">
          <input
            type="file"
            onChange={handleContentChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
        </div>
        {newContent && (
          <p className="text-sm text-gray-500 mt-1">Selected file: {newContent.name}</p>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="w-full py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Upload New Files
      </button>
    </div>
  );
}

export default ChangeBookContent;
