import React from 'react';
import Link from 'next/link';

const NavButton = ({ href, label }) => (
  <Link
    href={href}
    className="
      bg-primary text-secondary 
      dark:bg-secondary dark:text-primary 
      border border-secondary dark:border-primary 
      shadow-[0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)] 
      hover:shadow-inner 
      hover:shadow-accent-dark
      rounded-lg px-4 py-2 transition-all ease-in-out duration-300
      focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-offset-2
    "
  >
    {label}
  </Link>
);

export default NavButton;
