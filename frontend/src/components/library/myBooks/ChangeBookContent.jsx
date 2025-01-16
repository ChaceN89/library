/**
 * @file ChangeBookContent.jsx
 * @module ChangeBookContent
 * @description Component for uploading or replacing a book's cover art and content files.
 * @requires React
 * @requires UpdateBookContent - API function for uploading book files.
 * @requires ImageInputField - Reusable input field for uploading images with preview support.
 * @requires SubmitButton - Reusable button component for submitting forms.
 * @requires Image - Next.js Image component for optimized image rendering.
 * @requires useEffect - Hook for synchronizing the preview image with updated props.
 * @requires toast - Library for showing user-friendly notifications.
 */

import React, { useState, useEffect } from 'react';
import { UpdateBookContent } from '@/API/editBookAPI';
import { toast } from 'react-hot-toast';
import ImageInputField from '@/components/general/inputs/ImageInputField';
import SubmitButton from '@/components/general/inputs/SubmitButton';
import Image from 'next/image';
import { ACCEPTED_FILES } from '@/globals';

function ChangeBookContent({ bookId, triggerRefresh, coverArt = null }) {
  const [newCoverArt, setNewCoverArt] = useState(null);
  const [newCoverArtPreview, setNewCoverArtPreview] = useState(coverArt); // Preview image
  const [newContent, setNewContent] = useState(null);

  // Update the preview when the `coverArt` prop changes
  useEffect(() => {
    setNewCoverArtPreview(coverArt);
  }, [coverArt]);

  const handleCoverArtChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCoverArt(file);
      setNewCoverArtPreview(URL.createObjectURL(file)); // Create a preview URL for the new file
    }
  };

  const handleContentChange = (e) => setNewContent(e.target.files[0]);

  const handleUpload = async () => {
    if (newCoverArt || newContent) {
      try {
        const formData = new FormData();
        if (newCoverArt) formData.append('cover_art', newCoverArt);
        if (newContent) formData.append('content', newContent);

        await UpdateBookContent(bookId, formData); // API call to handle upload
        toast.success('Book content updated successfully. It might take some time for the changes to take effect');
        triggerRefresh();
        if (newCoverArt) URL.revokeObjectURL(newCoverArtPreview); // Clean up the object URL
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
      <h3 className="text-lg font-semibold mb-4">Update Book Files</h3>

      {/* Cover Art Upload */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">Current Cover Art</label>
        <div className="flex flex-col items-left space-y-4">
          {/* Display the current or new cover art */}
          <Image
            src={newCoverArtPreview || '/placeholder.jpg'} // Fallback to a placeholder if no image is available
            alt="Cover Art Preview"
            width={200}
            height={300}
            className="rounded-lg border border-gray-300"
          />
          <ImageInputField
            label="Select New Cover Art (Optional):"
            name="cover_art"
            accepted_files="image/png, image/jpeg"
            onChange={handleCoverArtChange}
            rounded="rounded-lg"
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
            accept={ACCEPTED_FILES}
            
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
        </div>
        {newContent && (
          <p className="text-sm text-gray-500 mt-1">Selected file: {newContent.name}</p>
        )}
      </div>

      {/* Upload Button */}
      <SubmitButton label="Upload New Files" onClick={handleUpload} />
    </div>
  );
}

export default ChangeBookContent;
