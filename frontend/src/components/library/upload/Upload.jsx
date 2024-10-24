"use client";
import React, { useState } from 'react';
import { uploadBook } from '@/API/uploadAPI';  // Import the upload API
import { toast } from 'react-hot-toast';  // For notifications
import { useRouter } from 'next/navigation';  // To handle navigation

function Upload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    genre: '',
    published_date: '',
    language: '',
    content: null,
    cover_art: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // Initialize the router for redirects

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadToast = toast.loading("Uploading book...");

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('author', formData.author);
    data.append('genre', formData.genre);
    data.append('published_date', formData.published_date);
    data.append('language', formData.language);
    data.append('content', formData.content);
    data.append('cover_art', formData.cover_art);

    try {
      await uploadBook(data);  // Call the API function
      toast.success('Book uploaded successfully!', { id: uploadToast });
      router.push('/my-books');  // Redirect to my-books page
    } catch (error) {
      toast.error(error.message || 'Failed to upload book', { id: uploadToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload a Book</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
          required
        />

        {/* Description */}
        <label className="block mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
          required
        />

        {/* Author */}
        <label className="block mb-2">Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
          required
        />

        {/* Genre */}
        <label className="block mb-2">Genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />

        {/* Published Date */}
        <label className="block mb-2">Published Date:</label>
        <input
          type="date"
          name="published_date"
          value={formData.published_date}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />

        {/* Language */}
        <label className="block mb-2">Language:</label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />

        {/* Content File */}
        <label className="block mb-2">Content (Book File):</label>
        <input
          type="file"
          name="content"
          onChange={handleFileChange}
          className="border p-2 mb-4 w-full"
          accept=".txt"
          required
        />

        {/* Cover Art */}
        <label className="block mb-2">Cover Art (Optional):</label>
        <input
          type="file"
          name="cover_art"
          onChange={handleFileChange}
          className="border p-2 mb-4 w-full"
          accept="image/png, image/jpeg"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Book'}
        </button>
      </form>
    </div>
  );
}

export default Upload;
