/**
 * @file authData.js
 * @module authData
 * @description Provides constants for authentication-related static assets, 
 * including background images and mascot images used in authentication pages.
 *
 * @author Chace Nielson
 * @created 2025-01-11
 * @updated 2025-01-11
 */

import { IMAGE_PREFIX } from "@/globals";

/**
 * Authentication-related data
 * @constant {Object}
 * @property {string} background - URL for the background image used in authentication pages.
 * @property {string} authImg - URL for the mascot image displayed on login forms.
 */
export const authData = {
  background: `${IMAGE_PREFIX}/frontendAssets/whiteGeoMetric2.png`,
  authImg: `${IMAGE_PREFIX}/frontendAssets/foxMascot.png`
};
