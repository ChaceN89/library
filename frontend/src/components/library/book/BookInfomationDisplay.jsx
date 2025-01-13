import React from "react";
import Image from "next/image";
import { bookCardData } from "@/data/bookCardData";
import SetFavBook from "../favBooks/SetFavBook";
import BookOwner from "./BookOwner";
import PlaceHolderText from "@/components/general/PlaceHolderText";
import DownloadBookContent from "./DownloadBookContent";

function BookInformationDisplay({ book, loading }) {
  // Destructure with defaults to handle null or undefined book
  const {
    title = "Loading Title...",
    description = "Loading Description...",
    author = "Unknown Author",
    genre = "Unknown Genre",
    language = "Unknown Language",
    published_date = null,
    downloads = 0,
    views = 0,
    created_at = null,
    updated_at = null,
    cover_art_url = bookCardData.defaultImg,
  } = book || {}; // If `book` is null, use an empty object.

  return (
    <div className="p-2 card-background">

      <div className="flex flex-col md:flex-row gap-6 ">
        {/* Book Cover */}
        <div className="relative w-full md:w-1/4 aspect-[3/4] bg-gray-200 border rounded-lg overflow-hidden flex items-center justify-center">
          {loading ? (
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          ) : (
            <Image
              src={cover_art_url}
              alt={`Cover art for ${title}`}
              className="object-cover w-full h-full"
              width={200}
              height={300}
              priority
              placeholder="blur"
              blurDataURL={bookCardData.blurURL}
            />
          )}
        </div>

        {/* Book Information */}
        <div className="flex flex-col flex-grow gap-4">
          {/* Title */}
          <PlaceHolderText
            loading={loading}
            placeholder={<div className="h-14 bg-gray-300 rounded w-3/4"></div>}
          >
            <h1 className="text-3xl font-bold">{title}</h1>
          </PlaceHolderText>

          {/* Description */}
          <PlaceHolderText
            loading={loading}
            placeholder={<div className="h-6 bg-gray-300 rounded w-full"></div>}
          >
            <p className="l">{description}</p>
          </PlaceHolderText>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <PlaceHolderText
              loading={loading}
              placeholder={<h5 className="h-8 bg-gray-300 rounded w-2/3"></h5>}
            >
              <h5 className="l">Author: {author}</h5>
            </PlaceHolderText>

            <PlaceHolderText
              loading={loading}
              placeholder={<div className="h-5 bg-gray-300 rounded w-2/3"></div>}
            >
              <p className="l">Genre: {genre}</p>
            </PlaceHolderText>

            <PlaceHolderText
              loading={loading}
              placeholder={<div className="h-5 bg-gray-300 rounded w-2/3"></div>}
            >
              <p className="l">Language: {language}</p>
            </PlaceHolderText>

            <PlaceHolderText
              loading={loading}
              placeholder={<div className="h-5 bg-gray-300 rounded w-2/3"></div>}
            >
              <p className="l">
                Published Date: {published_date ? new Date(published_date).toLocaleDateString() : "Unknown"}
              </p>
            </PlaceHolderText>

            <PlaceHolderText
              loading={loading}
              placeholder={<div className="h-5 bg-gray-300 rounded w-2/3"></div>}
            >
              <p className="l">Downloads: {downloads}</p>
            </PlaceHolderText>

            <PlaceHolderText
              loading={loading}
              placeholder={<div className="h-5 bg-gray-300 rounded w-2/3"></div>}
            >
              <p className="l">Views: {views}</p>
            </PlaceHolderText>
          </div>

          {/* Created/Updated Timestamps */}
          <PlaceHolderText
            loading={loading}
            placeholder={<div className="h-5 bg-gray-300 rounded w-2/3"></div>}
          >
            <p className="text-gray-500">Created: {created_at ? new Date(created_at).toLocaleDateString() : "Unknown"}</p>
          </PlaceHolderText>

          <PlaceHolderText
            loading={loading}
            placeholder={<div className="h-5 bg-gray-300 rounded w-2/3"></div>}
          >
            <p className="text-gray-500">Last Updated: {updated_at ? new Date(updated_at).toLocaleDateString() : "Unknown"}</p>
          </PlaceHolderText>

          {/* Favorite Button and Owner */}
          <div className="flex items-center gap-4 mt-6">
            <SetFavBook id={book?.id} bookTitle={title} large={true} />
            <BookOwner book={book} />
          </div>
          <div className="w-fit">
            <DownloadBookContent loading={loading} book={book}/>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default BookInformationDisplay;
