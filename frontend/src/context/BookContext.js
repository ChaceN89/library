/**
 * @file BookContext.js
 * @module BookContext
 * @description 
 *   Context provider for managing book-related state, including content, file types, and reader settings. 
 *   Handles fetching book data, managing pagination, and storing reader preferences.
 *
 * @requires React
 * @requires @data/bookData - Contains default reader settings and MIME type mappings.
 * @requires @API/booksAPI - API functions for fetching book data and updating view counts.
 * @requires @utils/replaceURL - Utility function for formatting book titles in URLs.
 * @requires next/navigation - Next.js router for navigation and redirection.
 * 
 * @context BookContext
 * @component BookProvider
 * @hook useBookContext
 *
 * @example
 * // Wrap your application with the provider:
 * import { BookProvider } from '@/context/BookContext';
 * 
 * function App() {
 *   return (
 *     <BookProvider>
 *       <YourApp />
 *     </BookProvider>
 *   );
 * }
 * 
 * @example
 * // Access context in a component:
 * import { useBookContext } from '@/context/BookContext';
 * 
 * function BookComponent() {
 *   const { book, fetchBook } = useBookContext();
 *   // Use book data or fetch a book
 * }
 * 
 * @exports BookProvider
 * @exports useBookContext
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */
"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { bookReaderData, mimeToFileType } from "@/data/bookData"; // Import default lines per page and MIME types
import { fetchBookById, incrementViews } from "@/API/booksAPI";
import { formatURL } from "@/utils/replaceURL";
import { useRouter } from "next/navigation";

// Create the BookContext
const BookContext = createContext();

// Provider component
export const BookProvider = ({ children }) => {
  const router = useRouter();

  // Book with its error and laoding state
  const [book, setBook] = useState(null); // Book data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  
  // Content for file and file display 
  const [fileType, setFileType] = useState(""); // File type for the content
  const [fileTypeDisplay, setFileTypeDisplay] = useState(""); // Display-friendly file type
  const [content, setContent] = useState(""); // Raw book content
  
  // The reader infomation 
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [linesPerPage, setLinesPerPage] = useState(bookReaderData.defaultLinesPerPage); // Lines per page with default
  const [pages, setPages] = useState([]); // Split content into pages
  const [readerError, setReaderError] = useState(false); // Current page

  // Fetch book data and update state
  const fetchBook = async (id, title) => {
    try {
      setLoading(true);
      setError(null);
  
      const bookData = await fetchBookById(id);
      if (bookData) {
        setBook(bookData);
        await incrementViews(id);
  
        // Redirect to correct URL if the title in the URL doesn't match the fetched book title
        if (formatURL(bookData.title) !== title.toLowerCase()) {
          router.replace(`/book/${id}/${formatURL(bookData.title)}`);
        }
  
        // Fetch file type and content only if book data is valid
        await fetchContent(bookData)
      } else {
        throw new Error("Book data not found.");
      }
    } catch (err) {
      console.error("Error fetching book:", err);
      setError(err.message || "Failed to load book data.");
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch book content
  const fetchContent = async (bookData) => {
    if (!bookData?.content_url){
      console.log("The whole this is for nothign and nothng anthong ")
      return;
    } 

    try {
      const response = await fetch(bookData.content_url);
      if (!response.ok) {
        throw new Error("Failed to fetch book content.");
      }
      // Get the rest of the infomation 
      const type = response.headers.get("Content-Type");
      const text = await response.text();
      const displayInfo = mimeToFileType[type] || { fileName: "Unknown File", extension: "unknown" };

      setContent(text);
      setFileType(type)
      setFileTypeDisplay(displayInfo)
      splitContent(text, linesPerPage); // Split content into pages
      setReaderError(false)
    } catch (err) {
      console.error("Error fetching book content:", err);
      setReaderError(true)
    }
  };



 // Split content into pages
 const splitContent = (text, lines) => {
  const splitPages = text
    .split("\n")
    .reduce((acc, line, idx) => {
      const pageIndex = Math.floor(idx / lines);
      acc[pageIndex] = (acc[pageIndex] || "") + `${line}\n`;
      return acc;
    }, []);
  setPages(splitPages);
};

useEffect(() => {
  if (content) {
    splitContent(content, linesPerPage);
  }
}, [content, linesPerPage]);

// Save current page and linesPerPage to localStorage
useEffect(() => {
  if (book?.id) {
    const storedData = JSON.parse(localStorage.getItem("bookState")) || {};
    storedData[book.id] = { currentPage, linesPerPage };
    localStorage.setItem("bookState", JSON.stringify(storedData));
  }
}, [currentPage, linesPerPage, book]);


  return (
    <BookContext.Provider
      value={{
        // book with loading states
        book,
        loading,
        error,
        fetchBook,
        
        // reader settings
        currentPage,
        setCurrentPage,
        linesPerPage,
        setLinesPerPage,
        pages,

        //content and file types
        fileType,
        fileTypeDisplay,
        content,
        readerError
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

// Hook to use the BookContext
export const useBookContext = () => {
  return useContext(BookContext);
};
