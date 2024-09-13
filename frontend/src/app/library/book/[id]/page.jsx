"use client";  // Add this directive to make it a Client Component

import { useParams } from 'next/navigation';
import React from 'react';

function BookPage() {
  // Get parameters from the URL
  const params = useParams();
  const { id } = params;  // Extract the 'id' parameter

  return (
    <div>
      <h1>Single Book</h1>
      <p>Book ID: {id}</p> {/* Display the dynamic ID */}
    </div>
  );
}

export default BookPage;
