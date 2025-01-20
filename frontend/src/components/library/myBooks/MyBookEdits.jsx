/**
 * @file MyBookEdits.jsx
 * @module MyBookEdits
 * @description Component for managing book edits, including details, content, and deletion.
 * @requires React
 * @requires fetchBookDetails - API function to fetch book details.
 * @requires EditBookFields - Component for editing book details like title, author, etc.
 * @requires ChangeBookContent - Component for updating book files (cover and content).
 * @requires DeleteBook - Component for deleting the book.
 */

"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchBookDetails } from '@/API/editBookAPI';
import EditBookFields from './EditBookFields';
import ChangeBookContent from './ChangeBookContent';
import DeleteBook from './DeleteBook';
import { useProfileContext } from '@/context/ProfileContext';
import LoadingWheel from '@/components/loading/LoadingWheel';
import ErrorLoading from '@/components/loading/ErrorLoading';

function MyBookEdits() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, isLoading } = useProfileContext();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch book details
  const fetchBook = async () => {
    setLoading(true);
    try {
      const data = await fetchBookDetails(id);
      setBook(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to homepage if not logged in
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    if (id) fetchBook();
  }, [id, fetchBook]);

  if (loading) {
    return <div className="mt-6"><LoadingWheel /></div>;
  }

  if (error || !book) {
    return <ErrorLoading message="Failed to load book details. Please try again later." />;
  }

  return (
    <div className="space-y-6">
            <h3 className="text-lg font-semibold my-4">Title: {book.title}</h3>

      <EditBookFields book={book} triggerRefresh={fetchBook} />
      <ChangeBookContent bookId={book.id} triggerRefresh={fetchBook} coverArt={book?.cover_art_url} />
      <DeleteBook bookId={book.id} />
    </div>
  );
}

export default MyBookEdits;
