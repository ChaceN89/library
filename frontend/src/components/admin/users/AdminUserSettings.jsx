"use client"
import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '@/API/adminAPI';  // Import API function
import UserAdminView from './UserAdminView';  // Import UserAdminView component
import { toast } from 'react-hot-toast';  // Import toast for notifications

function AdminUserSettings() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of users when the component loads
    const getUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch users');
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      {users.map((user) => (
        <UserAdminView key={user.id} user={user} />
      ))}
    </div>
  );
}

export default AdminUserSettings;
