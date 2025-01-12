import { IMAGE_PREFIX, DEFAULT_PAGE_SIZE } from "@/globals";

/**
 * @file browsePageData.js
 * @description 
 *    This file contains static configuration data for the Browse Page, including:
 *    - Page title and subtitle
 *    - Background image
 *    - Pagination options (page sizes)
 *    - Sorting options for books
 * 
 * @dependencies
 * - IMAGE_PREFIX: Global constant for the base path of static assets
 * - DEFAULT_PAGE_SIZE: Default number of books displayed per page
 */

export const browsePageData = {
  /**
   * Title and subtitle for the Browse Page header.
   */
  title: "Discover Your Next Great Read",
  subTitle:
    "Explore a world of stories, knowledge, and inspiration in our user-driven library. Discover and search through everything our community has uploaded, and find books that match your interests.",

  /**
   * Background image for the Browse Page.
   */
  background: `${IMAGE_PREFIX}/frontendAssets/whiteGeoMetric2.png`,

  /**
   * Page size options for pagination.
   * Provides users with predefined choices for the number of books displayed per page.
   */
  pageNumOption: [12, 24, 36, 48, 60],

  /**
   * Sorting options for books.
   * Allows users to sort the book list by various criteria such as recency, popularity, or title.
   */
  sortOptions: {
    most_recent: "Most Recent",
    least_recent: "Least Recent",
    most_viewed: "Most Viewed",
    least_viewed: "Least Viewed",
    most_downloaded: "Most Downloaded",
    least_downloaded: "Least Downloaded",
    title_asc: "Title (A-Z)",
    title_desc: "Title (Z-A)",
  },
};
