import { useBookContext } from "@/context/BookContext";
import Image from "next/image";
import React from "react";
import LoadingWheel from "@/components/loading/LoadingWheel";
import { bookCardData } from "@/data/bookCardData";

function BookCoverImage() {
  const { book, loading } = useBookContext();

  // Use context data as fallback if props are not passed
  const coverUrl = book?.cover_art_url || bookCardData.defaultImg;

  return (
    <div className="flex-grow relative max-w-full sm:w-1/2 md:w/1-3 aspect-[3/4] border rounded-lg overflow-hidden flex items-center justify-center bg-accent bg-opacity-15">
      {loading ? (
        // Show a loading spinner while loading
        <LoadingWheel className="h-12 w-12" />
      ) : (
        // Show the image when loading is complete
        <Image
          src={coverUrl}
          alt={`Cover art for ${book?.title || "Untitled Book"}`}
          className="object-cover w-full h-full"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Add responsive sizes
          priority
          placeholder="blur"
          blurDataURL={bookCardData.blurURL}
        />
      )}
    </div>
  );
}

export default BookCoverImage;
