/**
 * @file ImageInputField.jsx
 * @module ImageInputField
 * @description 
 *   A reusable input field component for uploading and previewing images. 
 *   Displays an optional label and supports a real-time image preview. 
 *   The preview area defaults to a black circular placeholder with "No Image" text.
 *
 * @requires react
 * @requires useState from React
 * @requires Image from "next/image"
 *
 * @param {string} label - Label text for the image input field.
 * @param {function} onChange - Function to handle the file input change.
 * @param {string} name - The `name` and `id` attributes for the input field.
 *
 * @example
 * <ImageInputField
 *   label="Profile Image (Optional)"
 *   onChange={(e) => console.log(e.target.files[0])}
 *   name="profile_image"
 * />
 *
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-16
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";

function ImageInputField({ label, onChange, name, accepted_files, rounded="rounded-full" }) {
  const [preview, setPreview] = useState(null); // State to manage image preview

  /**
   * Handle changes to the file input and update the preview.
   * @param {Event} e - The input change event.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate preview URL for the uploaded file
      onChange(e); // Trigger parent onChange handler
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-14">
      {/* File Input */}
      <div className="flex flex-col">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <input
          type="file"
          id={name}
          name={name}
          accept={accepted_files}
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-gray-900 dark:text-gray-400 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Image Preview */}
      <div className={`w-28 h-28 ${rounded} overflow-hidden border border-gray-300 bg-black flex items-center justify-center`}>
        {preview ? (
          <Image
            src={preview}
            alt="Profile preview"
            width={112} // Matches 7rem for w-28 and h-28
            height={112}
            className="object-cover"
          />
        ) : (
          <div className="text-sm text-white">No Image</div>
        )}
      </div>
    </div>
  );
}

export default ImageInputField;
