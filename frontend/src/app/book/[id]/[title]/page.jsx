/**
 * @file BookPage.jsx
 * @module BookPage
 * @description
 *   Provides a wrapper for the `Book` component with a background and layout. 
 *   Delegates book fetching and error handling to the `Book` component.
 * 
 * @requires react
 * @requires next/navigation
 * @requires BackgroundWrapper from "@/components/wrappers/BackgroundWrapper"
 * @requires Book from "@/components/library/book/Book"
 * 
 * @example
 * <BookPage />
 * 
 * @author Chace Nielson
 * @created 2025-01-12
 * @updated 2025-01-12
 */

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { browsePageData } from "@/data/browsePageData";
import BackgroundWrapper from "@/components/wrappers/BackgroundWrapper";
import Book from "@/components/library/book/Book";

function BookPage() {
  const params = useParams();
  const { id, title } = params;

  return (
    <BackgroundWrapper
      src={browsePageData.background} // Background image
      bgOpacity={60} // Set background opacity
      backgroundAttachment="fixed" // Fix the background during scrolling
      className="flex-grow flex flex-col section-container pt-4"
    >
      <Book id={id} title={title} />
    </BackgroundWrapper>
  );
}

export default BookPage;
