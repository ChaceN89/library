"use client"; // Marking this as a client component
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation

function EditBook() {
  const params = useParams(); // Using useParams hook to get the route params
  const { id } = params; // Extract the 'id' from the params

  return (
    <div>
      <h1>Edit Book</h1>
      {/* Display the id from the URL */}
      {id ? <p>Editing book with ID: {id}</p> : <p>Loading...</p>}

      <div>
        <div>edit  "title": "Mcbeth ",</div>
        <div>edit      "description": "the beste Mcbeth  of th",</div>
        <div>edit      "author": "william",</div>
        <div>edit      "genre": "Unknown Genre",</div>
        <div>edit      "published_date": null,</div>
        <div>Change content </div>
        <div>change cover art </div>


        
      </div>

      {/* Link to go back to My Books */}
      <Link href="/my-books">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4">
          Go Back to My Books
        </button>
      </Link>
    </div>
  );
}

export default EditBook;
