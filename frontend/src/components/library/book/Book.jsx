/**
 * @file Book.jsx
 * @module Book
 * @description
 *   Handles fetching and rendering details for a specific book. 
 *   Displays loading and error states as needed.
 * 
 * @requires react
 * @requires next/navigation
 * @requires fetchBookById from "@/API/booksAPI"
 * @requires ErrorLoading from "@/components/loading/ErrorLoading"
 * @requires LoadingWheel from "@/components/loading/LoadingWheel"
 * 
 * @example
 * <Book id="123" title="example-title" />
 * 
 * @author Chace Nielson
 * @created 2025-01-12
 * @updated 2025-01-12
 */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBookById, incrementViews } from "@/API/booksAPI";
import ErrorLoading from "@/components/loading/ErrorLoading";
import LoadingWheel from "@/components/loading/LoadingWheel";
import BookInfomationDisplay from "./BookInfomationDisplay";
import BookComments from "./comments/BookComments";
import BookReader from "./BookReader";
import { formatURL } from "@/utils/replaceURL";

function Book({ id, title }) {
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError(false);

      try {
        const bookData = await fetchBookById(id);
        if (bookData) {
          
          setBook(bookData); // set the books data 
          await incrementViews(id);// Increament this books views

          // Redirect to correct URL if title in URL doesn't match the fetched book title
          // compare the URl to the actual data
          if (formatURL(bookData.title) !== title.toLowerCase()) {
            router.replace(`/book/${id}/${formatURL(bookData.title)}`);            
          }
        } else {
          setError(true); // No book found
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id, title, router]);

  if (error) {
    return (
      <ErrorLoading
        className ="mt-10"
        message={`Unable to load the book\n ${id}/${title}. Please try again later or check the URL.`}
      />
    );
  }

  return (
    <div className="">
      <BookInfomationDisplay book={book} loading={loading}/>

      <BookReader book={book} />
 
      {loading ?(
        <LoadingWheel/>
      ):(
        book && <BookComments bookId={book.id} />
      )}
    </div>
  );
}

export default Book;


