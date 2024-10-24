import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function MyBooksList({ books }) {
  return (
    <ul className="list-none p-0">
      {books.map((book) => (
        <li key={book.id} className="border p-4 mb-4 rounded-lg shadow-md flex gap-4">
          {/* Display the cover art small */}
          <div className="flex-shrink-0">
            {book.cover_art_url ? (
              <Image 
                src={book.cover_art_url} 
                alt={`Cover art for ${book.title}`} 
                width={80} 
                height={120} 
                className="rounded-lg"
              />
            ) : (
              <div className="w-20 h-28 bg-gray-300 rounded-lg flex items-center justify-center">
                <span>No Cover</span>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">Downloads: {book.downloads}</p>
            <p className="text-sm text-gray-600">Views: {book.views}</p>

            {/* View book details page */}
            <Link href={`/book/${book.id}/${book.title.toLowerCase()}`} passHref>
              <div className="text-blue-500 hover:underline">View Book</div>
            </Link>

            {/* Go to edit page for the book */}
            <Link href={`/my-books/edit/${book.id}`} passHref>
              <div className="text-blue-500 hover:underline">Edit Book</div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MyBooksList;
