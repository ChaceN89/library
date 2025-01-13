/**
 * @file BookInfo.jsx
 * @module BookInfo
 * @description
 *   Displays detailed information about a book, including title, description, author,
 *   and metadata like genre, language, publication date, views, and downloads.
 *   Integrates with the BookContext and uses the PlaceHolderText component for loading states.
 *
 * @requires React
 * @requires @context/BookContext - Provides book-related state and functionality.
 * @requires @components/general/PlaceHolderText - Displays placeholder text for loading states.
 *
 * @component BookInfo
 *
 * @example
 * <BookInfo />
 *
 * @exports BookInfo
 *
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React from "react";
import { useBookContext } from "@/context/BookContext";
import PlaceHolderText from "@/components/general/PlaceHolderText";

function BookInfo() {
  const { book, loading } = useBookContext();

  return (
    <div className="space-y-2 flex flex-col w-full">
      {/* Title */}
      <PlaceHolderText width="w-3/4" loading={loading}>
        <h1 className="text-3xl font-bold">{book?.title}</h1>
      </PlaceHolderText>

      {/* Description */}
      <PlaceHolderText width="w-2/3 h-20" loading={loading}>
        <p className="text-gray-700">{book?.description}</p>
      </PlaceHolderText>

      {/* Author */}
      <PlaceHolderText width="w-1/2" loading={loading}>
        <h3 className="text-lg font-semibold">{book?.author}</h3>
      </PlaceHolderText>

      {/* Metadata */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 xl:w-4/5">
        <PlaceHolderText width="w-1/4 md:w-full" loading={loading}>
          <p> <b>Genre:</b> {book?.genre} </p>
        </PlaceHolderText>
        <PlaceHolderText width="w-1/2 md:w-full" loading={loading}>
          <p><b>Language:</b> {book?.language}</p>
        </PlaceHolderText>
        <PlaceHolderText width="w-1/3 md:w-full" loading={loading}>
          <p>
            <b>Published:</b>{" "}
            {book?.published_date
              ? new Date(book.published_date).toLocaleDateString()
              : "Unknown"}
          </p>
        </PlaceHolderText>
        <PlaceHolderText width="w-1/4 md:w-full" loading={loading}>
          <p> <b>Total Views:</b> {book?.views} </p>
        </PlaceHolderText>
        <PlaceHolderText width="w-1/5 md:w-full" loading={loading}>
          <p> <b>Downloads:</b> {book?.downloads} </p>
        </PlaceHolderText>
      </div>
    </div>
  );
}

export default BookInfo;
