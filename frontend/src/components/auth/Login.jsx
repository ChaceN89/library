"use client";
import React, { useState, useEffect } from 'react';
import GoogleSignIn from './GoogleSignIn';  // Import the GoogleSignIn component
import { getLoginCredentials } from '@/API/auth';  // Assuming correct path

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from auth.js
      await getLoginCredentials(username, password);
      
      alert('Logged in successfully');
      // Optionally, redirect or refresh the page
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-left gap-4">
      {/* Google Sign-In button */}
      <GoogleSignIn />

      {/* Regular login form */}
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
        <button className="border-2 rounded-lg hover:bg-slate-400" type="submit">
          Login
        </button>

        {/* For debugging or testing local storage */}
        <LocalStorageDisplay />
      </form>
    </div>
  );
};

export default Login;

// Display session storage data for testing purposes
const LocalStorageDisplay = () => {
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    // Retrieve the authData object from localStorage and parse it
    const authData = JSON.parse(localStorage.getItem('authData'));

    setDisplayData(authData);  // Set the entire authData object in state
  }, []);

  return (
    <div className=' w-screen '>
      <h3>Local Storage Data:</h3>
      <pre className='w-9/12' style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {JSON.stringify(displayData, null, 2)}
      </pre> {/* Display data as formatted JSON */}
    </div>
  );
};
