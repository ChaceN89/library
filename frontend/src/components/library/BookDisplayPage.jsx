
// src/components/library/BookDisplayPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchBookById } from '@/API/books';
import Image from 'next/image';
import BookComments from './BookComments';

function BookDisplayPage({ id }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      const data = await fetchBookById(id);
      if (data) {
        setBook(data);
      }
      setLoading(false);
    };
    loadBook();
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="p-4">
      {/* Book Cover Art */}
      {book.cover_art_url ? (
        <Image 
          src={book.cover_art_url} 
          alt={`Cover art for ${book.title}`} 
          width={200} 
          height={300} 
          className="rounded-lg"
        />
      ) : (
        <div className="w-48 h-72 bg-gray-300 rounded-lg flex items-center justify-center">
          <span>No Cover - use Default book cover instead</span>
        </div>
      )}

      {/* Book Title */}
      <h1 className="text-2xl font-bold mt-4">{book.title}</h1>

      {/* Book Content URL */}
      {book.content_url && (
        <p className="text-blue-600 mt-2">
          <a href={book.content_url} target="_blank" rel="noopener noreferrer">
            View Content
          </a>
        </p>
      )}

      {/* Timestamps */}
      <p className="text-gray-500 mt-2">Created at: {new Date(book.created_at).toLocaleDateString()}</p>
      <p className="text-gray-500 mt-2">Last updated: {new Date(book.updated_at).toLocaleDateString()}</p>

      {/* Book Owner Info */}
      <p className="text-gray-600 mt-2">Owner: {book.owner_username}</p>
        
        {/* Book Comments */}
      <BookComments bookId={id} />
    </div>
  );
}

export default BookDisplayPage;
