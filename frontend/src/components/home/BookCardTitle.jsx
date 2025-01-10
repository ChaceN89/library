import React from 'react';
import SetFavBook from '../library/favBooks/SetFavBook';

function BookCardTitle({ book, showOnSmallScreens = true, showOnLargeScreens = true }) {
  return (
    <div
      className={`flex justify-between items-start ${
        !showOnSmallScreens ? 'hidden md:flex' : ''
      } ${!showOnLargeScreens ? 'md:hidden' : ''}`}
    >
      <h3 className="hover:underline cursor-pointer flex-grow">
        {book.title}
      </h3>
      <SetFavBook id={book.id} />
    </div>
  );
}

export default BookCardTitle;
