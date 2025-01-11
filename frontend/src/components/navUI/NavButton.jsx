import React from 'react';
import Link from 'next/link';

const NavButton = ({ href, label, Icon }) => (
  <Link
    href={href}
    className="nav-button-1"
  >
    <span className="relative z-10 flex gap-1 items-center">{Icon}{label}</span>
  </Link>
);

export default NavButton;
