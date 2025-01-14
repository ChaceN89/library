/**
 * @file FavoritesPage.jsx
 * @module FavoritesPage
 * @description
 * A React component representing the Favorites page. This page displays a 
 * list of the user's favorite books in a styled background with support for 
 * section headers and dynamic content rendering.
 *
 * @example
 * <FavoritesPage />
 *
 * @requires react
 * @requires FavBooks - Component to display and manage favorite books.
 * @requires BackgroundWrapper - Wrapper component to render a styled background.
 * @requires SectionWrapper - Wrapper component for titles and subtitles.
 * @requires favPageData - Data for page configuration (title, subtitle, background).
 *
 * @exports FavoritesPage
 *
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */

"use client"
import React from 'react'
import FavBooks from '@/components/library/favBooks/FavBooks';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { favPageData } from '@/data/favPageData';

function FavoritesPage() {
  return (
    <BackgroundWrapper
    src={favPageData.background} // Background image for the page
    bgOpacity={60}                 // Background opacity level
    backgroundAttachment="fixed"   // Fixes the background during scroll
    className="min-h-screen py-4"       // Ensures the background spans the full viewport height
  >
    <SectionWrapper
      title={favPageData.title}
      subtitle={favPageData.subTitle}
    >
      <FavBooks />
    </SectionWrapper>
  </BackgroundWrapper>
  )
}

export default FavoritesPage;
