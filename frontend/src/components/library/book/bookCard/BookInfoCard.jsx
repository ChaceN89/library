/**
 * @file BookInfoCard.jsx
 * @module BookInfoCard
 * @description 
 *   A reusable component for displaying detailed information about a book. Includes cover art, 
 *   metadata (e.g., title, author, genre, views, downloads), and links for viewing or editing the book.
 * 
 * @requires React
 * @requires next/image - For optimized image rendering.
 * @requires bookCardData - Default data for book cards, including fallback images.
 * @requires LoadingWheel - Component for displaying a loading spinner.
 * @requires Link from "next/link" - For navigation to other pages.
 * 
 * @component BookInfoCard
 * 
 * @param {Object} book - The book object containing its details (e.g., title, author, cover image URL).
 * @param {boolean} loading - Indicates whether the data is currently loading.
 * 
 * @example
 * // Usage in a book list
 * import BookInfoCard from "@/components/book/bookCard/BookInfoCard";
 * 
 * export default function MyBooks() {
 *   return <BookInfoCard book={bookData} loading={false} />;
 * }
 * 
 * @author Chace Nielson
 * @created 2025-01-16
 * @updated 2025-01-16
 */

import React from 'react';
import Image from 'next/image';
import { bookCardData } from '@/data/bookCardData';
import LoadingWheel from '@/components/loading/LoadingWheel';
import Link from 'next/link';

function BookInfoCard({ book, loading }) {
  const bookLink = loading
    ? "#"
    : `/book/${book.id}/${book.title?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <li
      key={book.id}
      className="flex gap-4 p-4 card-background border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Book Cover */}
      <div className="relative w-36 h-48 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0">
        {loading ? (
          <LoadingWheel className="h-12 w-12" />
        ) : (
          <Image
            src={book.cover_art_url || bookCardData.defaultImg}
            alt={`Cover art for ${book.title || 'Default Cover'}`}
            className="object-cover w-full h-full"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
            priority
            placeholder="blur"
            blurDataURL={bookCardData.blurURL}
          />
        )}
      </div>

      {/* Book Info */}
      <div className="flex flex-col justify-between flex-grow">
        {/* Book Title */}
        <h5 className='underline'>{loading ? "Loading..." : book.title || "Unknown Title"}</h5>

        {/* Metadata */}
        <div className="text-sm space-y-1">
          <p>
            <span className="font-semibold">Author:</span> {loading ? "Loading..." : book.author || "Unknown Author"}
          </p>
          <p>
            <span className="font-semibold">Genre:</span> {loading ? "Loading..." : book.genre || "Not Specified"}
          </p>
          <p>
            <span className="font-semibold">Language:</span> {loading ? "Loading..." : book.language || "Not Specified"}
          </p>
          <p>
            <span className="font-semibold">Views:</span> {loading ? "Loading..." : book.views || 0}
          </p>
          <p>
            <span className="font-semibold">Downloads:</span> {loading ? "Loading..." : book.downloads || 0}
          </p>
          <p>
            <span className="font-semibold">Last Updated:</span> {loading ? "Loading..." : new Date(book.updated_at).toLocaleDateString()}
          </p>
        </div>

        {/* Actions (Optional) */}
        <div className="mt-2">
          {!loading && (
            <div className='flex items-center gap-2'>
              <Link href={bookLink} passHref>
                <div className="text-blue-500 hover:underline">View Details</div>
              </Link>
              |
              <Link href={`/my-books/edit/${book.id}`} passHref>
                <div className="text-blue-500 hover:underline">Edit Book</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default BookInfoCard;
