/**
 * @file BookInformationDisplay.jsx
 * @module BookInformationDisplay
 * @description 
 *   Displays detailed information about a specific book, including its cover image, 
 *   metadata, favorite toggle button, owner information, and a download button.
 *
 * @requires React
 * @requires next/image - For optimized image rendering.
 * @requires @context/BookContext - Provides book-related state and functionality.
 * @requires ./BookCoverImage - Displays the book's cover image.
 * @requires ./BookInfo - Displays metadata about the book (e.g., title, author, genre).
 * @requires ../favBooks/SetFavBook - Handles toggling the book's favorite status.
 * @requires ./BookOwner - Displays the book owner's profile information.
 * @requires ./DownloadBookContent - Handles downloading the book's content.
 * 
 * @component BookInformationDisplay
 *
 * @example
 * // Example usage:
 * <BookInformationDisplay />
 * 
 * @exports BookInformationDisplay
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React from "react";
import { useBookContext } from "@/context/BookContext";
import BookCoverImage from "./BookCoverImage";
import BookInfo from "./BookInfo";
import SetFavBook from "../favBooks/SetFavBook";
import BookOwner from "./BookOwner";
import DownloadBookContent from "./DownloadBookContent";

function BookInformationDisplay() {
  const { book, loading } = useBookContext();

  return (
    <div className="p-2 card-background">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Cover Image */}
        <BookCoverImage />

        {/* Book Metadata and Actions */}
        <div className="flex flex-col justify-between w-full">
          <BookInfo />

          {/* Actions */}
          <div className="flex flex-col gap-4">
            {/* Favorite and Owner */}
            <div className="flex gap-2 items-center">
              <SetFavBook
                id={book?.id}
                bookTitle={book?.title}
                large={true}
                loading={loading}
              />
              <BookOwner
                loading={loading}
                owner_profile_pic={book?.owner_profile_pic}
                owner_username={book?.owner_username}
              />
            </div>

            {/* Download Button */}
            <DownloadBookContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookInformationDisplay;
