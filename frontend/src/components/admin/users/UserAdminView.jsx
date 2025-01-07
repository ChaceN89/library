import React, { useState } from 'react';
import AdminEditUser from './AdminEditUser';  // Import AdminEditUser component
import AdminDeleteUser from './AdminDeleteUser';  // Import AdminDeleteUser component
import AdminPasswordUpdate from './AdminPasswordUpdate';

function UserAdminView({ user }) {
  const [showDetails, setShowDetails] = useState(false);  // Toggle visibility of user details

  return (
    <div className="mb-4 border-b pb-4">
      <div className="flex justify-between items-center">
        <div className='flex gap-1 items-center'>

          <img
            src={user.profile_image_url }  // Use a default image if profile_image_url is not available
            alt={`${user.username}'s profile picture`}
            className="w-12 h-12 rounded-full object-cover"  // Styling for a small, rounded image
            loading="lazy"  // Lazy loading for the image
            />
          <p>{user.username}</p>
        </div>
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
            <AdminPasswordUpdate userId={user.id}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAdminView;
