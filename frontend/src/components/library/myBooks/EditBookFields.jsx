import React, { useState } from 'react';
import { updateBookDetails } from '@/API/editBookAPI'; // Import the API function for updating book details
import { toast } from 'react-hot-toast';

function EditBookFields({ book, triggerRefresh }) {
  const [editField, setEditField] = useState(null);  // To track which field is being edited
  const [formData, setFormData] = useState({
    title: book.title,
    description: book.description,
    author: book.author,
    genre: book.genre,
    published_date: book.published_date,
    language: book.language,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (field) => {
    try {
      await updateBookDetails(book.id, { [field]: formData[field] });
      toast.success(`${field} updated successfully`);
      triggerRefresh();  // Refresh the book details after update
      setEditField(null);
    } catch (error) {

      const errorMessage = error.response?.data?.detail || error.message || 'Unknown error occurred';
      toast.error(`Failed to update ${field}: ${errorMessage}`);    }
  };

  return (
    <div>
      {/* Title Section */}
      <div className="mt-4">
        <label className="block font-medium">Title</label>
        {editField === 'title' ? (
          <div className="space-y-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('title')}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{book.title}</p>
            <button className="text-blue-500" onClick={() => setEditField('title')}>Edit</button>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="mt-4">
        <label className="block font-medium">Description</label>
        {editField === 'description' ? (
          <div className="space-y-2">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('description')}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{book.description}</p>
            <button className="text-blue-500" onClick={() => setEditField('description')}>Edit</button>
          </div>
        )}
      </div>

      {/* Author Section */}
      <div className="mt-4">
        <label className="block font-medium">Author</label>
        {editField === 'author' ? (
          <div className="space-y-2">
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('author')}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{book.author}</p>
            <button className="text-blue-500" onClick={() => setEditField('author')}>Edit</button>
          </div>
        )}
      </div>

      {/* Genre Section */}
      <div className="mt-4">
        <label className="block font-medium">Genre</label>
        {editField === 'genre' ? (
          <div className="space-y-2">
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('genre')}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{book.genre}</p>
            <button className="text-blue-500" onClick={() => setEditField('genre')}>Edit</button>
          </div>
        )}
      </div>

      {/* Published Date Section */}
      <div className="mt-4">
        <label className="block font-medium">Published Date</label>
        {editField === 'published_date' ? (
          <div className="space-y-2">
            <input
              type="date"
              name="published_date"
              value={formData.published_date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('published_date')}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{book.published_date}</p>
            <button className="text-blue-500" onClick={() => setEditField('published_date')}>Edit</button>
          </div>
        )}
      </div>

      {/* Language Section */}
      <div className="mt-4">
        <label className="block font-medium">Language</label>
        {editField === 'language' ? (
          <div className="space-y-2">
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate('language')}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{book.language}</p>
            <button className="text-blue-500" onClick={() => setEditField('language')}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditBookFields;
