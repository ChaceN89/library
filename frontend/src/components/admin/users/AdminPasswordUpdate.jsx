import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateUserPassword } from '@/API/adminAPI';



function AdminPasswordUpdate({ userId }) {
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (!newPassword.trim()) {
        toast.error('Password cannot be empty');
        return;
      }

      await updateUserPassword(userId, newPassword);
      toast.success('Password updated successfully');
      setEditMode(false);
      setNewPassword('');
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
    }
  };

  return (
    <div>
      {editMode ? (
        <div className="flex flex-col gap-2">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Set New Password
        </button>
      )}
    </div>
  );
}

export default AdminPasswordUpdate;
