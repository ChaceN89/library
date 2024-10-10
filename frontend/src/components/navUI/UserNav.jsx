"use client";
import React, { useState, useEffect } from 'react';
import { logout } from '@/API/auth';

const UserNav = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Fetch user data from session storage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username); // Set username from session storage
    }
  }, []);


  const handleLogout = async () => {
    await logout();
    alert('You have been logged out');
    window.location.reload();
  };

  return (
    <div className=" flex flex-col gap-2">

      <div>
        {username ? (
          <p>Welcome, {username}!</p>
        ) : (
          <p>Please log in</p>
        )}
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserNav;
