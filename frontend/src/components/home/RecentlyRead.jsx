/**
 * @file RecentlyRead.jsx
 * @module RecentlyRead
 * @description 
 *   Component for displaying a list of recently read books. The data is fetched from localStorage
 *   and includes functionality to navigate to a specific book or remove it from the list.
 *
 * @requires React
 * @requires next/navigation - Next.js router for navigation and redirection.
 * @requires react-icons/fa - Trash icon for removing books from the list.
 * 
 * @component RecentlyRead
 *
 * @example
 * // Import and use the RecentlyRead component in your application:
 * import RecentlyRead from '@/components/RecentlyRead';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <RecentlyRead />
 *     </div>
 *   );
 * }
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

function RecentlyRead() {
  const [recentBooks, setRecentBooks] = useState([]);
  const router = useRouter();

  // Load recently read books from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bookStates")) || {};
    const booksArray = Object.entries(storedData)
      .map(([id, data]) => ({
        id,
        ...data,
      }))
      .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)); // Sort by most recent
    setRecentBooks(booksArray);
  }, []);

  /**
   * Removes a book from the recently read list and updates localStorage and state.
   * @param {string} id - The ID of the book to remove.
   */
  const removeBook = (id) => {
    const storedData = JSON.parse(localStorage.getItem("bookStates")) || {};
    delete storedData[id]; // Remove the book by ID
    localStorage.setItem("bookStates", JSON.stringify(storedData)); // Update localStorage
    setRecentBooks(recentBooks.filter((book) => book.id !== id)); // Update state
  };

  if (recentBooks.length === 0) {
    return <p className="text-gray-500">No recently read books found.</p>;
  }

  return (
    <div className="card-background p-4 mt-6">
      <h2 className="text-lg font-bold mb-4">Recently Read Books</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {recentBooks.map((book) => (
          <li
            key={book.id}
            className="relative p-2 border bg-primary dark:bg-secondary rounded-md hover:bg-gray-600 cursor-pointer flex flex-col justify-between"
          >
            <div
              onClick={() => router.push(`/book/${book.id}/${encodeURIComponent(book.name)}`)}
              className="cursor-pointer"
            >
              <div className="flex gap-1 items-center">
                <h5 className="font-semibold truncate">{book.name}</h5>
                <p className="text-sm">- Page: {book.currentPage + 1}</p>
              </div>
              <p className="text-xs mt-0.5">
                Last Read: {new Date(book.timeStamp).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => removeBook(book.id)}
              className="absolute bottom-2 right-2 text-red-500 text-sm hover:text-red-800 hover:scale-110 hover:bg-black dark:hover:bg-white rounded-full p-1"
              aria-label="Remove from recently read"
            >
              <FaRegTrashAlt size={22} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyRead;
