import React, { useState } from 'react';
import { editUser } from '@/API/adminAPI';  // Import API function
import { toast } from 'react-hot-toast';  // Import toast for notifications

function AdminEditUser({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    is_staff: user.is_staff,
    is_active: user.is_active,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await editUser(user.id, formData);
      toast.success('User updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="border p-2 rounded mb-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded mb-2"
          />
          <label>
            <input
              type="checkbox"
              name="is_staff"
              checked={formData.is_staff}
              onChange={(e) => setFormData({ ...formData, is_staff: e.target.checked })}
            />
            Admin
          </label>
          <label>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            />
            Active
          </label>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSubmit}>
              Save
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 ml-2" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={() => setEditMode(true)}
        >
          Edit User
        </button>
      )}
    </div>
  );
}

export default AdminEditUser;
