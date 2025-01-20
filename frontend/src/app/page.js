/**
 * @file WelcomePage.jsx - page.jsx
 * @module WelcomePage
 * @desc Main page component for the library application, providing an overview of the site's features and content.
 * This component displays the most viewed books, most recent uploads, and site statistics with a visually appealing background.
 *
 * @component WelcomePage
 * 
 * @requires react
 * @requires BackgroundWrapper from "@/components/wrappers/BackgroundWrapper"
 * @requires SectionWrapper from "@/components/wrappers/SectionWrapper"
 * @requires DisplayTopBooks from "@/components/home/DisplayTopBooks"
 * @requires SiteStatistics from "@/components/home/SiteStatistics"
 * @requires fetchMostViewedBooks, fetchMostRecentBooks from "@/API/homePageAPI"
 * @requires welcomePageData from "@/data/welcomePageData"
 * 
 * @description
 * - Utilizes `BackgroundWrapper` to set a styled background for the page.
 * - Displays the top viewed and most recently uploaded books using `DisplayTopBooks`.
 * - Shows site statistics via the `SiteStatistics` component.
 * 
 * @notes
 * - Dynamically fetches book data using `fetchMostViewedBooks` and `fetchMostRecentBooks`.
 * - Uses `welcomePageData` for managing page content, including the background image and titles.
 * 
 * @example
 * import WelcomePage from "./WelcomePage";
 * 
 * function App() {
 *   return <WelcomePage />;
 * }
 * 
 * @exports WelcomePage
 * 
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-08
 */

"use client";
import React from "react";

// Components
import BackgroundWrapper from "@/components/wrappers/BackgroundWrapper";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

// Main Components for displaying site info
import DisplayTopBooks from "@/components/home/DisplayTopBooks";
import SiteStatistics from "@/components/home/SiteStatistics";

// Fetch functions and gloabls
import { fetchMostViewedBooks, fetchMostRecentBooks } from "@/API/homePageAPI";
import { welcomePageData } from "@/data/welcomePageData";
import RecentlyRead from "@/components/home/RecentlyRead";

function WelcomePage() {

  return (
    <BackgroundWrapper
      src={welcomePageData.background}
      bgOpacity = {60}
      backgroundAttachment={'fixed'}
    >
      <SectionWrapper
        title={welcomePageData.title}
        subtitle={welcomePageData.subTitle}
      >
        <RecentlyRead/> 
        <DisplayTopBooks
          fetchFunction={fetchMostViewedBooks}
          title={`Top ${welcomePageData.TopBooksToDisplay} Most Viewed Books`}
          booksToFetch={welcomePageData.TopBooksToDisplay}
        />
        <DisplayTopBooks
          fetchFunction={fetchMostRecentBooks}
          title={`Top ${welcomePageData.TopBooksToDisplay} Most Recent Uploads`}
          booksToFetch={welcomePageData.TopBooksToDisplay}
        />
        <SiteStatistics />
      </SectionWrapper>
    </BackgroundWrapper>
  );
}

export default WelcomePage;