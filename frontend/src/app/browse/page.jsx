"use client";

/**
 * @file BrowsePage.jsx
 * @author Chace Nielson
 * @date Created: January 11, 2025
 * @lastUpdated January 11, 2025
 * @description This component renders the Browse Page for the library application. 
 * It includes a search input, filters, and a book browsing area, wrapped in a 
 * styled background with responsive layout adjustments.
 * 
 * @dependencies
 * - React
 * - BackgroundWrapper (custom component for styled background)
 * - browsePageData (data for the browse page)
 * - SearchInput (search bar component)
 * - Filters (filter options for book browsing)
 * - BrowseBooks (main component displaying book results with pagination)
 */

import React from "react";
import BackgroundWrapper from "@/components/wrappers/BackgroundWrapper";
import { browsePageData } from "@/data/browsePageData";
import SearchInput from "@/components/library/browse/SearchInput";
import Filters from "@/components/library/browse/Filters";
import BrowseBooks from "@/components/library/browse/BrowseBooks";

/**
 * BrowsePage Component
 * Renders the main browse page layout with search, filters, and book browsing features.
 * Includes responsive design to adjust layout based on screen size.
 * 
 * @returns {JSX.Element} The BrowsePage component.
 */
function BrowsePage() {
  return (
    <BackgroundWrapper
      src={browsePageData.background} // Background image for the page
      bgOpacity={60}                 // Background opacity level
      backgroundAttachment="fixed"   // Fixes the background during scroll
      className="min-h-screen"       // Ensures the background spans the full viewport height
    >
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen p-2 gap-4 section-container">
        {/* Sidebar (Search and Filters) */}
        <div className="flex flex-col-reverse lg:flex-col gap-2 w-full lg:w-1/5 lg:border-r-2 lg:pr-4 lg:border-secondary dark:border-primary">
          <SearchInput /> {/* Search Bar */}
          <Filters />     {/* Filter Options */}
        </div>

        {/* Main Content Area (Browse Books) */}
        <div className="w-full lg:w-4/5">
          <BrowseBooks /> {/* Book browsing results and pagination */}
        </div>
      </div>
    </BackgroundWrapper>
  );
}

export default BrowsePage;
