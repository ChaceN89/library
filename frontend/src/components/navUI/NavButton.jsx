// src/components/navUI/NavButton.jsx
import React from 'react';
import Link from 'next/link';

const NavButton = ({ href, label }) => (
  <Link href={href} className="block border border-black rounded-lg p-2 hover:bg-black">
    {label}
  </Link>
);

export default NavButton;
