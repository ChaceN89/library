/**
 * @file MyBooksPage.jsx
 * @module MyBooksPage
 * @description 
 *   This component serves as the main page for the "My Books" section. It displays a 
 *   background wrapper with a section title and includes the `MyBooks` component for listing 
 *   and managing the user's uploaded books.
 * 
 * @requires React
 * @requires MyBooks - Component that fetches and displays the user's uploaded books.
 * @requires BackgroundWrapper - Wrapper to display a styled background.
 * @requires SectionWrapper - Wrapper for section-specific styling and layout.
 * @requires myBooksData - Metadata containing the title, subtitle, and background image for the page.
 * 
 * @component MyBooksPage
 * 
 * @example
 * // Usage in a Next.js project
 * import MyBooksPage from "@/pages/library/myBooksPage";
 * 
 * export default function App() {
 *   return <MyBooksPage />;
 * }
 * 
 * @author Chace Nielson
 * @created 2025-01-16
 * @updated 2025-01-16
 */

'use client'
import MyBooks from '@/components/library/myBooks/MyBooks'
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { myBooksData } from '@/data/mybooksData'
import React from 'react'

function MyBooksPage() {
  return (
    <BackgroundWrapper
      src={myBooksData.background} // Background image for the page
      bgOpacity={60}                 // Background opacity level
      backgroundAttachment="fixed"   // Fixes the background during scroll
      className="min-h-screen py-4"       // Ensures the background spans the full viewport height
    >
      <SectionWrapper
        title={myBooksData.title}
        subtitle={myBooksData.subTitle}
      >
        <MyBooks />
      </SectionWrapper>
    </BackgroundWrapper>
  )
}

export default MyBooksPage