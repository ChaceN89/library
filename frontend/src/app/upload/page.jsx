/**
 * @file UploadPage.jsx
 * @module UploadPage
 * @description 
 *   This component renders the Upload Page, including a background wrapper 
 *   and the main upload functionality. It uses the `Upload` component 
 *   for book upload capabilities and a `BackgroundWrapper` for styling.
 * 
 * @requires react
 * @requires @/components/library/upload/Upload
 * @requires @/components/wrappers/BackgroundWrapper
 * @requires @/data/authData
 *
 * @example
 * // Example usage of UploadPage
 * import UploadPage from "@/app/upload/UploadPage";
 * 
 * <UploadPage />
 *
 * @author Chace Nielson
 * @created 2025-01-18
 * @updated 2025-01-18
 */

'use client';
import Upload from '@/components/library/upload/Upload';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import { authData } from '@/data/authData';
import React from 'react';

function UploadPage() {
  return (
    <BackgroundWrapper
      src={authData.background} // Background image
      bgOpacity={60} // Set background opacity
      backgroundAttachment="fixed" // Fix the background during scrolling
      className="flex-grow flex flex-col justify-center items-center"
    >
      <Upload />
    </BackgroundWrapper>
  );
}

export default UploadPage;
