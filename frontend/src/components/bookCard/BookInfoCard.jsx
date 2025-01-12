
import React from 'react';
import Image from 'next/image';
import BookCardTitle from './BookCardTitle';
import { bookCardData } from '@/data/bookCardData';
import LoadingWheel from '../loading/LoadingWheel';

function BookInfoCard({ book, loading }) {
  const bookLink = loading
    ? "#"
    : `/book/${book.id}/${book.title?.toLowerCase()}`;

  return (
    <li
      key={book.id}
      className="card-background hover:shadow-accent dark:hover:shadow-primary-dark transition-shadow"
    >
      <div
        href={bookLink}
        passHref
        className="flex flex-col md:flex-row gap-4 cursor-pointer"
      >
        <div>{book.title}</div>

        <div className="w-full h-full md:w-1/3 aspect-[3/4] bg-gray-300 rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center">
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
          className="flex flex-col flex-grow gap-1 md:w-2/3 justify-around "
          onClick={(e) => e.stopPropagation()}
        >
          <BookCardTitle
            book={book}
            loading={loading}
            showOnSmallScreens={false}
            showOnLargeScreens={true}
          />
          <div >

            <p>
              <span className="font-semibold">Author:</span> {loading ? "Loading..." : book.author}
            </p>
            <p>
              <span className="font-semibold">Genre:</span> {loading ? "Loading..." : book.genre}
            </p>
            <p>
              <span className="font-semibold">Language:</span> {loading ? "Loading..." : book.language}
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Views:</span> {loading ? "Loading..." : book.views}
              <span className="font-semibold">Downloads:</span> {loading ? "Loading..." : book.downloads}
            </p>
            <p>
              <span className="font-semibold">Last Updated:</span>{" "}
              {loading ? "Loading..." : new Date(book.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default BookInfoCard;
