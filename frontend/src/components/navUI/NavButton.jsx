import React from 'react';
import Link from 'next/link';

const NavButton = ({ href, label }) => (
  <Link
    href={href}
    className="nav-button-1"
  >
    <span className="relative z-10">{label}</span>
  </Link>
);

export default NavButton;
