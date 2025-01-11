/**
 * @file BookCard.jsx
 * @module BookCard
 * @description A reusable React component that displays information about a book, including its title, author, views, downloads, and cover art. The component supports a loading state with placeholders for content and a loading wheel for the image.
 *
 * @component BookCard
 * 
 * @param {Object} book - The book object containing details such as title, author, views, downloads, and cover image URL.
 * @param {boolean} loading - Indicates whether the content is currently loading.
 * 
 * @requires react
 * @requires next/image - For rendering optimized images.
 * @requires BookCardTitle from "./BookCardTitle" - Subcomponent for rendering the book title and favorite button.
 * @requires bookCardData from "@/data/bookCardData" - Contains default data like fallback image URLs and blur placeholders.
 * @requires LoadingWheel from "../loading/LoadingWheel" - Displays a spinner while the image is loading.
 * 
 * @description
 * - Displays book details and handles navigation to the book's detail page.
 * - Shows a loading spinner for the image and placeholder text while loading.
 * - Prevents interaction when in a loading state.
 * 
 * @notes
 * - The card adapts to both small and large screens using responsive design.
 * - BookCardTitle is rendered twice for different screen sizes.
 * 
 * @example
 * <BookCard book={book} loading={true} />
 * 
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-08
 */

import React from 'react';
import Image from 'next/image';
import BookCardTitle from './BookCardTitle';
import { bookCardData } from '@/data/bookCardData';
import LoadingWheel from '../loading/LoadingWheel';

function BookCard({ book, loading }) {
  const bookLink = loading
    ? "#"
    : `/book/${book.id}/${book.title?.toLowerCase()}`;
    
  const handleCardClick = (e) => {

    if (loading) return;
    if (!e.defaultPrevented) {
      console.log("click Book");
      window.location.href = bookLink;
    }
  };

  return (
    <li
      key={book.id}
      onClick={handleCardClick}
      className="card-background 
        flex flex-col md:flex-row gap-4 cursor-pointer
        hover:shadow-accent dark:hover:shadow-primary-dark 
        transition-shadow"
    >
      <BookCardTitle
        book={book}
        loading={loading}
        showOnSmallScreens={true}
        showOnLargeScreens={false}
      />

      <div className="w-full md:w-1/3 aspect-[3/4] bg-gray-300 rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center">
        {loading ? (
          <LoadingWheel className="h-12 w-12" />
        ) : (
          <Image
            src={book.cover_art_url || bookCardData.defaultImg}
            alt={`Cover art for ${book.title || 'Default Cover'}`}
            className="rounded-lg object-cover w-full h-full border border-dashed border-black border-opacity-10"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            priority
            placeholder="blur"
            blurDataURL={bookCardData.blurURL}
          />
        )}
      </div>

      <div
        className="flex flex-col flex-grow gap-2 md:w-2/3"
        onClick={(e) => e.stopPropagation()}
      >
        <BookCardTitle
          book={book}
          loading={loading}
          showOnSmallScreens={false}
          showOnLargeScreens={true}
        />
        <p>{loading ? '...' : book.author}</p>
        <p>{loading ? '...' : `Views: ${book.views}`}</p>
        <p>{loading ? '...' : `Downloads: ${book.downloads}`}</p>
        <p>
          {loading
            ? '...'
            : `Last updated: ${new Date(book.updated_at).toLocaleDateString()}`}
        </p>
      </div>
    </li>
  );
}

export default BookCard;
