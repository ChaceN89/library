/**
 * @file EditBookFields.jsx
 * @module EditBookFields
 * @description Component for editing book metadata, such as title, description, author, genre, published date, and language.
 * @requires React
 * @requires updateBookDetails - API function to update book details.
 * @requires InputField - Reusable input field component for handling user input.
 * @requires toast - Library for user-friendly notifications.
 */

import React, { useState } from 'react';
import { updateBookDetails } from '@/API/editBookAPI';
import { toast } from 'react-hot-toast';
import InputField from '@/components/general/inputs/InputField';

function EditBookFields({ book, triggerRefresh }) {
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    title: book.title,
    description: book.description,
    author: book.author,
    genre: book.genre,
    published_date: book.published_date,
    language: book.language,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (field) => {
    try {
      await updateBookDetails(book.id, { [field]: formData[field] });
      toast.success(`${field} updated successfully`);
      setEditField(null);
      triggerRefresh();
    } catch (error) {
      toast.error(`Failed to update ${field}: ${error.message}`);
    }
  };

  const renderEditableField = (label, field, type = "text") => (
    <div className="mt-4">
      <label className="block font-medium">{label}</label>
      {editField === field ? (
        <div className="space-y-2">
          <InputField
            type={type}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={() => handleUpdate(field)}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2"
              onClick={() => setEditField(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>{formData[field]}</p>
          <button
            className="text-blue-500"
            onClick={() => setEditField(field)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {renderEditableField("Title", "title")}
      {renderEditableField("Description", "description", "textarea")}
      {renderEditableField("Author", "author")}
      {renderEditableField("Genre", "genre")}
      {renderEditableField("Published Date", "published_date", "date")}
      {renderEditableField("Language", "language")}
    </div>
  );
}

export default EditBookFields;
