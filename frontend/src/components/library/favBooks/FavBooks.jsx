"use client";
import React, { useEffect, useState } from 'react';
import { fetchFavBooks } from '@/API/favBooksAPI';
import BookCard from '../BookCard';
import { toast } from 'react-hot-toast';  // For notifications

function FavBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');  // State to handle sorting option

  // Fetch favorite books on component load
  useEffect(() => {
    const loadFavBooks = async () => {
      try {
        const favBooks = await fetchFavBooks();  // Fetch favorite books
        setBooks(favBooks);
      } catch (error) {
        toast.error('Failed to load favorite books');
        console.error('Error loading favorite books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavBooks();
  }, []);

  // Simple sorting handler (you can expand this for more sorting options)
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    if (option === 'title') {
      const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
      setBooks(sortedBooks);
    } else if (option === 'author') {
      const sortedBooks = [...books].sort((a, b) => a.author.localeCompare(b.author));
      setBooks(sortedBooks);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorite Books</h1>

      {/* Sorting Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSort} className="border p-2">
          <option value="">Select</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="gap-4 grid grid-cols-3">
          {books.length > 0 ? (
            books.map((book) => <BookCard inFavSection={true} key={book.id} book={book} />)
          ) : (
            <p>No favorite books found</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default FavBooks;
