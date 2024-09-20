import React from 'react';
import Link from 'next/link';
import S3Imags from '@/components/general/S3Imgs';
import BookList from '@/components/library/BookList';

function BooksPage() {
  return (
    <div>
      <BookList />

        <br />
        <br />
        <br />

      {/* Display images for testing purposes */}
      <S3Imags />
    </div>
  );
}

export default BooksPage;
