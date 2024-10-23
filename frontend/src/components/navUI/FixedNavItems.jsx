// src/components/navUI/FixedNavItems.jsx
import React from 'react';
import Link from 'next/link';

const FixedNavItems = () => (
  <div className="flex items-center space-x-4">
    <Link href="/">
      <img src="/fox.ico" alt="Home" className="w-8 h-8" />
    </Link>
    <Link href="/browse" className='block border border-black rounded-lg p-2 hover:bg-black'>
      Browse
    </Link>
    <input
      type="text"
      placeholder="Search..."
      className="border rounded-lg p-2"
      disabled
    />
  </div>
);

export default FixedNavItems;
