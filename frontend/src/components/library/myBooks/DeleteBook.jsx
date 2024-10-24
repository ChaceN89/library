import React, { useState } from 'react';
import { deleteBook } from '@/API/editBookAPI';
import { toast } from 'react-hot-toast';

function DeleteBook({ bookId }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBook(bookId);
      toast.success('Book deleted successfully');
      // reroute eventually 
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  return (
    <div>
      {confirmDelete ? (
        <div c>
          <p>Are you sure you want to delete this book?</p>
          <div className='flex gap-2 '>

            <button className='bg-red-500 p-2 w-20' onClick={handleDelete}>Yes</button>
            <button className='bg-blue-500 p-2 w-20' onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setConfirmDelete(true)} className="bg-red-500 text-white p-2">Delete Book</button>
      )}
    </div>
  );
}

export default DeleteBook;
