/**
 * @file bookData.js
 * @module bookData
 * @description
 * This module provides shared configurations and mappings used throughout the application,
 * including MIME type mappings to human-readable file types and default settings for the book reader.
 *
 * @exports mimeToFileType - A mapping of MIME types to user-friendly file names and extensions.
 * @exports bookReaderData - Configuration for the book reader, such as default lines per page.
 *
 * @example
 * // Importing the MIME type mappings
 * import { mimeToFileType } from "@/data/bookData";
 * 
 * const fileInfo = mimeToFileType["application/pdf"];
 * console.log(fileInfo.fileName); // "PDF File"
 * 
 * @example
 * // Accessing the default lines per page for the book reader
 * import { bookReaderData } from "@/data/bookData";
 * 
 * console.log(bookReaderData.defaultLinesPerPage); // 80
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

// MIME type to file type mapping
export const mimeToFileType = {
  "application/json": { fileName: "JSON File", extension: "json" },
  "text/html": { fileName: "HTML File", extension: "html" },
  "application/rtf": { fileName: "Rich Text File", extension: "rtf" },
  "application/pdf": { fileName: "PDF File", extension: "pdf" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    fileName: "Word Document",
    extension: "docx",
  },
  "application/msword": { fileName: "Word Document", extension: "doc" },
  "text/plain": { fileName: "Text File", extension: "txt" },
};

// Configuration for the book reader
export const bookReaderData = {
  defaultLinesPerPage: 80, // Default number of lines per page for the book reader
  linepPerPageOptions: [
    80,
    100,
    150,
    200,
    400
  ],
  maxSavedBooks:3

};
