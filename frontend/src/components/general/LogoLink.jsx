import React from 'react';
import Link from 'next/link';  // Use Next.js's Link component for navigation
import Image from 'next/image';  // Use Next.js's Image component for optimized images
import './LogoLink.css';  // Import the styles from logo.css
import { navData } from '@/data/navData';

const LogoLink = () => {
  return (
    <Link href={navData.logoLink} className="logo-link flex items-center text-primary dark:text-secondary">
      <div className="relative h-10 w-10 flex-shrink-0">
        <Image
          src="/fox.ico"  // Path to the actual location of your logo
          alt="PageFlow"
          fill
          sizes="(max-width: 640px) 40px, (max-width: 768px) 50px, 60px" // Adjust sizes for responsive behavior
          className="object-contain"
        />
      </div>
      <h3 className="sm:text-lg whitespace-nowrap underline-effect">
        PAGEFLOW
      </h3>
    </Link>
  );
};

export default LogoLink;
