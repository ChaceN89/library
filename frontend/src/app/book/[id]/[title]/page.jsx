"use client";  // Add this directive to make it a Client Component

import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import BookDisplayPage from '@/components/library/BookDisplay';
import { fetchBookById } from '@/API/books';

function BookPage() {
  const params = useParams();
  const { id, title } = params;
  const router = useRouter();

  const [book, setBook] = React.useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const bookData = await fetchBookById(id);
      if (bookData) {
        setBook(bookData);

        // Redirect to correct URL if title in URL doesn't match the fetched book title
        if (bookData.title.toLowerCase() !== title.toLowerCase()) {
          router.replace(`/book/${id}/${bookData.title.toLowerCase()}`);
        }
      }
    };
    loadBook();
  }, [id, title, router]);

  if (!id || !book) {
    return <p>Loading...</p>;
  }

  return <BookDisplayPage id={id} />;
}

export default BookPage;
