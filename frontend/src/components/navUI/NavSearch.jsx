"use client";

import React, { useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useRouter } from "next/navigation";
import { navData } from "@/data/navData";

const NavSearch = () => {
  const [localQuery, setLocalQuery] = useState(""); // Local state for the search input
  const { handleSearch } = useSearch(); // Access the context to update search globally
  const router = useRouter(); // Use the new next/navigation's useRouter

  // Handle user input in NavSearch
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery); // Update the local state

    // Update global search context
    handleSearch(e);
  };


  const search = (e) => {
    router.push(navData.browseButton.href);
    // close the meny
  }



  // Handle "Enter" key press for search submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(navData.browseButton.href); // Navigate to /browse when "Enter" is pressed
    }
  };

  // Handle button click for search submission
  const handleSearchClick = () => {
    router.push(navData.browseButton.href); // Navigate to /browse when the button is clicked
  };

  return (
    <div className=" w-full flex flex-col lg:flex-row lg:items-center gap-1 bg-secondary dark:bg-primary rounded-lg p-0.5 shadow-md">
      <input
        type="text"
        placeholder="Search Books..."
        value={localQuery} // Use local state to manage the input
        onChange={handleInputChange} // Trigger input change
        onKeyDown={handleKeyDown} // Trigger navigation when "Enter" is pressed
        className="flex-1 px-2 py-1.5 rounded-lg bg-primary dark:bg-secondary text-secondary dark:text-primary border border-secondary dark:border-primary focus:outline-none focus:ring-2 focus:ring-accent-dark transition"
      />
      <button
        onClick={handleSearchClick} // Trigger navigation when button is clicked
        className="px-1.5 py-1 bg-accent hover text-primary  font-semibold rounded-lg dark:hover:bg-accent transition-all 
        border-2 dark:border-4 dark:px-1 dark:py-0.5 border-transparent hover:border-primary hover:dark:border-black "
      >
        Search
      </button>
    </div>
  );
};

export default NavSearch;
