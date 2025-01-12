/**
 * @file BookCard.jsx
 * @module BookCard
 * @description 
 *   A reusable React component that displays a book's cover, title, and author, along with a favorite toggle button. 
 *   Supports a loading state with placeholders and integrates navigation to the book's detail page.
 *
 * @component BookCard
 * 
 * @param {Object} book - The book object containing details such as title, author, cover image URL, and ID.
 * @param {boolean} loading - Indicates whether the data is currently loading.
 * 
 * @requires react
 * @requires next/image - For rendering optimized images.
 * @requires LoadingWheel from "../loading/LoadingWheel" - Component to show a spinner during loading.
 * @requires Link from "next/link" - For navigation to the book detail page.
 * @requires SetFavBook from "../library/favBooks/SetFavBook" - Component for toggling favorite status of a book.
 * @requires bookCardData from "@/data/bookCardData" - Default data for the book card, including fallback images.
 *
 * @description
 * - Displays a clickable card with a book's title, author, and cover image.
 * - Shows a favorite toggle button in the top-right corner of the book cover.
 * - Handles loading states with placeholders and a spinner for the cover image.
 * 
 * @example
 * <BookCard book={bookData} loading={false} />
 * 
 * @author Chace Nielson
 * @created 2025-01-12
 * @updated 2025-01-12
 */

import React from 'react';
import Image from 'next/image';
import LoadingWheel from '../loading/LoadingWheel';
import Link from 'next/link';
import SetFavBook from '../library/favBooks/SetFavBook';
import { bookCardData } from '@/data/bookCardData';

function BookCard({ book, loading }) {
  const bookLink = `/book/${book.id}/${book.title?.toLowerCase()}`;

  return (
    <div className="card-background card-background-hover overflow-hidden border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-shadow">
      {/* Navigation Link */}
      <Link href={loading ? "#" : bookLink} passHref>
        <div className="cursor-pointer">
          {/* Book Cover */}
          <div className="relative w-full aspect-[3/4] bg-gray-300 overflow-hidden flex items-center justify-center">
            {loading ? (
              <LoadingWheel className="h-12 w-12" />
            ) : (
              <Image
                src={book.cover_art_url || bookCardData.defaultImg}
                alt={`Cover art for ${book.title || 'Default Cover'}`}
                className="object-cover w-full h-full"
                width={300}
                height={400}
              />
            )}
            {!loading && (
              <div className="absolute top-2 right-2">
                <SetFavBook id={book.id} bookTitle={book.title} />
              </div>
            )}
          </div>

          {/* Book Title and Author */}
          <div className="p-2 text-left overflow-hidden">
            <h5 className="truncate">
              {loading ? 'Title...' : book.title || 'Unknown Title'}
            </h5>
            <p className="truncate">
              {loading ? 'Author...' : book.author || 'Unknown Author'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
