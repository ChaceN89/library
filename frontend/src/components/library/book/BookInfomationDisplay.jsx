import React from "react";
import Image from "next/image";
import { bookCardData } from "@/data/bookCardData";
import SetFavBook from "../favBooks/SetFavBook";
import BookOwner from "./BookOwner";
import DownloadBookContent from "./DownloadBookContent";
import BookCoverImage from "./BookCoverImage";
import BookInfo from "./BookInfo";
import { useBookContext } from "@/context/BookContext";



function BookInformationDisplay() {
  
  const { book, loading} = useBookContext();

  return(
    <div className="p-2 card-background">
      <div className="flex flex-col sm:flex-row gap-6">
        <BookCoverImage/>
        <div className="flex flex-col justify-between w-full">
          <BookInfo/>
          <div className="flex gap-2 items-center">
            <SetFavBook
              id = {book?.id}
              bookTitle = {book?.title}
              large = {true}
              loading = {loading}
            />
            <BookOwner
              owner_profile_pic = {book?.owner_profile_pic}
              owner_username = {book?.owner_username}
            />
          </div>
          <DownloadBookContent/>
        </div>
      </div>  
    </div>
  )
}

export default BookInformationDisplay;
