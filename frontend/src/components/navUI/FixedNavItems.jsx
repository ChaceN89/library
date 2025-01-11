// src/components/navUI/FixedNavItems.jsx
import React from 'react';
import Link from 'next/link';
import NavSearch from './NavSearch';
import LogoLink from '../general/LogoLink';
import NavButton from './NavButton';
import { navData } from '@/data/navData';

const FixedNavItems = ({popUp=false}) => (

  <div className={`nav-actions ${popUp && "lg:hidden"}`}>
    <LogoLink />
    <NavButton
      href={navData.browseButton.href}
      label={navData.browseButton.label}
    />
    <NavSearch />
  </div>
);

export default FixedNavItems;
