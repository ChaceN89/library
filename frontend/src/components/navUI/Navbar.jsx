// src/components/Navbar.jsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='w-full bg-red-900'>
      <ul className='flex space-x-4 container mx-auto'>
        <li>
          <Link href="/" className='block border border-black rounded-lg p-2 m-1 hover:bg-black'>
            Home
          </Link>
        </li>
        <li>
          <Link href="/library/upload" className='block border border-black rounded-lg p-2 m-1 hover:bg-black'>
            Upload
          </Link>
        </li>
        <li>
          <Link href="/library/books" className='block border border-black rounded-lg p-2 m-1 hover:bg-black'>
            Books
          </Link>
        </li>
        <li>
          <Link href="/auth/login" className='block border border-black rounded-lg p-2 m-1 hover:bg-black'>
            Login
          </Link>
        </li>
        <li>
          <Link href="/auth/register" className='block border border-black rounded-lg p-2 m-1 hover:bg-black'>
            Register
          </Link>
        </li>
        <li>
          <Link href="/dashboard/account" className='block border border-black rounded-lg p-2 m-1 hover:bg-black'>
            Account
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className='block border border-black rounded-lg p-2 m-1 hover:bg-black'>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
