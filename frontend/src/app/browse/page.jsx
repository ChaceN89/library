import React from 'react';
import Link from 'next/link';
import S3Imags from '@/components/general/S3Imgs';
import BookList from '@/components/library/browse/AllBooks';

function BooksPage() {
  return (
    <div>
      <BookList />
    </div>
  );
}

export default BooksPage;
