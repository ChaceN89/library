'use client';
import React, { useEffect } from 'react';
import { useProfileContext } from '@/context/ProfileContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function AdminLayout({ children }) {
  const { userData } = useProfileContext();
  const router = useRouter();

  // Redirect if the user is not signed in or not an admin
  useEffect(() => {
    if (userData === undefined || !userData?.is_staff) {
      router.push('/'); // Redirect to the homepage if not an admin
    }
  }, [userData, router]);

  // Show a loading state while checking user data
  if (userData === null) {
    return <p className="p-10">Loading...</p>;
  }

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
      <div className="p-6">{children}</div>
    </div>
  );
}

export default AdminLayout;
