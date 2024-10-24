import React, { useState } from 'react';
import AdminEditUser from './AdminEditUser';  // Import AdminEditUser component
import AdminDeleteUser from './AdminDeleteUser';  // Import AdminDeleteUser component

function UserAdminView({ user }) {
  const [showDetails, setShowDetails] = useState(false);  // Toggle visibility of user details

  return (
    <div className="mb-4 border-b pb-4">
      <div className="flex justify-between items-center">
        <p>{user.username}</p>
        <button
          className="text-blue-500"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4">
          <p>Email: {user.email}</p>
          <p>Name: {user.first_name} {user.last_name}</p>
          <p>Staff: {user.is_staff ? 'Yes' : 'No'}</p>
          <p>Active: {user.is_active ? 'Yes' : 'No'}</p>

          {/* Edit and Delete Buttons */}
          <div className="flex space-x-4 mt-4">
            <AdminEditUser user={user} />
            <AdminDeleteUser userId={user.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAdminView;
