// src/components/navUI/UserProfileNav.jsx
import React from 'react';

const UserProfileNav = ({ username, profilePic }) => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={profilePic || 'https://library-app-data.s3.ca-west-1.amazonaws.com/misc/defaultProfilePic.jpg'} 
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default UserProfileNav;
