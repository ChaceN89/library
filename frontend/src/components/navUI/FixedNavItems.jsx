// src/components/navUI/FixedNavItems.jsx
import React from 'react';
import Link from 'next/link';
import NavSearch from './NavSearch';
import LogoLink from '../general/LogoLink';
import NavButton from './NavButton';
import { navData } from '@/data/navData';

const FixedNavItems = () => (

  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
    <LogoLink />
    <NavButton
      href={navData.browseButton.link}
      label={navData.browseButton.label}
    />
      {/* <NavSearch /> */}

  </div>
);

export default FixedNavItems;
