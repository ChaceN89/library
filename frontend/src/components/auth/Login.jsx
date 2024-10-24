"use client";
import React, { useState } from 'react';
import GoogleSignIn from './GoogleSignIn';  // Import the GoogleSignIn component
import { getLoginCredentials } from '@/API/authAPI';  // Assuming correct path
import { useProfileContext } from '@/context/ProfileContext';  // Import the ProfileContext
import { toast } from 'react-hot-toast';  // Import react-hot-toast

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { accessToken, refreshToken, userData, triggerProfileReload } = useProfileContext();  // Access context data

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from auth.js
      await getLoginCredentials(username, password);
      
      // Trigger profile reload after successful login
      triggerProfileReload();

      // Show success toast
      toast.success('Logged in successfully!');
    } catch (error) {
      // Show error toast
      toast.error(error.message);
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
      </form>

      <div className="w-screen p-4">
        <h3 className="text-xl font-bold mb-2">Profile Data from Context:</h3>
        <pre className='w-9/12 bg-gray-100 p-2 rounded-lg' style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: userData
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Login;
