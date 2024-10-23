// src/components/LogoLink.jsx
import React from 'react';
import Link from 'next/link';  // Use Next.js's Link component for navigation
import Image from 'next/image';  // Use Next.js's Image component for optimized images
import './logoLink.css';  // Import the styles from logo.css

const LogoLink = () => {
  return (
    <Link href="/" className="logo-link flex items-center text-primary">
      <div className="flex items-center">
        <Image
          className="object-contain w-10 h-10"  // Adjusted size using Tailwind CSS
          src="/fox.ico"  // Path to the actual location of your logo
          alt="PageFlow Logo"
          width={40}  // Adjust width for optimization
          height={40}  // Adjust height for optimization
        />
      </div>
      <h1 className="text-3xl whitespace-nowrap titleFont underline-effect">
        PAGEFLOW
      </h1>
    </Link>
  );
};

export default LogoLink;
