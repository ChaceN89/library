/**
 * @file myBooksData.js
 * @module myBooksData
 * @description 
 *   Contains metadata for the "My Books" page, including titles, subtitles, and background information.
 * 
 * @requires MAIN_BACKGROUND - Default background image for the page.
 * 
 * @constant {Object} myBooksData
 * @property {string} title - The title displayed at the top of the page.
 * @property {string} subTitle - The subtitle providing additional context for the page.
 * @property {string} background - The background image URL for the page.
 * 
 * @example
 * // Usage in the MyBooksPage component
 * import { myBooksData } from "@/data/myBooksData";
 * 
 * console.log(myBooksData.title); // "Your Library"
 * 
 * @author Chace Nielson
 * @created 2025-01-16
 * @updated 2025-01-16
 */

import { MAIN_BACKGROUND } from "@/globals";

export const myBooksData={
    /**
     * Title and subtitle for the Browse Page header.
     */
    title: "Your Library",
    subTitle: "Explore and manage all the books you've uploaded.",
  
    /**
     * Background image for the Browse Page.
     */
    background: MAIN_BACKGROUND,
  
}