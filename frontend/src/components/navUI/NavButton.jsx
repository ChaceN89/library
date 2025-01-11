import React from 'react';
import Link from 'next/link';

const NavButton = ({ href, label }) => (
  <Link
    href={href}
    className="relative w-full flex justify-center md:flex-none md:w-auto
      bg-primary text-secondary 
      dark:bg-secondary dark:text-primary 
      border border-secondary dark:border-primary 
      overflow-hidden font-medium shadow-2xl 
      rounded-xl px-4 py-2 transition-all duration-300 ease-in-out
      hover:bg-secondary hover:text-primary 
      dark:hover:bg-primary dark:hover:text-secondary
      hover:shadow-accent-dark 
      focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-offset-2
      before:absolute before:inset-0 before:rounded-md before:border-0 
      before:border-secondary dark:before:border-primary
      before:transition-all before:duration-300 before:ease-linear 
      hover:before:border-[25px]"
  >
    <span className="relative z-10">{label}</span>
  </Link>
);

export default NavButton;
