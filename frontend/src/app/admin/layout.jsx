import React from 'react';
import Link from 'next/link';  // Import Link for navigation

function AdminLayout({ children }) {

  // add redirect if user is not an admin

  return (
    <div>
      {/* Admin Navbar */}
      <nav className="bg-gray-800 p-4 text-white flex justify-center space-x-4">
        <Link href="/admin/users">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Manage Users
          </button>
        </Link>
        <Link href="/admin/books">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Manage Books
          </button>
        </Link>
      </nav>

      {/* Admin Content */}
      <div className="p-6">
        {children}  {/* This will render the respective child pages */}
      </div>
    </div>
  );
}

export default AdminLayout;
