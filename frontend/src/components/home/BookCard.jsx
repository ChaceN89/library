import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookCardTitle from './BookCardTitle';
import { bookCardData } from '@/data/bookCardData';

function BookCard({ book }) {
  const bookLink = `/book/${book.id}/${book.title.toLowerCase()}`;

  return (
    <li
      key={book.id}
      onClick={() => (window.location.href = bookLink)} // Navigate to book link when clicking anywhere on the card
      className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 shadow-lg flex flex-col md:flex-row gap-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      {/* Title for Smal Screens */}
      <BookCardTitle book={book} showOnSmallScreens={true} showOnLargeScreens={false} />

      <div className="w-full md:w-1/3 aspect-[3/4] bg-gray-300 rounded-lg overflow-hidden relative flex-shrink-0">
        <Image
          src={book.cover_art_url || bookCardData.defaultImg}
          alt={`Cover art for ${book.title || 'Default Cover'}`}
          className="rounded-lg object-cover w-full h-full border border-dashed border-black border-opacity-10"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority // Ensures images load faster
        />
      </div>

      {/* Book Details */}
      <div
        className="flex flex-col flex-grow gap-2 md:w-2/3"
        onClick={(e) => e.stopPropagation()} // Prevent card navigation when interacting with internal elements
      >
        {/* Title for Large Screens */}
        <BookCardTitle book={book} showOnSmallScreens={false} showOnLargeScreens={true} />

        {/* Book Author */}
        <p className="text-gray-600 text-sm font-semibold">{book.author}</p>

        {/* Additional Book Details */}
        <p className="text-gray-600 text-sm">Views: {book.views}</p>
        <p className="text-gray-600 text-sm">Downloads: {book.downloads}</p>
        <p className="text-gray-600 text-sm">
          Last updated: {new Date(book.updated_at).toLocaleDateString()}
        </p>

      </div>
    </li>
  );
}

export default BookCard;
