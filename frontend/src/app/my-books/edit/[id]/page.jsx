/**
 * @file EditBookPage.jsx
 * @module EditBookPage
 * @description Main page for editing a book's information, content, and deletion.
 * @requires MyBookEdits - Component handling book editing functionality.
 * @requires BackgroundWrapper - Wrapper to display a styled background.
 * @requires SectionWrapper - Wrapper for section-specific styling and layout.
 * @requires myBooksData - Data for page metadata like title and background.
 */

'use client';
import MyBookEdits from '@/components/library/myBooks/MyBookEdits';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { myBooksData } from '@/data/mybooksData';
import React from 'react';

function EditBookPage() {
  return (
    <BackgroundWrapper
      src={myBooksData.background}
      bgOpacity={60}
      backgroundAttachment="fixed"
      className="min-h-screen py-4"
    >
      <SectionWrapper
        title={myBooksData.editTitle}
        subtitle={myBooksData.editSubTitle}
      >
        <MyBookEdits />
      </SectionWrapper>
    </BackgroundWrapper>
  );
}

export default EditBookPage;
