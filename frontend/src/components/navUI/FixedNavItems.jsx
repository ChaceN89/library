// src/components/navUI/FixedNavItems.jsx
import React from 'react';
import Link from 'next/link';
import NavSearch from './NavSearch';
import LogoLink from '../general/LogoLink';
import NavButton from './NavButton';
import { navData } from '@/data/navData';

const FixedNavItems = ({popUp=false}) => (

  <div className={`flex flex-col lg:flex-row items-center gap-2 ${popUp && "lg:hidden"}`}>
    <LogoLink />
    <NavButton
      href={navData.browseButton.link}
      label={navData.browseButton.label}
    />
    <NavSearch />
  </div>
);

export default FixedNavItems;
