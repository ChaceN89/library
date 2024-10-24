"use client";
import React, { useEffect, useState } from 'react';
import { fetchMyBooks } from '@/API/myBooksAPI';  // Ensure the path is correct
import MyBooksList from './MyBooksList';  // Import the list component
import { toast } from 'react-hot-toast';  // For notifications

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyBooks = async () => {
      try {
        const myBooks = await fetchMyBooks();
        setBooks(myBooks);
      } catch (error) {
        toast.error(error.message);
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMyBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MyBooksList books={books} />  // Pass books to the list component
      )}
    </div>
  );
};

export default MyBooks;
