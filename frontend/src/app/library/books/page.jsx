import React from 'react';
import Link from 'next/link';
import S3Imags from '@/components/general/S3Imgs';

function BooksPage() {
  return (
    <div>
      <div>Books List - Links to individual book pages:</div>
      
      <ul className="mt-4 space-y-2">
        {/* Random IDs for demonstration */}
        <li>
          <Link href="/library/book/123" className="text-blue-600 hover:underline">
            Book ID: 123
          </Link>
        </li>
        <li>
          <Link href="/library/book/456" className="text-blue-600 hover:underline">
            Book ID: 456
          </Link>
        </li>
        <li>
          <Link href="/library/book/789" className="text-blue-600 hover:underline">
            Book ID: 789
          </Link>
        </li>
        <li>
          <Link href="/library/book/1011" className="text-blue-600 hover:underline">
            Book ID: 1011
          </Link>
        </li>
      </ul>

      {/* Display images */}
      <S3Imags />
    </div>
  );
}

export default BooksPage;
