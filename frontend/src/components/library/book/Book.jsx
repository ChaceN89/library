import React, { useEffect } from "react";
import { useBookContext } from "@/context/BookContext";
import ErrorLoading from "@/components/loading/ErrorLoading";
import LoadingWheel from "@/components/loading/LoadingWheel";
import BookInformationDisplay from "./BookInfomationDisplay";
import BookReader from "./BookReader";
import BookComments from "./comments/BookComments";

function Book({ id, title }) {
  const { error, fetchBook} = useBookContext();

  useEffect(() => {
    fetchBook(id, title);

  }, [id, title]);

  if (error) {
    return (
      <ErrorLoading
        className="mt-10"
        message={`Unable to load the book ${id}/${title}. Please try again later or check the URL.`}
      />
    );
  }

  return (
    <div>
      <BookInformationDisplay/>
      <BookReader />
      {/* {loading ? <LoadingWheel /> : <BookComments bookId={book?.id} />} */}
    </div>
  );
}

export default Book;
