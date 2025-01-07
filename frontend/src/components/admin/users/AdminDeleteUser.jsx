import React, { useState } from 'react';
import { deleteUser } from '@/API/adminAPI';  // Import API function
import { toast } from 'react-hot-toast';  // Import toast for notifications

function AdminDeleteUser({ userId }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully');
      window.location.reload();  // Reload page to update user list
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div>
      {confirmDelete ? (
        <div>
          <p>Are you sure you want to delete this user?</p>
          <div className="flex space-x-2 mt-2">
            <button className="bg-red-500 text-white px-4 py-2" onClick={handleDelete}>
              Confirm Delete
            </button>
            <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-red-500 text-white px-4 py-2"
          onClick={() => setConfirmDelete(true)}
        >
          Delete User
        </button>
      )}
    </div>
  );
}

export default AdminDeleteUser;
