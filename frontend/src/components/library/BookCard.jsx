import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function BookCard({ book }) {
  return (
    <li key={book.id} className="border rounded-lg p-4 mb-4 shadow-lg flex ">
      {/* Book Cover Image */}
      <Link href={`/library/book/${book.title.toLowerCase()}/${book.id}`} passHref>
        <div className="cursor-pointer">
          {book.cover_art_url ? (
            <Image 
              src={book.cover_art_url} 
              alt={`Cover art for ${book.title}`} 
              width={200} 
              height={300} 
              className="rounded-lg"
            />
          ) : (
            <div className="w-48 h-72 bg-gray-300 rounded-lg flex items-center justify-center">
              <span>No Cover</span>
            </div>
          )}
        </div>
      </Link>

      <div className='px-2 flex flex-col gap-2'>
        {/* Book Title */}
        <Link href={`/library/book/${book.title.toLowerCase()}/${book.id}`} passHref>
          <p className="text-xl font-bold text-blue-600 hover:underline mt-2 cursor-pointer">
            {book.title}
          </p>
        </Link>

        {/* Last Updated Tag */}
        <p className="text-gray-500 text-sm mt-2">
          Last updated at: {new Date(book.updated_at).toLocaleDateString()}
        </p>
      </div>
    </li>
  );
}

export default BookCard;
