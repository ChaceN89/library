"use client";
import React, { useState, useEffect } from 'react';

import { getLoginCredentials, getUserData } from '@/API/auth';  // Assuming correct path

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from auth.js
      await getLoginCredentials(username, password);

      // Fetch the user information after login
      const userData = await getUserData();
      console.log('User Data:', userData);
      
      alert('Logged in successfully');
      // Optionally, redirect or refresh the page
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-48">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border p-1 rounded-sm border-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-1 rounded-sm border-black"
      />
      <button className=" border-2 rounded-lg hover:bg-slate-400" type="submit">Login</button>


<SessionStorageDisplay  />
    </form>
  );
};

export default Login;



// just for testing but I want to refresh when the user logs in
const SessionStorageDisplay = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Retrieve session storage data and set it to state
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const user = sessionStorage.getItem('user');
    
    // Store the retrieved values in an object and set the state
    setSessionData({
      accessToken,
      refreshToken,
      user: user ? JSON.parse(user) : null, // Parse user if it exists
    });
  }, []);

  return (
    <div>
      <h3>Session Storage Data:</h3>
      <pre>{JSON.stringify(sessionData, null, 2)}</pre> {/* Display data as formatted JSON */}
    </div>
  );
};


