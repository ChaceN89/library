"use client";

import React, { useEffect, useState } from "react";
import { fetchBooks } from "@/API/booksAPI";
import { deleteBook } from "@/API/adminAPI"; // Import deleteBook API
import { toast } from "react-hot-toast";

function AdminBookSettings() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(""); // State for book search filter
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books when the component loads
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData.results || []); // Assuming `results` contains the array of books
        setFilteredBooks(booksData.results || []); // Initialize filteredBooks with all books
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch books");
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchId(value);

    if (value.trim() === "") {
      setFilteredBooks(books); // Reset to all books if search is cleared
    } else {
      const filtered = books.filter((book) =>
        book.id.toString().includes(value.trim())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
      toast.success("Book deleted successfully");
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      setFilteredBooks((prevFilteredBooks) =>
        prevFilteredBooks.filter((book) => book.id !== bookId)
      );
    } catch (error) {
      toast.error(error.message || "Failed to delete book");
    }
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchId}
          onChange={handleSearch}
          placeholder="Search by Book ID"
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="p-4 border rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-gray-600">ID: {book.id}</p>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Genre: {book.genre}</p>
              </div>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBookSettings;
