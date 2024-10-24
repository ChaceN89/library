import React from 'react';

function MyBooksList({ books }) {
  return (
    <ul className="list-none p-0">
      {books.map((book) => (
        <li key={book.id} className="border p-4 mb-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p className="text-sm text-gray-600">Author: {book.author}</p>
          <p className="text-sm text-gray-600">Downloads: {book.downloads}</p>
          <p className="text-sm text-gray-600">Views: {book.views}</p>
          <a 
            href={book.content_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            Download Book
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MyBooksList;
