"use client";  // Ensure this is a client component

import React, { useState, useEffect } from 'react';
import { useSearch } from '@/context/SearchContext';
import { useRouter, usePathname } from 'next/navigation';  // Import usePathname from next/navigation

const NavSearch = () => {
  const [localQuery, setLocalQuery] = useState('');  // Local state for the search input
  const { handleSearch } = useSearch();  // Access the context to update search globally
  const router = useRouter();  // Use the new next/navigation's useRouter
  const pathname = usePathname();  // Get the current path

  // Handle user input in NavSearch
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery);  // Update the local state

    // Update global search context
    handleSearch(e);
  };

  // Effect to navigate to /browse and scroll to the element with id="bookDisplay"
  useEffect(() => {
    if (localQuery.length > 0 && pathname !== '/browse') {
      router.push('/browse');  // Navigate to /browse only if not already there
    }
  }, [localQuery, pathname, router]);  // Watch localQuery, pathname, and router


  return (
      <input
        type="text"
        placeholder="Search..."
        value={localQuery}  // Use local state to manage the input
        onChange={handleInputChange}  // Trigger input change
        className="border rounded-lg p-2"
      />
  );
};

export default NavSearch;
