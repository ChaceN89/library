"use client"; // Marking this as a client component
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import { fetchBookDetails } from '@/API/editBookAPI'; // API call to get book details
import EditBook from './EditBookFields';
import DeleteBook from './DeleteBook';
import ChangeBookContent from './ChangeBookContent';
import { toast } from 'react-hot-toast';

function MyBookEdits() {
  const params = useParams(); // Using useParams hook to get the route params
  const { id } = params; // Extract the 'id' from the params
  const [book, setBook] = useState(null); // State to hold the book details
  const [loading, setLoading] = useState(true); // State to track loading

  // Function to refresh book details (after edits)
  const fetchBook = async () => {
    try {
      const bookData = await fetchBookDetails(id);
      setBook(bookData); // Set the book data
      setLoading(false); // Stop loading
    } catch (error) {
      toast.error('Failed to fetch book details');
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Fetch book details on component mount
  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>No book found with the given ID</p>;
  }

  return (
    <div>
      <h1>Edit Book</h1>


      {/* Components to edit, delete, and change book content */}
      <EditBook book={book} triggerRefresh={fetchBook} />
      <hr className='my-4'/>

      <ChangeBookContent bookId={book.id} triggerRefresh={fetchBook} />
      <hr className='my-4'/>
      <DeleteBook bookId={book.id} />
      <hr className='my-4'/>

      {/* Link to go back to My Books */}
      <Link href="/my-books">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4">
          Go Back to My Books
        </button>
      </Link>
    </div>
  );
}

export default MyBookEdits;
