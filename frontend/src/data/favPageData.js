/**
 * @file favPageData.js
 * @module favPageData
 * @description
 * Contains static data for the Favorites page, including the title, subtitle, 
 * and background image configuration. This data is used to configure the 
 * appearance and content of the Favorites page.
 *
 * @example
 * import { favPageData } from '@/data/favPageData';
 * 
 * console.log(favPageData.title); // Outputs: "Favorite Reads"
 *
 * @requires MAIN_BACKGROUND - A global constant for the default background image.
 *
 * @exports favPageData
 *
 * @property {string} title - The title displayed on the Favorites page.
 * @property {string} subTitle - The subtitle displayed under the title.
 * @property {string} background - The background image for the page.
 *
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */

import { MAIN_BACKGROUND } from "@/globals";

export const favPageData={
    /**
     * Title and subtitle for the Browse Page header.
     */
    title: "Favorite Reads",
    subTitle: "A collection of books you’ve marked as your favorites.",
  
    /**
     * Background image for the Browse Page.
     */
    background: MAIN_BACKGROUND,
  
}