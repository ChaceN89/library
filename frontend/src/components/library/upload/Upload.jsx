/**
 * @file UploadPage.jsx
 * @module UploadPage
 * @description
 *   This component renders the Upload Page, which includes a background wrapper
 *   and the main upload functionality. The page is styled with a background image
 *   and uses the Upload component for book uploading capabilities.
 * 
 * @requires react
 * @requires @/components/library/upload/Upload
 * @requires @/components/wrappers/BackgroundWrapper
 * @requires @/data/authData
 *
 * @example
 * // Example usage of UploadPage
 * import UploadPage from "@/app/upload/UploadPage";
 * 
 * <UploadPage />
 *
 * @author Chace Nielson
 * @created 2025-01-18
 * @updated 2025-01-18
 */

"use client";
import React, { useState } from "react";
import { uploadBook } from "@/API/uploadAPI";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ACCEPTED_FILES } from "@/globals";
import { useProfileContext } from "@/context/ProfileContext";
import LoginForm from "@/components/auth/LoginForm";
import InputField from "@/components/general/inputs/InputField";
import SubmitButton from "@/components/general/inputs/SubmitButton";
import ImageInputField from "@/components/general/inputs/ImageInputField";

function Upload() {
  const { isLoggedIn } = useProfileContext();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    genre: "",
    published_date: "",
    language: "",
    content: null,
    cover_art: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadToast = toast.loading("Uploading book...");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("author", formData.author || "");
    data.append("genre", formData.genre || "");
    data.append("published_date", formData.published_date || "");
    data.append("language", formData.language || "");
    data.append("content", formData.content);

    if (formData.cover_art) {
      data.append("cover_art", formData.cover_art);
    }

    try {
      await uploadBook(data);
      toast.success("Book uploaded successfully!", { id: uploadToast });
      router.push("/my-books");
    } catch (error) {
      toast.error(error.message || "Failed to upload book", { id: uploadToast });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn && !loading) {
    return (
      <LoginForm isPopup onClose={() => router.push("/")} reRouteTo={null} />
    );
  }

  return (
    <div className="card-background p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto my-6">
      <h1 className="text-2xl font-bold text-center mb-6">Upload a Book</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Title */}
        <InputField
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-secondary"
            rows="4"
            style={{ minHeight: "4rem", maxHeight: "10rem" }}
            maxLength={300}
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            {formData.description.length}/300 characters
          </p>
        </div>

        {/* Author, Genre, Published Date, Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <InputField
            type="text"
            name="genre"
            placeholder="Genre (Optional)"
            value={formData.genre}
            onChange={handleChange}
          />
          <InputField
            type="date"
            name="published_date"
            value={formData.published_date}
            onChange={handleChange}
          />
          <InputField
            type="text"
            name="language"
            placeholder="Language (Optional)"
            value={formData.language}
            onChange={handleChange}
          />
        </div>

       {/* Content File and Cover Art */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="flex flex-col items-start justify-center">
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Book File (Required):
            </label>
            <input
              type="file"
              name="content"
              onChange={handleFileChange}
              className="border p-2 rounded-md w-full text-secondary"
              accept={ACCEPTED_FILES}
              required
            />
            {formData.content && (
              <p className="mt-2 text-sm text-gray-600 text-center">
                Selected File: {formData.content.name}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <ImageInputField
              label="Cover Art (Optional):"
              name="cover_art"
              accepted_files={"image/png, image/jpeg"}
              onChange={handleFileChange}
              rounded="rounded-lg"
            />
          </div>
        </div>


        {/* Submit Button */}
        <SubmitButton
          label={loading ? "Uploading..." : "Upload Book"}
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default Upload;
