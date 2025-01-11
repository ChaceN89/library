
/**
 * @file bookCardData.js
 * @module BookCardData
 * @description Provides configuration for the BookCard component, including the default cover image.
*
* @constant
* @type {Object}
* @property {string} defaultImg - URL of the default cover art image.
*/
import { IMAGE_PREFIX } from "@/globals";
export const bookCardData = {
  defaultImg: `${IMAGE_PREFIX}/misc/defaultBookCover2.jpg`,
  blurURL: `${IMAGE_PREFIX}/misc/blur.jpg`,
};
