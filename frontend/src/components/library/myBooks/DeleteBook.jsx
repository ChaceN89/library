/**
 * @file DeleteBook.jsx
 * @module DeleteBook
 * @description Component for deleting a book with confirmation modal support.
 * @requires React
 * @requires deleteBook - API function to delete the specified book.
 * @requires useRouter - Next.js hook for client-side navigation.
 * @requires toast - Library for user-friendly notifications.
 */

import React, { useState } from 'react';
import { deleteBook } from '@/API/editBookAPI';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

function DeleteBook({ bookId }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleDelete = async () => {
    try {
      await deleteBook(bookId);
      toast.success('Book deleted successfully');
      router.push('/my-books'); // Reroute to the My Books page
    } catch (error) {
      toast.error('Failed to delete book');
    } finally {
      setConfirmDelete(false);
    }
  };

  return (
    <div>
      {/* Trigger Delete Confirmation */}
      <button
        onClick={() => setConfirmDelete(true)}
        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
      >
        Delete Book
      </button>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteBook;
