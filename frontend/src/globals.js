/**
 * @file globals.js
 * @module Globals
 * @description Centralized configuration and constants for the application.
 * This file provides global variables and environment-specific settings 
 * to be used across the PageFlow Library application.
 *
 * @notes
 * - `API_BASE_URL`: The base URL for backend API requests, dynamically set via environment variables.
 * - `DEFAULT_PAGE_SIZE`: Default pagination size for API responses, with a fallback of 10.
 * - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Credentials for Google OAuth integration.
 * - `IMAGE_PREFIX`: Dynamically generated prefix for accessing assets stored in an S3 bucket.
 *
 * @dependencies
 * - `process.env`: Used to dynamically set values from the environment.
 * 
 * @example
 * import { API_BASE_URL, IMAGE_PREFIX } from "@/API/globals";
 * 
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-11
 */

// Infomation for fetching data
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const IMAGE_PREFIX = `https://${process.env.AWS_STORAGE_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION_NAME}.amazonaws.com`;


// App Specifc infomaiton 
export const DEFAULT_PAGE_SIZE = 12;
export const MAIN_BACKGROUND =`${IMAGE_PREFIX}/frontendAssets/whiteGeoMetric2.png`

export const ACCEPTED_FILES = `application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/json, text/html, text/plain, application/rtf`; // Remove whitespace for cleaner output
