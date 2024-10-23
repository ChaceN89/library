// src/components/navUI/FixedNavItems.jsx
import React from 'react';
import Link from 'next/link';
import NavSearch from './NavSearch';
import LogoLink from '../general/LogoLink';

const FixedNavItems = () => (
  <div className="flex items-center space-x-4">
    <LogoLink />
    <Link href="/browse" className='block border border-black rounded-lg p-2 hover:bg-black'>
      Browse
    </Link>
    <div>
      <NavSearch />
    </div>
  </div>
);

export default FixedNavItems;
