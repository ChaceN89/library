import React from 'react';
import Image from 'next/image';
import LoadingWheel from '../loading/LoadingWheel';
import Link from 'next/link';
import SetFavBook from '../library/favBooks/SetFavBook';
import { bookCardData } from '@/data/bookCardData';

function BookCard({ book, loading }) {
  const bookLink = `/book/${book.id}/${book.title?.toLowerCase()}`;

  return (
    <div className="card-background overflow-hidden border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-shadow">
      {/* Link Wrapper */}
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
                <SetFavBook id={book.id} />
              </div>
            )}
          </div>

          {/* Book Title and Author */}
          <div className="p-4 text-left overflow-hidden">
            <h5 className="truncate">
            {loading ? 'Title...' : book.title || 'Unknown Titke'}
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
