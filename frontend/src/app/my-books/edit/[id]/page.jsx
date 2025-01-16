'use client'
import MyBookEdits from '@/components/library/myBooks/MyBookEdits'
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { myBooksData } from '@/data/mybooksData'
import React from 'react'

function EditBookPage() {
  return (
    <BackgroundWrapper
      src={myBooksData.background} // Background image for the page
      bgOpacity={60}                 // Background opacity level
      backgroundAttachment="fixed"   // Fixes the background during scroll
      className="min-h-screen py-4"       // Ensures the background spans the full viewport height
    >
      <SectionWrapper
        title={myBooksData.editTitle}
        subtitle={myBooksData.editSubTitle}
      >
        <MyBookEdits />
      </SectionWrapper>
    </BackgroundWrapper>
  )
}

export default EditBookPage