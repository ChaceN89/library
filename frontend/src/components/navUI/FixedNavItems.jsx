// src/components/navUI/FixedNavItems.jsx
import React from 'react';
import Link from 'next/link';
import NavSearch from './NavSearch';
import LogoLink from '../general/LogoLink';
import NavButton from './NavButton';

const FixedNavItems = () => (

  <div className="flex items-center space-y-2 md:space-y-0 md:space-x-4">
    <div className='hidden md:block'>
      <LogoLink />
    </div>
    <NavButton
      href="/browse"
      label="Browse"
    />
      {/* <NavSearch /> */}

  </div>
);

export default FixedNavItems;
