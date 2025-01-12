/**
 * @file welcomePageData.js
 * @module WelcomePageData
 * @description Static data configuration for the Welcome Page of the PageFlow Library.
 * This module provides reusable and maintainable content for the Welcome Page, including the page's title,
 * subtitle, and background image configuration. It leverages the `IMAGE_PREFIX` for dynamic asset paths.
 *
 * @notes
 * - Background image paths are dynamically built using the `IMAGE_PREFIX` defined in globals.
 * - Centralized content management ensures consistency and simplifies updates to the Welcome Page.
 *
 * @dependencies
 * - IMAGE_PREFIX from "@/globals" (used for constructing dynamic image paths).
 *
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-08
 */

import { IMAGE_PREFIX, MAIN_BACKGROUND } from "@/globals";

export const welcomePageData ={
  TopBooksToDisplay: 6,
  title: "Welcome to the Libary",
  subTitle: "Our mission is to make books accessible to everyone, offering a rich library experience where you can explore, read, and save your favorites. Whether you're discovering new genres or revisiting timeless classics, PageFlow Library is here to fuel your passion for reading.",
  background: MAIN_BACKGROUND
}