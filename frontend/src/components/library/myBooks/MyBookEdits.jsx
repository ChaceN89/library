"use client"; // Marking this as a client component
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import { fetchBookDetails } from '@/API/editBookAPI'; // API call to get book details
import EditBookFields from './EditBookFields';
import DeleteBook from './DeleteBook';
import ChangeBookContent from './ChangeBookContent';
import { toast } from 'react-hot-toast';
import Image from 'next/image'; // Ensure you import the Next.js Image component
import { useRouter } from "next/navigation";
import { useProfileContext } from '@/context/ProfileContext';

import LoadingWheel from '@/components/loading/LoadingWheel';
import ErrorLoading from '@/components/loading/ErrorLoading';

 

function MyBookEdits() {
  const params = useParams(); // Using useParams hook to get the route params
  const { id } = params; // Extract the 'id' from the params
  const [book, setBook] = useState(null); // State to hold the book details
  const [loading, setLoading] = useState(true); // State to track loading

  const { isLoggedIn, isLoading } = useProfileContext();
  const router = useRouter();

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


// Need a redirect to the "/ page if not signed "


  // Fetch book details on component mount
  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]); // fetch should also change when I make edits to the book

  if (loading) {
    // loading wheel with mt-6 so its a bit lower
    return <p>Loading...</p>;
  }

  if (!book) {
    // replace with the errorLoading (message is a param)
    return <p>No book found with the given ID</p>;
  }

  return (
    <div>

      {/* Components to edit, delete, and change book content */}
      <EditBookFields book={book} triggerRefresh={fetchBook} />
      <hr className='my-4'/>

      <ChangeBookContent bookId={book.id} triggerRefresh={fetchBook} />
      <hr className='my-4'/>

            {/* Image for the book */}
            <h1 className='font-bold underline'>Book Cover</h1>
      <Image 
        src={book.cover_art_url} 
        alt={`Cover art for ${book.title}`} 
        width={400} 
        height={120} 
        className="rounded-lg"
      />

      <hr className='my-4'/>
      <DeleteBook bookId={book.id} />
      <hr className='my-4'/>
      {/* Link to go back to My Books */}
      <Link href="/my-books">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4">
          Go Back to My Books
        </button>
      </Link>
      <hr className='my-4'/>

    </div>
  );
}

export default MyBookEdits;
